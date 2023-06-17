<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trash extends Model
{
    use HasFactory;

    protected $fillable = [
        'rubbish_id', 'date', 'weight'
    ];

    public function rubbish(){
        return $this->belongsTo(Rubbish::class, 'rubbish_id', 'id');
    }
}
