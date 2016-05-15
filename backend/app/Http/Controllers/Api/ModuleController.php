<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Module;
use App\UserModule;
class ModuleController extends Controller
{
    //
    public function getConf(Request $request) {
        //
        $ret = [
            'status'=>0,
            'msg'=>'',
            'data'=>[],
        ];
        if(!$request->has('uid')) {
            $ret['masg'] = '参数错误';
            return response()->json($ret);
        }
        $uid = $request->input('uid');
        $modules = Module::where('is_show', true)
            ->with(['power'=>function($q) use ($uid) {
                $q->where('user_id', $uid);
            }])
            ->get(['name','id','default_extend','module_id','uri'])
            ->toArray();

        $navs = $extend_lists = [];
        foreach($modules as $moduleArr) {
            if($moduleArr['module_id'] === 0) {
                $navs[] = [
                    'name'=> $moduleArr['name'],
                    'id'=> $moduleArr['id'],
                    'lists'=>[],
                    'uri'=>$moduleArr['uri'],
                    'power'=>isset($moduleArr['power'][0]['power'])? $moduleArr['power'][0]['power']: 0,
                ];
                if($moduleArr['default_extend']) {
                    $extend_lists[] = $moduleArr['id'];
                }
            }
        }
        if($navs) {
            foreach ($navs as &$data) {
                $tmp_id = $data['id'];
                foreach($modules as $moduleArr) {
                    if($moduleArr['module_id'] === $tmp_id) {
                        $data['lists'][] = [
                            'name'=> $moduleArr['name'],
                            'id'=> $moduleArr['id'],
                            'uri'=>$moduleArr['uri'],
                            'power'=>isset($moduleArr['power'][0]['power'])? $moduleArr['power'][0]['power']: 0,
                        ];
                    }
                }
            }
        }
        $ret['status'] = 1;
        $ret['data'] = compact('navs','extend_lists');
        return response()->json($ret);
    }

    public function postPower(Request $request) {
        $ret = [
            'status'=>0,
            'msg'=>'',
            'data'=>[],
        ];
        if(!$request->has('data') || !$request->has('uid')) {
            $ret['msg'] = '参数错误';
            return response()->json($ret);
        }
        $datas = $request->input('data');
        $uid = $request->input('uid');
        $datas = explode('-',$datas);
        if($datas) {
            UserModule::where('user_id', $uid)->delete();
            foreach ($datas as $dataStr) {
                $dataArr = explode('.',$dataStr);
                $oUserModule = UserModule::where('module_id', $dataArr[0])->where('user_id', $uid)->first();
                if($oUserModule) {
                    $oUserModule->power = $dataArr[1];
                    $oUserModule->save();
                } else {
                    $oUserModule = new UserModule();
                    $oUserModule->power = $dataArr[1];
                    $oUserModule->module_id = $dataArr[0];
                    $oUserModule->user_id = $uid;
                    $oUserModule->save();
                }
            }
        }
        $ret['status'] = 1;
        return response()->json($ret);
    }
}
