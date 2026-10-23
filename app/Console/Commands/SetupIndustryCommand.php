<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Statamic\Facades\Stache;
use Statamic\Facades\YAML;

class SetupIndustryCommand extends Command
{
    protected $signature = 'haven:setup {industry : apparel|furniture|jewellery|home}';

    protected $description = 'Apply a Haven industry demo pack (apparel, furniture, jewellery, or home).';

    public function handle(): int
    {
        $industry = strtolower($this->argument('industry'));
        $allowed = ['apparel', 'furniture', 'jewellery', 'home'];
        if (! in_array($industry, $allowed, true)) {
            $this->error('Industry must be one of: '.implode(', ', $allowed));

            return self::FAILURE;
        }

        $pack = base_path('content/industries/'.$industry);
        if (! is_dir($pack)) {
            $this->error('Pack not found: '.$pack);

            return self::FAILURE;
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

        $settingPath = base_path('content/globals/setting.yaml');
        $setting = YAML::file($settingPath)->parse() ?? [];
        $data = $setting['data'] ?? [];
        $data['industry'] = $industry;
        $data['industry_label'] = $meta['industry_label'] ?? ucfirst($industry).' store';
        $setting['title'] = $setting['title'] ?? 'Setting';
        $setting['data'] = $data;
        File::put($settingPath, YAML::dump($setting));

        $homePath = base_path('content/collections/pages/home.md');
        if (File::exists($homePath) && ! empty($meta['hero_title'])) {
            $home = File::get($homePath);
            $label = $meta['industry_label'] ?? $data['industry_label'];
            $title = $meta['hero_title'];
            // Update only home_hero slide titles/kickers — leave other sections alone.
            if (preg_match('/(type: home_hero\n)(.*?)(\n  -\n    id: )/s', $home, $m)) {
                $slides = "    slides:\n".
                    "      -\n        id: s1\n        image: image/images-1.jpg\n        title: {$title}\n        kicker: {$label}\n".
                    "      -\n        id: s2\n        image: image/images-2.jpg\n        title: {$title}\n        kicker: {$label}\n".
                    "      -\n        id: s3\n        image: image/images-3.jpg\n        title: {$title}\n        kicker: {$label}\n";
                $home = preg_replace('/(type: home_hero\n)(.*?)(\n  -\n    id: )/s', '$1'.$slides.'$3', $home, 1);
                File::put($homePath, $home);
            }
        }

        if (class_exists(Stache::class)) {
            try {
                Stache::refresh();
            } catch (\Throwable $e) {
                $this->warn('Stache refresh skipped: '.$e->getMessage());
            }
        }

        $this->info("Haven industry set to {$industry}. Demo products and labels updated.");

        return self::SUCCESS;
    }
}
