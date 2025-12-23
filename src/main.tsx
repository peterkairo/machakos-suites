import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Page from './pages/index'

function Main() {
  return <Page />
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
