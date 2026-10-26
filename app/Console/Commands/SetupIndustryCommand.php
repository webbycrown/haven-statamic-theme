<?php

namespace App\Console\Commands;

use App\Support\HavenIndustry;
use Illuminate\Console\Command;

class SetupIndustryCommand extends Command
{
    protected $signature = 'haven:setup {industry : apparel|furniture|jewellery|home|beauty|plants|workshop|lighting|stationery} {--force : Replace products and journal entries without asking}';

    protected $description = 'Apply a Haven industry demo pack.';

    public function handle(): int
    {
        $industry = strtolower((string) $this->argument('industry'));
        if (! in_array($industry, HavenIndustry::SLUGS, true)) {
            $this->error('Industry must be one of: '.implode(', ', HavenIndustry::SLUGS));

            return self::FAILURE;
        }

        if (! $this->option('force') && ! $this->confirm(
            "This deletes every product and journal entry, then replaces them with the {$industry} demo pack. Continue?",
            false
        )) {
            $this->warn('Cancelled. Products and journal entries were not changed.');

            return self::FAILURE;
        }

        if (! HavenIndustry::apply($industry)) {
            $this->error('Could not apply the '.$industry.' demo pack.');

            return self::FAILURE;
        }

        $this->info("Haven industry set to {$industry}. Demo products and labels updated.");

        return self::SUCCESS;
    }
}
