import React from 'react'

import './index.less'

function NotFoundPageContainer() {
    return (
        <div className="page-notfound">
            <div className="box">
                <p onClick={() => history.go(-1)}>goback</p>
                <span>404 not found</span>
            </div>
        </div>
    )
}

export default NotFoundPageContainer
