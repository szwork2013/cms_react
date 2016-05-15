import React from 'react';
import { Link } from 'react-router' // 路由组建

import '../scss/breadcrumb.scss';
//
export default class breadcrumb extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        console.log('breadcrumb render');
        return(
            <div className="breadcrumb flexRow" style={{alignItems: 'flex-end'}}>
                <span style={{flex:'1'}}>{this.props.datas}</span>
                <Link style={{width:'120px',textAlign:'right'}} to={{pathname:this.props.href, state:{userInfo: this.props.userInfo}}}>{this.props.add}</Link>
            </div>
        );
    }
};
