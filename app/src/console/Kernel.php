<?php

namespace Console;

use Console\Commands\ChangeUserPassword;
use Console\Commands\CreateAdministratorUser;
use Console\Commands\DeleteDetachedPhotosOlderThanWeek;
use Console\Commands\DeleteUnusedObjectsFromPhotoStorage;
use Console\Commands\CreateRoles;
use Console\Commands\GenerateRestApiDocumentation;
use Console\Commands\SendWeeklySubscriptionMails;
use Console\Commands\TestScheduler;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

/**
 * Class Kernel.
 *
 * @package Console
 */
class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        ChangeUserPassword::class,
        CreateAdministratorUser::class,
        CreateRoles::class,
        DeleteDetachedPhotosOlderThanWeek::class,
        DeleteUnusedObjectsFromPhotoStorage::class,
        GenerateRestApiDocumentation::class,
        SendWeeklySubscriptionMails::class,
        TestScheduler::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command(TestScheduler::class)
            ->hourly();

        $schedule->command(DeleteDetachedPhotosOlderThanWeek::class)
            ->dailyAt('00:00')
            ->onOneServer();

        $schedule->command(DeleteUnusedObjectsFromPhotoStorage::class)
            ->dailyAt('00:10')
            ->onOneServer();

        $schedule->command(SendWeeklySubscriptionMails::class)
            ->weekly()
            ->sundays()
            ->at('06:00')
            ->onOneServer();
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
