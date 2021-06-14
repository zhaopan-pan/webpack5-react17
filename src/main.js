import ReactDOM from 'react-dom'
import router from './route'


ReactDOM.render(router, document.getElementById('app'))

if (module.hot) {
  module.hot.accept()
}
