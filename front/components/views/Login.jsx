import React from 'react';
import Cookies from 'js-cookie';
import { browserHistory } from 'react-router';
import { Map,is } from 'immutable';
//
import '../scss/login.scss';
//
export default class Login extends React.Component{
    constructor() {
        super();
        //
        if(Cookies.get('sign')) {
            fetch('http://mm.maxthon.admin.com/api/auth/check', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:'sign='+Cookies.get('sign')})
                .then((response) => response.json())
                .then((result)=>{
                    if(result.status === 1) {
                        browserHistory.push({state:{userInfo: result.data},pathname:'/'});
                    } else {
                        Cookies.remove('sign');
                    }
                }).catch((e)=>{
                    alert('服务器异常，请稍等再试');
                });
        }
        //
        this.state = {
            form: Map({email: '',password:''}),
            info: '请输入邮箱和密码',
        };
        this.inputs = [];
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.bindDom = this.bindDom.bind(this);
    }
    handleChange(event) {
        var name = event.target.name;
        var value = event.target.value;
        this.setState(({form})=>({
            form: form.update(name, ()=> value)
        }));
    }
    bindDom(ref) {
        this.inputs.push(ref);
    }
    // 处理表单提交
    handleSubmit(event) {
        event.preventDefault();
        //
        var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
        var email = this.state.form.get('email');
        var password = this.state.form.get('password');
        if (!Regex.test(email)){
            this.setState({info: '邮箱格式不合法！'});
            this.refs.info.className = 'info info-fail';
            this.inputs[0].focus();
            return false;
        }
        if(password.length < 6 || password.length > 20) {
            this.setState({info: '请输入数字或字母，长度在6-20之间。'});
            this.refs.info.className = 'info info-fail';
            this.inputs[1].focus();
            return false;
        }
        fetch('http://mm.maxthon.admin.com/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:'email='+email+'&password='+password})
            .then((response) => response.json())
            .then((result)=>{
                if(result.status === 1) {
                    Cookies.set('sign',result.data.sign, { expires: 7 });
                    this.setState({info: '登录成功, 跳转中...'});
                    this.refs.info.className = 'info info-suc';
                    setTimeout(()=>{browserHistory.push({state:{userInfo: result.data},pathname:'/'})},500);
                    return false;
                } else {
                    this.setState({info: result.msg});
                    this.refs.info.className = 'info info-fail';
                    return false;
                }
            }).catch((err)=>{
                this.setState({info: '服务器异常，请稍等重试！'});
                this.refs.info.className = 'info info-fail';
            });
        return false;
    }
    shouldComponentUpdate(nextProps = {}, nextState = {}) {
      const thisProps = this.props || {}, thisState = this.state || {};
      if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
          Object.keys(thisState).length !== Object.keys(nextState).length) {
          return true;
      }

      for (const key in nextProps) {
        if (thisProps[key] !== nextProps[key] || is(thisProps[key], nextProps[key])) {
          return true;
        }
      }

      for (const key in nextState) {
        if (thisState[key] !== nextState[key] || is(thisState[key], nextState[key])) {
          return true;
        }
      }
      return false;
    }
    componentDidMount() {
        //
        this.inputs[0].focus();
    }
    render() {
        console.log('login render');
        return (
            <div className="card loginBox">
                <form method="post" onSubmit={this.handleSubmit}>
                    <div className="title">
                        <h3>登录</h3>
                    </div>
                    <div className="content">
                        <p className="info" ref="info">{this.state.info}</p>
                        <div>
                            <input type="text" name="email" ref={this.bindDom} value={this.state.form.get('email')} placeholder="邮箱地址" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <input type="password" ref={this.bindDom} name="password" value={this.state.form.get('password')} placeholder="密码" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <button className="bt-primary bt" style={{float: 'left',}}>提交</button>
                            <a href="javascript:;" target="_self" className="text-muted f12">忘记密码</a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
};
