import React from 'react';
import '../../scss/users/list.scss';
import Breadcrumb from '../Breadcrumb'; //加载组建
import Load from '../Load'; //加载中组建
import { Link } from 'react-router' // 路由组建
//
export default class Users_List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: null,
            add: null,
            load: false,
            users: null,
        };
    }
    componentDidMount() {
        if(!this.state.load) {
            // 异步初始化数据
            fetch('http://mm.maxthon.admin.com/api/user')
                .then((response) => response.json())
                .then((data)=>{
                    this.setState({
                        breadcrumb: '用户管理 / 用户列表',
                        add: '新增',
                        href:'/users/add',
                        load: true,
                        users: data
                    });
                });
        }


    }
    handleDel(e,id) {
        e.preventDefault();
        fetch('http://mm.maxthon.admin.com/api/user/del/'+id)
            .then((response) => response.json())
            .then((data)=>{
                if(data.status === 1) {
                    var users = this.state.users;
                    for (var user of users) {
                        if(user.id === id) {
                            users.splice(users.indexOf(user), 1);
                            this.setState({
                                users: users,
                            });
                            break;
                        }
                    }
                } else {
                    alert(data.msg);
                }
            });
        return false;
    }
    render() {
        console.log('list render');
        if(!this.state.load) {
            return <Load />;
        } else {
            var html = '';
            if(this.state.users.length > 0) {
                html = Object.keys(this.state.users[0]).map((key)=> {
                    return <th key={'lt-' + key}>{key}</th>;
                });
                html.push(<th key="sets">设置</th>);
            }
            return(
                <div className="users_list">
                    <Breadcrumb datas={this.state.breadcrumb} add={this.state.add} href={this.state.href} userInfo={this.props.location.state.userInfo}/>
                    <table>
                        <thead>
                            <tr>{ html }</tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map((key)=>{
                                    return (
                                        <tr key={'tr-'+key.id}>
                                        {
                                            Object.keys(key).map((k)=> {
                                                return <td key={'ld-' + k}>{key[k]}</td>;
                                            })
                                        }
                                        <td key={'ld-' + key.id}>
                                            <Link to={{pathname:`/users/edit/${key.id}`, state: {userInfo: this.props.location.state.userInfo, form: key}}} >编辑</Link>|<Link to={{pathname:`/power/edit/${key.id}`, state: {userInfo: this.props.location.state.userInfo, form: key}}} >权限</Link>
                                                |<a href="javascript:;" ref={'del'+key.id} onClick={(e)=>this.handleDel(e,key.id)}>删除</a></td>
                                        </tr>
                                    );
                                })
                            }

                        </tbody>
                    </table>

                </div>
            );
        }

    }
};
