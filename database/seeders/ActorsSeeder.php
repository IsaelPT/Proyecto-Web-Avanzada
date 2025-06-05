<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Actor; // Import the Actor model

class ActorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Actor::create(
            [
            'name' => 'Robert Downey Jr.',
            'age' => 58, 
            ]
        );
        Actor::create(
            [
            'name' => 'Chris Evans',
            'age' => 42,
            ]
        );
        Actor::create(
            [
            'name' => 'Scarlett Johansson',
            'age' => 38,
            ]
        );
        
    }
}
