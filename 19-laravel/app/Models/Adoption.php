<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adoption extends Model
{
    /**
     * Summary of fillable
     * @var array
     */ 
    protected $fillable = [
        'user_id',
        'pet_id',
    ];
}
