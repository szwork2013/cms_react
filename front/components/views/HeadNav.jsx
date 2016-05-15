import React from 'react';
import { Link } from 'react-router' // 路由组建
import Cookies from 'js-cookie';
import '../scss/headnav.scss';
//
export default class HeadNav extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        console.log('head nav');
        var name ='';
        if(this.props && this.props.userInfo) {
            name = this.props.userInfo.name? this.props.userInfo.name: this.props.userInfo.email;
        }
        return(
            <div className="headNav flexRow">
               <div style={{flex:'1',marginLeft:'10px'}}>
                 <h3>Maxthon</h3>
               </div>
               <div style={{width:'150px',textAlign:'right',marginRight:'10px'}}>
                   <span>{ name }</span> | <Link to={{pathname: "/login"}} onClick={(e)=>{Cookies.remove('sign');}}>Exit</Link>
               </div>
            </div>
        );
    }
};
