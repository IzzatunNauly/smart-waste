<?php

namespace Database\Seeders;

use App\Models\Rubbish;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RubbishSeeder extends Seeder
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
                'uniq_id' => time(),
                'category' => 'organik',
                'max_weight' => '10'
            ],
            [
                'uniq_id' => time(),
                'category' => 'unorganik',
                'max_weight' => '10'
            ],
        ];

        foreach($data as $row){
            Rubbish::create([
                'uniq_id' => $row['uniq_id'],
                'category' => $row['category'],
                'max_weight' => $row['max_weight'],
            ]);
        }
    }
}
