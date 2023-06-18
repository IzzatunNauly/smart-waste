<?php

namespace Database\Seeders;

use App\Models\Trash;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TrashSeeder extends Seeder
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
                'rubbish_id' => 1,
                'date' => Carbon::now()->format('Y-m-d'),
                'weight' => '3'
            ],
            [
                'rubbish_id' => 1,
                'date' => Carbon::now()->format('Y-m-d'),
                'weight' => '4.5'
            ],
            [
                'rubbish_id' => 2,
                'date' => Carbon::now()->format('Y-m-d'),
                'weight' => '5.3'
            ],
            [
                'rubbish_id' => 2,
                'date' => Carbon::now()->format('Y-m-d'),
                'weight' => '3.4'
            ],
        ];

        foreach($data as $row){
            Trash::create([
                'rubbish_id' => $row['rubbish_id'],
                'date' => $row['date'],
                'weight' => $row['weight'],
            ]);
        }
    }
}
