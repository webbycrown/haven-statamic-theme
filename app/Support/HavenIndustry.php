<?php

namespace App\Support;

use Illuminate\Support\Facades\File;
use Statamic\Facades\Stache;
use Statamic\Facades\YAML;

class HavenIndustry
{
    public const SLUGS = ['apparel', 'furniture', 'jewellery', 'home', 'beauty', 'plants', 'workshop', 'lighting', 'stationery'];

    public static function apply(string $industry): bool
    {
        $industry = strtolower($industry);
        if (! in_array($industry, self::SLUGS, true)) {
            return false;
        }

        $pack = base_path('content/industries/'.$industry);
        if (! is_dir($pack)) {
            return false;
        }

        $meta = YAML::file($pack.'/setting.yaml')->parse() ?? [];

        $productDir = base_path('content/collections/products');
        File::ensureDirectoryExists($productDir);
        foreach (File::files($productDir) as $file) {
            if ($file->getExtension() === 'md') {
                File::delete($file->getPathname());
            }
        }
        foreach (File::files($pack.'/products') as $file) {
            File::copy($file->getPathname(), $productDir.'/'.$file->getFilename());
        }

        $blogsSrc = $pack.'/blogs';
        if (is_dir($blogsSrc)) {
            $blogDir = base_path('content/collections/blogs');
            File::ensureDirectoryExists($blogDir);
            foreach (File::files($blogDir) as $file) {
                if ($file->getExtension() === 'md') {
                    File::delete($file->getPathname());
                }
            }
            foreach (File::files($blogsSrc) as $file) {
                File::copy($file->getPathname(), $blogDir.'/'.$file->getFilename());
            }
        }

        $configPath = base_path('content/globals/setting.yaml');
        $variablesPath = base_path('content/globals/default/setting.yaml');
        File::ensureDirectoryExists(dirname($variablesPath));

        $config = YAML::file($configPath)->parse() ?? [];
        if (! empty($config['data']) && is_array($config['data'])) {
            // Statamic 5 stores variables under data: in the set file.
            $data = $config['data'];
        } else {
            // Statamic 6 may keep variables in content/globals/default/setting.yaml.
            $data = YAML::file($variablesPath)->parse() ?? [];
        }

        $data['industry'] = $industry;
        $data['industry_label'] = $meta['industry_label'] ?? ucfirst($industry).' store';
        $config['title'] = $config['title'] ?? 'Setting';
        // Write both layouts so the same kit works on Statamic 5 and 6.
        $config['data'] = $data;
        File::put($configPath, YAML::dump($config));
        File::put($variablesPath, YAML::dump($data));

        self::applyHero($meta, $data['industry_label']);

        if (class_exists(Stache::class)) {
            try {
                Stache::refresh();
            } catch (\Throwable $e) {
                // The catalogue files are already written. The next request can refresh.
            }
        }

        return true;
    }

    private static function applyHero(array $meta, string $label): void
    {
        $homePath = base_path('content/collections/pages/home.md');
        if (! File::exists($homePath) || empty($meta['hero_title'])) {
            return;
        }

        $images = $meta['hero_images'] ?? [
            'image/images-1.jpg',
            'image/images-2.jpg',
            'image/images-3.jpg',
        ];
        if (! is_array($images) || $images === []) {
            return;
        }

        $home = File::get($homePath);
        if (! preg_match('/(type: home_hero\n)(.*?)(\n  -\n    id: )/s', $home)) {
            return;
        }

        $title = self::quote((string) $meta['hero_title']);
        $kicker = self::quote($label);
        $slides = "    slides:\n";
        foreach (array_values($images) as $index => $image) {
            $id = 's'.($index + 1);
            $slides .= "      -\n        id: {$id}\n        image: ".self::quote((string) $image)."\n        title: {$title}\n        kicker: {$kicker}\n";
        }

        $home = preg_replace('/(type: home_hero\n)(.*?)(\n  -\n    id: )/s', '$1'.$slides.'$3', $home, 1);
        File::put($homePath, $home);
    }

    private static function quote(string $value): string
    {
        return '"'.str_replace(['\\', '"'], ['\\\\', '\\"'], $value).'"';
    }
}
