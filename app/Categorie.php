<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $table = 'categorie';
  
    protected $fillable = ['id', 'nom', 'couleur', 'image'];

    public $timestamps = false;

}
