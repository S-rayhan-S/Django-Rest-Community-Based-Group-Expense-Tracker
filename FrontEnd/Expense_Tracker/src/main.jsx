import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  
    <App />
  
)


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import './index.css' // Ensure this exists

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // )

// // In main.jsx
// import { BrowserRouter } from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )