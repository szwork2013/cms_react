import React from 'react';
import '../../scss/users/add.scss';
import Breadcrumb from '../Breadcrumb'; //加载组建
//
export default class Users_Add extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: '用户管理 / 新增用户',
            add: '',
            href:'',
            form: {
                name:'',
                email:'',
                password:'',
                is_administrator:'0'
            },
            info:'又有新伙伴要加入了，欧耶！^_^'
        };
        this.inputs = [];
        this.handlechange = this.handlechange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    componentDidMount() {
        this.inputs[0].focus();
    }
    handlechange(event) {
        var name = event.target.name;
        var form = this.state.form;
        form[name] = event.target.value;
        this.setState({form: form});
    }
    handleReset(event) {
        event.preventDefault();
        var form = {
            name:'',
            email:'',
            password:'',
            is_administrator:'0'
        };
        this.setState({form: form,info: '已经清空，可以继续添加了'});
        this.refs.info.className = "info";
        this.inputs[0].focus();
    }
    changeType(obj) {
        var ret = '';
        Object.keys(obj).map((k)=>{
            if(obj[k]) {
                ret = ret + k + '=' + obj[k] + '&';
            }
        });
        return ret.substring(0,ret.length-1);
    }
    handleSubmit(event) {
        event.preventDefault();
        //
        if(this.state.form.name.length > 12) {
            this.setState({
                info:'请输入数字或字母作为用户名，长度在1-12之间。'
            });
            this.refs.info.className = "info info-fail";
            this.inputs[0].focus();
            return false;
        }
        var Regex = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
        if (!Regex.test(this.state.form.email)){
            this.setState({
                info:'邮箱格式不合法！'
            });
            this.refs.info.className = "info info-fail";
            this.inputs[1].focus();
            return false;
        }
        if(this.state.form.password.length < 6 || this.state.form.password.length > 20) {
            
            this.setState({
                info:'请输入数字或字母作为密码，长度在6-20之间。'
            });
            this.refs.info.className = "info info-fail";
            this.inputs[2].focus();
            return false;
        }
        fetch('http://mm.maxthon.admin.com/api/user/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body:this.changeType(this.state.form)})
            .then((response) => response.json())
            .then((result)=>{
                if(result.status === 1) {
                    var form = {
                        name:'',
                        email:'',
                        password:'',
                        is_administrator:'0'
                    };
                    this.setState({form: form,info: '创建成功，还可以继续添加哟'});
                    this.refs.info.className = "info info-suc";
                    this.inputs[0].focus();
                    return false;
                } else {
                    this.setState({
                        info: result.msg
                    });
                    this.refs.info.className = "info info-fail";
                    this.inputs[result.data.idx].focus();
                    return false;
                }
            });
        return false;
    }
    render() {
        console.log('add render');
        return(
            <div className="users_add">
                <Breadcrumb datas={this.state.breadcrumb} add={this.state.add} href={this.state.href} userInfo={this.props.location.state.userInfo}/>
                <div>
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        <li className='flexRow'><p ref="info" style={{width:'100%',margin:'0'}} className="info">{this.state.info}</p></li>
                        <li className='flexRow'><div className='tit'>用户名</div><input ref={(ref)=>this.inputs.push(ref)} onChange={this.handlechange} type="text" name="name" value={this.state.form.name} /></li>
                        <li className='flexRow'><div className='tit'>邮箱</div><input ref={(ref)=>this.inputs.push(ref)} onChange={this.handlechange} type="text" name="email" value={this.state.form.email} /></li>
                        <li className='flexRow'><div className='tit'>密码</div><input ref={(ref)=>this.inputs.push(ref)} onChange={this.handlechange} type="password" name="password" value={this.state.form.password} /></li>
                        <li className='flexRow'>
                            <div className='tit'>角色</div>
                            <div className="radio">
                                <input onChange={this.handlechange} type="radio" name="is_administrator" checked={this.state.form.is_administrator === '1'} value="1"/> 管理员
                            </div>
                            <div className="radio">
                                <input onChange={this.handlechange} type="radio" name="is_administrator" checked={this.state.form.is_administrator === '0'} value="0" /> 运营
                            </div>

                        </li>
                        <li className='flexRow'>
                            <div className='tit'></div>
                            <button className="bt-primary" style={{marginRight:'20px'}}>提交</button>
                            <a ref="reset" href="" onClick={this.handleReset} className="bt">清空</a>
                         </li>
                    </ul>
                </form>
                </div>
            </div>
        );
    }

};
