import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePersistence } from './hooks/usePersistence'
import { HeroSection } from './components/hero/HeroSection'
import { ProcessFlowSection } from './components/sections/ProcessFlowSection'
import { StepInspectionView } from './components/inspection/StepInspectionView'
import { InspectionLibraryPage } from './components/inspection/InspectionLibraryPage'

// ── View types ─────────────────────────────────────────────
type AppView = 'home' | 'step-detail' | 'library'

// ── NavBar ─────────────────────────────────────────────────
interface NavBarProps {
  currentView: AppView
  onNavigate: (view: AppView) => void
}

function NavBar({ currentView, onNavigate }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goHome = () => {
    onNavigate('home')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home')
      // slight delay so home renders before scrolling
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const goLibrary = () => {
    onNavigate('library')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  const NAV_ITEMS = [
    { label: 'Home', action: goHome, active: currentView === 'home' },
    { label: 'Process Flow', action: () => scrollToSection('process-flow'), active: false },
    {
      label: 'Inspection Library',
      action: goLibrary,
      active: currentView === 'library',
      highlight: true,
    },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
      style={{
        background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,240,255,0.12)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button onClick={goHome} className="flex items-center gap-2 group">
          <div
            className="w-7 h-7 rounded-sm flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #00f0ff, #b000ff)' }}
          >
            <span className="text-[10px] font-black text-black">Si</span>
          </div>
          <span className="font-bold text-white tracking-tight text-sm group-hover:text-neon-cyan transition-colors">
            SiliCore
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={
                item.highlight
                  ? {
                      background: item.active
                        ? 'rgba(0,240,255,0.12)'
                        : 'rgba(0,240,255,0.06)',
                      border: '1px solid rgba(0,240,255,0.3)',
                      color: '#00f0ff',
                    }
                  : {
                      color: item.active ? '#fff' : '#6b7280',
                    }
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-400 hover:text-neon-cyan p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            {menuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,240,255,0.12)',
            }}
          >
            <nav className="px-6 pb-4 pt-2 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: item.active ? '#fff' : '#6b7280' }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ── App ─────────────────────────────────────────────────────
function App() {
  usePersistence()

  const [view, setView] = useState<AppView>('home')
  const [activeStepId, setActiveStepId] = useState<string>('')

  const navigateTo = useCallback((v: AppView) => {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const openStepInspection = useCallback((stepId: string) => {
    setActiveStepId(stepId)
    setView('step-detail')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const goHome = useCallback(() => navigateTo('home'), [navigateTo])
  const goProcessFlow = useCallback(() => {
    navigateTo('home')
    setTimeout(() => {
      document.getElementById('process-flow')?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }, [navigateTo])

  return (
    <div className="bg-dark-bg min-h-screen">
      <NavBar currentView={view} onNavigate={navigateTo} />

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection />
            <ProcessFlowSection onInspectClick={openStepInspection} />
          </motion.main>
        )}

        {view === 'step-detail' && activeStepId && (
          <motion.div
            key={`step-${activeStepId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StepInspectionView
              stepId={activeStepId}
              onBack={goProcessFlow}
              onGoHome={goHome}
            />
          </motion.div>
        )}

        {view === 'library' && (
          <motion.div
            key="library"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <InspectionLibraryPage onGoHome={goHome} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
