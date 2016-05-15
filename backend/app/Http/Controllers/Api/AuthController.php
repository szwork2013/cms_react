<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\ApiController;
use App\User;

class AuthController extends ApiController
{
    // 登录
    public function postLogin(Request $request) {
        //
        $data = [
            'email'=>$request->input('email'),
            'password'=>$request->input('password')
        ];
        $rules = [
            'email'=>'required|email|exists:users,email',
            'password'=>'required|alpha_dash|between:6,20',
        ];
        $messages = [
            'email.required'=>'邮箱帐号不能为空',
            'email.email'=>'邮箱格式不正确',
            'email.exists'=>'邮箱帐号不存在',
            'password.required'=>'密码不能为空',
            'password.alpha_dash'=>'密码可以是数字、字母、下划线',
            'password.between'=>'密码长度在6-20之间'
        ];
        $this->valid($data, $rules, $messages);
        //
        if($this->ret['status'] == 1) {
            if(\Auth::attempt($data)) {
                $this->ret['data'] = \Auth::user()->toArray();
            } else {
                $this->ret['status'] = 0;
                $this->ret['msg'] = '用户名或密码错误';
            }
        }
        //
        return response()->json($this->ret);
    }
    // 忘记密码
    public function getReset(Request $request) {
        dd('忘记密码');
    }

    // 判断是否登录
    public function postCheck(Request $request) {
        $ret = [
            'status'=>0,
            'msg'=> '',
            'data'=>[],
        ];
        if($request->has('sign')) {
            $oUser = User::where('sign', $request->input('sign'))->first();
            if($oUser) {
                $ret['data'] = $oUser->toArray();
                $ret['status'] = 1;
                return response()->json($ret);
            }
        }
        return response()->json($ret);
    }
}
