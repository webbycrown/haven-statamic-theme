<?php

namespace App\Console\Commands;

use App\Support\HavenIndustry;
use Illuminate\Console\Command;

class SetupIndustryCommand extends Command
{
    protected $signature = 'haven:setup {industry : apparel|furniture|jewellery|home|beauty|plants|workshop|lighting|stationery}';

    protected $description = 'Apply a Haven industry demo pack.';

    public function handle(): int
    {
        $industry = strtolower((string) $this->argument('industry'));
        if (! HavenIndustry::apply($industry)) {
            $this->error('Industry must be one of: '.implode(', ', HavenIndustry::SLUGS));

            return self::FAILURE;
        }

        $this->info("Haven industry set to {$industry}. Demo products and labels updated.");

        return self::SUCCESS;
    }
}
