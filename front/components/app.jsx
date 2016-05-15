// npm 组建
import React from 'react'; //核心react
import ReactDOM from 'react-dom'; //html Dom 渲染
import { Router, Route, IndexRoute,Link, browserHistory } from 'react-router' // 路由组建
import Cookies from 'js-cookie';
// 自定义组建
import Login from './views/Login';
import Main from './views/Main';
import NotFound from './views/NotFound';
import User_List from './views/users/List';
import User_Add from './views/users/Add';
import User_Edit from './views/users/Edit';
import Power_Edit from './views/power/Edit';
//样式
import './scss/main.scss';

//
function requireAuth(nextState, replace) {
    if(!Cookies.get('sign') || !nextState.location.state || !nextState.location.state.userInfo) {
        replace('/login');
    } else if (nextState.location.state.userInfo.sign !== Cookies.get('sign')) {
        Cookies.remove('sign');
        replace('/login');
    }
}

// 渲染到前端
ReactDOM.render((
  <Router history={browserHistory}>
      <Route path="/" component={Main} onEnter={requireAuth}>
         <IndexRoute component={User_List} />
         <Route path="users" component={User_List} />
         <Route path="users/add" component={User_Add}/>
         <Route path="users/edit/:uid" component={User_Edit}/>
         <Route path="power/edit/:uid" component={Power_Edit}/>
      </Route>
      <Route path="login" component={Login}/>
      <Route path="*" component={NotFound}/>
  </Router>
), document.getElementById('main-content'));
