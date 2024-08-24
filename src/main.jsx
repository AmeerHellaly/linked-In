import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.scss'
// import {app,auth} from './firebaseConfig.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/index.jsx'
import "react-quill/dist/quill.snow.css"
// import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
 
    <ToastContainer/>
  </React.StrictMode>,
)
  