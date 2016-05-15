import React from 'react';
//
import LeftNav from './LeftNav'; //加载组建
import HeadNav from './HeadNav'; //加载组建
import Load from './Load'; //加载组建
//
export default class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            load:false, //加载状态
            extend_lists:[],
            navs: null, // 导航配置
        };
    }
    //
    handleExtend(key) {
        var extend_lists = this.state.extend_lists;
        if(extend_lists.indexOf(key) > -1) {
            extend_lists.splice(extend_lists.indexOf(key),1);
        } else {
            extend_lists.push(key);
        }
        this.setState({
            extend_lists: extend_lists,
        });
    }
    //
    componentWillMount() {
        
    }
    componentDidMount() {

        if(!this.state.load && this.props.location.state) {
            // 异步初始化数据
            fetch('http://mm.maxthon.admin.com/api/module/conf?uid='+this.props.location.state.userInfo.id)
                .then((response) => response.json())
                .then((data)=>{
                    if(data.status == 1) {
                        this.setState({
                            load: true,
                            navs: data.data.navs,
                            extend_lists: data.data.extend_lists,
                        });
                    } else {
                        alert(data.msg);
                    }
                });
        }
    }
    render() {
        console.log('main render');
        if(!this.state.load) {
            return <Load />;
        } else {
            return(
                <div className="flexColumn">
                   <HeadNav userInfo={this.props.location.state.userInfo}/>
                   <div className="flexRow" style={{flex:'1'}}>
                      <LeftNav
                          {...this.state}
                          userInfo={this.props.location.state.userInfo}
                          handleExtend={(key)=>this.handleExtend(key)}
                      />
                      <div style={{flex:'1'}}>
                        {this.props.children}
                      </div>
                   </div>
                </div>
            );
        }
    }
};
