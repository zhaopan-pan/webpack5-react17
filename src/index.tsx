/** APP入口 **/
// import "core-js/stable";
// import "regenerator-runtime/runtime";

import React from 'react'
import ReactDOM from 'react-dom'
import Root from '@/root'

/** 公共样式 **/
import '@/styles/global.less'

ReactDOM.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>,
    document.getElementById('app')
)
