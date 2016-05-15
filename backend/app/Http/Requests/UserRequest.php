<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'=>'required|email|exists:users,email',
            'password'=>'required|alpha_dash|between:6,20',
        ];
    }

    public function messages(){
        return [
            'email.required'=>'邮箱帐号不能为空',
            'email.email'=>'邮箱格式不正确',
            'email.exists'=>'邮箱帐号不存在',
            'password.required'=>'密码不能为空',
            'password.alpha_dash'=>'密码可以是数字、字母、下划线',
            'password.between'=>'密码长度在6-20之间'
        ];
    }
}
