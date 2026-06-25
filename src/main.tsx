import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { resetWindowScroll } from './lib/scroll'
import './index.css'
import App from './App.tsx'

resetWindowScroll()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
