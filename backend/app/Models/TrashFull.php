<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrashFull extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'rubbish_id', 'uniq_id', 'date', 'total'
    ];

    public function rubbish(){
        return $this->belongsTo(Rubbish::class, 'rubbish_id', 'id');
    }
}
