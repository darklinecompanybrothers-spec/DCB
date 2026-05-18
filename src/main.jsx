import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.jsx'
import { SoundProvider } from './context/SoundContext'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <SoundProvider>
        <App />
      </SoundProvider>
    </ErrorBoundary>
  </StrictMode>,
)
