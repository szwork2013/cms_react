import React from 'react';
import { Link } from 'react-router'; // 路由组建
//
import '../scss/leftnav.scss';
//
export default class LeftNav extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        console.log('left nav');
        return(
            <div className="leftNav" style={{height:document.body. offsetHeight-31 + 'px',}}>
            {
                Object.keys(this.props.navs).map((k)=>{
                    var nav = this.props.navs[k];
                    var i_class = [];
                    if(nav.lists.length>0) {
                        if(this.props.extend_lists.indexOf(nav.id)>-1) {
                            i_class = <i className="arrow-up"></i>;
                        } else {
                            i_class = <i className="arrow-down"></i>;
                        }
                    }
                    return (
                      <ul key={'ul'+nav.id}>
                       <li key={nav.id} className="li_fir" onClick={(e)=>{this.props.handleExtend(nav.id)}}>
                           {nav.name}{i_class}
                       </li>
                       {(this.props.extend_lists.indexOf(nav.id)>-1) &&
                           nav.lists.map((li)=>{
                             return (
                                 <li key={li.id}>
                                    <Link to={{pathname:li.uri, state: {userInfo: this.props.userInfo}}} activeClassName='focus' >{li.name}</Link>
                                 </li>
                             );
                        })}
                       </ul>
                    );
                })
            }
            </div>
        );
    }
};
