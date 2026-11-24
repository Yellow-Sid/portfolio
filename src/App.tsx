import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Cursor, Nav, Preloader } from './components/Chrome'
import { About, Contact, Footer, Hero, Projects, Skills } from './components/Sections'

export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <AnimatePresence>{!ready && <Preloader onDone={() => setReady(true)} />}</AnimatePresence>
        <Cursor /><Nav />
        <main><Hero /><About /><Projects /><Skills /><Contact /></main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
