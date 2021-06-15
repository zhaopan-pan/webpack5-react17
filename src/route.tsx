import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createHashHistory } from 'history'
import Home from '@/views/Home'
import User from '@/views/user'

const About = () => {
    return <>About </>
}

const routes = () => {
    return (
        <Router history={createHashHistory()}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/user" component={User} />
            </Switch>
        </Router>
    )
}
export default routes
