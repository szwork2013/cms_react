<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('module_id')->unsign()->default(0);
            $table->string('name')->default(''); // 名字
            $table->string('uri')->default(''); // url
            $table->boolean('default_extend')->default(false); // 是否默认伸展
            $table->boolean('is_show')->default(true); // 是否展示
            $table->tinyInteger('order')->default(0); //排序
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('modules');
    }
}
