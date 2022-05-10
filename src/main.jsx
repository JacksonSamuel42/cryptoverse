import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'

import {BrowserRouter as Router} from 'react-router-dom'
import store from './app/store'
import 'antd/dist/antd.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
