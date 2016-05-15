import React from 'react';
import Load from '../Load'; //加载中组建
import '../../scss/users/add.scss';
import Breadcrumb from '../Breadcrumb'; //加载组建
//
export default class Users_Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: '用户管理 / 编辑用户',
            form: '',
            info: '提示：密码部分不输入表示不修改',
        };
        this.inputs = [];
    }
    componentDidMount() {
        if(this.props.location.state && this.props.location.state.form) {
            this.setState({
                form: {
                    id: this.props.location.state.form.id,
                    name: this.props.location.state.form.name,
                    email: this.props.location.state.form.email,
                    is_administrator: this.props.location.state.form.is_administrator,
                },
            });
        } else { //异步获取
            fetch('http://mm.maxthon.admin.com/api/user/show/'+this.props.params.uid)
                .then((response) => response.json())
                .then((result)=>{
                    if(result.status === 1) {
                        var user = result.data;
                        this.setState({
                            form: user
                        });
                    } else {
                        alert(result.msg);
                    }
                });
        }

    }
    handlechange(event,key) {
        var form = this.state.form;
        form[key] = event.target.value;
        this.setState({form: form});
    }
    handleReset(event) {
        event.preventDefault();
        fetch('http://mm.maxthon.admin.com/api/user/show/'+this.props.params.uid)
            .then((response) => response.json())
            .then((result)=>{
                if(result.status === 1) {
                    var user = result.data;
                    this.setState({
                        form: user,
                        info: '数据被还原了，请重新填写吧'
                    });
                } else {
                    this.setState({
                        info: '数据还原时意外发生了，多试几次看看'
                    });
                }
            });
        this.inputs[0].value = this.state.form.name;
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
        if((this.state.form.password && this.state.form.password.length < 6) || (this.state.form.password && this.state.form.password.length > 20)) {
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
                    this.setState({info: '修改成功'});
                    this.refs.info.className = "info info-suc";
                    return false;
                } else {
                    this.setState({
                        info: result.msg
                    });
                    this.refs.info.className = "info info-fail";
                    if(result.data.idx) {
                        this.inputs[result.data.idx].focus();
                    }
                    return false;
                }
            });
        return false;
    }
    render() {
        console.log('edit render');
        if(!this.state.form) {
            return <Load />;
        } else {
            return(
                <div className="users_add">
                    <Breadcrumb datas={this.state.breadcrumb} add={this.state.add} href={this.state.href} userInfo={this.props.location.state.userInfo}/>
                    <div>
                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                        <ul>
                            <li className='flexRow'><p ref="info" style={{width:'100%',margin:'0'}} className="info">{this.state.info}</p></li>
                            <li className='flexRow'><div className='tit'>用户名</div><input ref={(ref)=>this.inputs.push(ref)} onChange={(e)=>this.handlechange(e, 'name')} type="text" name="name" value={this.state.form.name} /></li>
                            <li className='flexRow'><div className='tit'>邮箱</div><input ref={(ref)=>this.inputs.push(ref)} onChange={(e)=>this.handlechange(e, 'email')} type="text" name="email" value={this.state.form.email} /></li>
                            <li className='flexRow'><div className='tit'>密码</div><input ref={(ref)=>this.inputs.push(ref)} onChange={(e)=>this.handlechange(e, 'password')} type="password" name="password" value={this.state.form.password} /></li>
                            <li className='flexRow'>
                                <div className='tit'>角色</div>
                                <div className="radio">
                                    <input onChange={(e)=>this.handlechange(e, 'is_administrator')} type="radio" name="is_administrator" checked={this.state.form.is_administrator === '1'} value="1"/> 管理员
                                </div>
                                <div className="radio">
                                    <input onChange={(e)=>this.handlechange(e, 'is_administrator')} type="radio" name="is_administrator" checked={this.state.form.is_administrator === '0'} value="0" /> 运营
                                </div>

                            </li>
                            <li className='flexRow'>
                                <div className='tit'></div>
                                <button className="bt-primary" style={{marginRight:'20px'}}>提交</button>
                                <a ref="reset" href="javascript:;" onClick={(e)=>this.handleReset(e)} className="bt">还原</a>
                             </li>
                        </ul>
                    </form>
                    </div>
                </div>
            );
        }
    }
};
