<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;

class MoviesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Movie::create([
            'title' => 'Iron Man',
            'year' => 2008,
            'genre' => 'Superhéroes/Acción'
        ]);

        Movie::create([
            'title' => 'The Avengers',
            'year' => 2012,
            'genre' => 'Superhéroes/Acción'
        ]);

        Movie::create([
            'title' => 'Captain America: The First Avenger',
            'year' => 2011,
            'genre' => 'Superhéroes/Aventura'
        ]);
    }
}
