<?php

namespace Database\Seeders;

use App\Models\TrashFull;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrashFullSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'user_id' => 1,
                'rubbish_id' => 1,
                'uniq_id' => time(),
                'date' => Carbon::now()->format('Y-m-d'),
                'total' => '10'
            ],
            [
                'user_id' => 1,
                'rubbish_id' => 2,
                'uniq_id' => time(),
                'date' => Carbon::now()->format('Y-m-d'),
                'total' => '10'
            ],
        ];

        foreach($data as $row){
            TrashFull::create([
                'user_id' => $row['user_id'],
                'rubbish_id' => $row['rubbish_id'],
                'uniq_id' => $row['uniq_id'],
                'date' => $row['date'],
                'total' => $row['total'],
            ]);
        }
    }
}
