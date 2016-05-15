import React from 'react';
import '../scss/load.scss';
//
export default class Load extends React.Component{
    constructor() {
        super();
    }
    render() {
        console.log('load render');
        return(
            <div className="load">
              <img src="/assets/imgs/loading.gif" className="img" alt="loading..." />
            </div>
        );
    }
};
