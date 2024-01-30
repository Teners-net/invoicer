<?php

namespace App\Console\Commands;

use App\Jobs\CurrencyUpdateJob;
use Illuminate\Console\Command;

class RunJobsNow extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:jobs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run Jobs now';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        CurrencyUpdateJob::dispatch();

        return Command::SUCCESS;
    }
}
