<?php

use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    private $datas;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->datas = [
            [
                'name'=>'用户管理',
                'default_extend'=>1,
                'lists'=>[
                    ['name'=>'用户列表','uri'=>'/users'],
                    ['name'=>'权限列表','uri'=>'/power'],
                    ['name'=>'帮助','uri'=>'/help'],
                ],
            ],
            [
                'name'=>'其它设置',
                'uri'=>'/others',
                'default_extend'=>0,
            ]
        ];
        //
        DB::table('modules')->truncate(); //格式化数据表
        if($this->datas) {
            foreach ($this->datas as $data) {
                if(isset($data['lists']) && $data['lists']) {
                    $tmp_id = DB::table('modules')->insertGetId([
                        'name'=>$data['name'],
                        'default_extend'=>$data['default_extend'],
                        'uri' => (isset($data['uri']) && $data['uri'])? $data['uri']: '',
                    ]);
                    $tmp_arr = [];
                    foreach ($data['lists'] as $value) {
                        $tmp_arr[] = [
                            'name'=> $value['name'],
                            'uri'=> (isset($value['uri']) && $value['uri'])? $value['uri']: '',
                            'module_id'=> $tmp_id
                        ];
                    }
                    DB::table('modules')->insert($tmp_arr);
                } else {
                    DB::table('modules')->insert([
                        'name'=>$data['name'],
                        'default_extend'=>$data['default_extend'],
                        'uri' => (isset($data['uri']) && $data['uri'])? $data['uri']: '',
                    ]);
                }
            }
        }
    }
}
