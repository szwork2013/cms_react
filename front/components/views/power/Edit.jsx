import React from 'react';
import Load from '../Load'; //加载中组建
import '../../scss/power/edit.scss';
import Breadcrumb from '../Breadcrumb'; //加载组建
//
export default class Power_Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb: '用户管理 / 权限编辑',
            load: false,
            form: '',
        };
        this.inputs = [];
        this.handlechange = this.handlechange.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    componentDidMount() {
        // 异步初始化数据
         fetch('http://mm.maxthon.admin.com/api/module/conf?uid='+this.props.params.uid)
            .then((response) => response.json())
            .then((data)=>{
                if(data.status == 1) {
                    this.setState({
                        load: true,
                        form: data.data.navs,
                    });
                } else {
                    alert(data.msg);
                }
            });
    }
    handlechange(event) {
        var name = event.target.name;
        var form = this.state.form;
        var value = event.target.value;
        for(var navs of form) {
            if(navs.id == name) {
                navs.power = value;
                if(navs.lists) {
                    for(var nav of navs.lists) {
                        nav.power = value;
                    }
                }
                
            } else {
                if(navs.lists) {
                    for(var nav of navs.lists) {
                        if(nav.id == name) {
                            if(navs.power != value) {
                                delete navs.power;
                            }
                            nav.power = value;
                        }
                    }
                }
                
            }
        }
        this.setState({form: form});
    }
    handleReset(event) {
        event.preventDefault();
        // 异步初始化数据
         fetch('http://mm.maxthon.admin.com/api/module/conf?uid='+this.props.params.uid)
            .then((response) => response.json())
            .then((data)=>{
                if(data.status == 1) {
                    this.setState({
                        load: true,
                        form: data.data.navs,
                    });
                } else {
                    alert(data.msg);
                }
            });
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

        console.log(this.state.form);
        var datas = [];
        for(var navs of this.state.form) {
            if(navs.power) {
                datas.push(navs.id + '.' + navs.power);
            }
            for(var nav of navs.lists) {
                if(nav.power) {
                    datas.push(nav.id + '.' + nav.power);
                }
            }
        }
        if(datas.length > 0) {
            fetch('http://mm.maxthon.admin.com/api/module/power', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body:'data=' + datas.join('-')+'&uid='+this.props.params.uid})
                .then((response) => response.json())
                .then((result)=>{
                    if(result.status === 1) {
                        alert('OK');
                        return false;
                    } else {
                        alert(result.msg);
                        return false;
                    }
                });
        }
        return false;
    }
    render() {
        if(!this.state.load) {
            return <Load />;
        } else {
            var html = [];
            this.state.form.map((oNav)=>{
                html.push(
                    <tr key={'pw-'+oNav.id}>
                        <th>{oNav.name}</th>
                        <th>
                            <input name={oNav.id} type="radio" value="0" onChange={this.handlechange} checked={oNav.power == 0 && true}/><label>无</label>
                            <input name={oNav.id} type="radio" value="1" onChange={this.handlechange} checked={oNav.power == 1 && true}/><label>只读</label>
                            <input name={oNav.id} type="radio" value="2" onChange={this.handlechange} checked={oNav.power == 2 && true}/><label>读写</label>
                        </th>
                    </tr>
                );
                oNav.lists && oNav.lists.map((oL)=>{
                    html.push(
                        <tr key={'pw-'+oL.id}>
                            <td>{oL.name}</td>
                            <td>
                                <input name={oL.id} type="radio" value="0" onChange={this.handlechange} checked={oL.power == 0 && true}/><label>无</label>
                                <input name={oL.id} type="radio" value="1" onChange={this.handlechange} checked={oL.power == 1 && true}/><label>只读</label>
                                <input name={oL.id} type="radio" value="2" onChange={this.handlechange} checked={oL.power == 2 && true}/><label>读写</label>
                            </td>
                        </tr>
                    );
                });
            })
            return(
                <div className="power_edit">
                    <Breadcrumb datas={this.state.breadcrumb} add={this.state.add} href={this.state.href} userInfo={this.props.location.state.userInfo}/>
                    <div>
                    <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>设置</th>
                            </tr>
                        </thead>
                        <tbody>
                            {html}
                            <tr></tr>
                            <tr>
                                <th style={{border:'none'}}><button type="submit" className="bt bt-primary" style={{margin:'0 auto'}}>提交</button></th>
                                <th style={{border:'none'}}>
                                    <button onClick={this.handleReset} className="bt" style={{margin:'0 auto'}}>重设</button>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    </form>
                    </div>
                </div>
            );
        }

    }
};
