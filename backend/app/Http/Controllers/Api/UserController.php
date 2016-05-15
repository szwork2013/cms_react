<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getIndex()
    {
        return response()->json(User::get(['id','name','email','ip','is_administrator','updated_at','created_at'])->toArray());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function postAdd(Request $request)
    {
        //
        $ret = [
            'status'=>0,
            'msg'=> '',
            'data'=>[],
        ];
        //
        $email = $password = $name = $is_administrator = '';
        //
        if($request->has('name')) {
            if(preg_match("/^[0-9a-zA-Z]{1,12}$/",$request->input('name'))) {
                $name = (string)$request->input('name');
            } else {
                $ret['msg'] = '请输入数字或字母作为用户名，长度在1-12之间。';
                $ret['data']['idx'] = 0;
                return response()->json($ret);
            }
        }
        if($request->has('email')) {
            $email = filter_var($request->input('email'));
        }
        if(!$email) {
            $ret['msg'] = '邮箱格式不合法！';
            $ret['data']['idx'] = 1;
            return response()->json($ret);
        }
        if($request->has('password')) {
            if(preg_match("/^[0-9a-zA-Z]{6,20}$/",$request->input('password'))) {
                $password = (string)$request->input('password');
            }
        }
        if(!$password && !$request->has('id')) {
            $ret['msg'] = '请输入数字或字母，长度在6-20之间。';
            $ret['data']['idx'] = 2;
            return response()->json($ret);
        }
        $is_administrator = $request->has('is_administrator')? (int)$request->input('is_administrator'): 0;
        //
        if(!$request->has('id')) {
            $tmp_user_id = User::where('email', $email)->value('id');
            if($tmp_user_id) {
                $ret['msg'] = '邮箱已经存在，请登录或者换邮箱注册！';
                $ret['data']['idx'] = 1;
                return response()->json($ret);
            }
            $oUser = new User();
            $sign = md5(time().$name.mt_rand());
            $oUser->sign = $sign;
            $oUser->ip = $request->ip();
        } else {
            $oUser =User::find($request->input('id'));
            if(!$oUser->id) {
                $ret['msg'] = '数据出错，请刷新页面！';
                return response()->json($ret);
            }
        }
        //
        if($password) {
            $password = md5($password);
            $oUser->password = $password;
        }
        $oUser->email = $email;
        $oUser->name = $name;
        $oUser->is_administrator = $is_administrator;

        if($oUser->save()) {
            $ret['status'] = 1;
        } else {
            $ret['msg'] = '登录服务器异常，请稍后重试!';
            $ret['data']['idx'] = 1;
            return response()->json($ret);
        }
        return response()->json($ret);
    }
    // 删除
    public function getDel($id) {
        $ret = [
            'status'=>0,
            'msg'=> '',
            'data'=>[],
        ];
        //
        $oUser = User::find($id);
        if($oUser->id) {
            if($oUser->delete()) {
                $ret['status'] = 1;
            } else {
                $ret['msg'] = "系统异常，删除出错";
            }
        } else {
            $ret['msg'] = "数据不存在";
        }
        return response()->json($ret);
    }

    public function getShow($id) {
        $ret = [
            'status'=>0,
            'msg'=> '',
            'data'=>[],
        ];
        $oUser = User::find($id);
        if($oUser && $oUser->id) {
            $ret['status'] = 1;
            $ret['data'] =  [
                'id'=> $oUser->id,
                'name'=> $oUser->name,
                'email' => $oUser->email,
                'is_administrator'=> $oUser->is_administrator,
            ];
        } else {
            $ret['msg'] = "数据不存在";
        }
        return response()->json($ret);
    }

}
