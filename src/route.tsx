import React from 'react'
import { Router, Route } from 'react-router'
import { createBrowserHistory } from 'history'
import App from '@/App'

const About = () => {
    return <>About </>
}

const routes = () => {
    return (
        <Router history={createBrowserHistory()}>
            <Route path="/" component={App} />
            <Route path="/about" component={About} />
        </Router>
    )
}
export default routes
