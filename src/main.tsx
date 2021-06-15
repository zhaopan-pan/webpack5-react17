import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './root'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('app')
)

if (module.hot) {
    module.hot.accept()
}
