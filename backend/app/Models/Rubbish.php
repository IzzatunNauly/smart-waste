<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rubbish extends Model
{
    use HasFactory;

    protected $fillable = [
        'uniq_id', 'category', 'max_weight'
    ];

    public function trash(){
        return $this->hasMany(Trash::class, 'rubbish_id', 'id');
    }

    public function trash_full(){
        return $this->hasMany(TrashFull::class, 'rubbish_id', 'id');
    }
}
