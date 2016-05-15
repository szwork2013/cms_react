<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    //
    protected $casts = [
        'default_extend' => 'boolean',
        'is_show'=>'boolean'
    ];
    //
    public function power() {
        return $this->hasMany('App\UserModule');
    }
}
