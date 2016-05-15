import React from 'react';

//
export default class NotFound extends React.Component{
    constructor() {
        super();
    }
    render() {
        return(
            <div style={{marginTop:'200px'}}>
              <h1 style={{textAlign:'center',fontWeight:'normal'}}>Oops, 这个链接不存在!</h1>
            </div>
        );
    }
};
