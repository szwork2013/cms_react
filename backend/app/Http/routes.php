<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::group(['middleware' => 'web'], function () {
    Route::auth();
    Route::get('/home', 'HomeController@index');
});

Route::group(['middleware' => ['api'],'prefix'=>'api','namespace'=>'Api'], function () {
    // 账户类
    Route::controller('auth','AuthController');
    Route::controller('user','UserController');
    Route::controller('module','ModuleController'); // 获取导航配置
});
