"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

interface KonamiCodeProps {
  onActivate: () => void
}

export default function KonamiCode({ onActivate }: KonamiCodeProps) {
  const [keysPressed, setKeysPressed] = useState<string[]>([])
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to the sequence
      const updatedKeys = [...keysPressed, e.code]

      // Only keep the last N keys where N is the length of the Konami code
      if (updatedKeys.length > KONAMI_CODE.length) {
        updatedKeys.shift()
      }

      setKeysPressed(updatedKeys)

      // Check if the sequence matches the Konami code
      const isKonamiCode = updatedKeys.join(",") === KONAMI_CODE.join(",")

      if (isKonamiCode) {
        setShowMessage(true)
        onActivate()

        // Hide message after 3 seconds
        setTimeout(() => {
          setShowMessage(false)
        }, 3000)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [keysPressed, onActivate])

  return (
    <AnimatePresence>
      {showMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        >
          🔥 SUPER SIMP MODE ACTIVATED! 🔥
        </motion.div>
      )}
    </AnimatePresence>
  )
}
