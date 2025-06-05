<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MoviesActor;

class MoviesActorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        MoviesActor::create([
            'movie_id' => 1,
            'actor_id' => 1
        ]);

        MoviesActor::create([
            'movie_id' => 2,
            'actor_id' => 2
        ]);

        MoviesActor::create([
            'movie_id' => 3,
            'actor_id' => 3
        ]);
    }
}
