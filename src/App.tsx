import { useEffect } from 'react'
import { usePersistence } from './hooks/usePersistence'

function App() {
  // Initialize persistence on app startup
  usePersistence();
  
  useEffect(() => {
    document.body.classList.add('dark')
  }, [])

  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="text-white">Inside </span>
          <span className="text-neon-cyan">
            Semiconductor Manufacturing
          </span>
        </h1>
        <p className="text-center text-gray-400 mb-8">
          From Wafer to Microchip
        </p>
        
        <div className="p-8 max-w-2xl mx-auto bg-dark-surface/60 rounded-xl border border-neon-cyan/50">
          <h2 className="text-2xl font-semibold mb-4 text-neon-purple">
            Project Setup Complete
          </h2>
          <p className="text-gray-300 mb-4">
            The 3D semiconductor manufacturing website is ready for development.
          </p>
          <ul className="text-left text-gray-400 space-y-2">
            <li>✓ Vite + React + TypeScript configured</li>
            <li>✓ React Three Fiber & Drei installed</li>
            <li>✓ GSAP & Framer Motion ready</li>
            <li>✓ Zustand state management</li>
            <li>✓ Tailwind CSS with custom theme</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
