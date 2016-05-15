<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    protected $ret = [
        'status' => 1,
        'msg' => '',
        'data' => [],
    ];

    public function valid($request, $rules, $messages = [], $customAttributes = []) {
        $validator = \Validator::make($request, $rules, $messages);
        if($validator->fails()) {
            $this->ret = [
                'status'=>0,
                'msg'=>$validator->errors()->first(),
            ];
        }
    }
}
