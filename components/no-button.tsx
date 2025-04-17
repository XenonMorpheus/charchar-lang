"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSounds } from "@/hooks/use-sounds"
import { cn } from "@/lib/utils"

// Funny messages to display when trying to click NO
const FUNNY_MESSAGES = [
  "Invalid input. Please reconsider.",
  "That's not an option!",
  "Try again, but better this time.",
  "Nope, not happening!",
  "Are you sure? Because I'm not letting you!",
  "Nice try! But no.",
  "You can't escape the inevitable YES!",
  "Error 404: NO button functionality not found.",
  "Your request has been denied.",
  "Sorry, that button is just for decoration.",
]

interface NoButtonProps {
  isSupremeMode?: boolean
}

export default function NoButton({ isSupremeMode = false }: NoButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { playNoSound } = useSounds()

  // Handle mouse approaching the button
  const handleMouseMove = (e: MouseEvent) => {
    if (!buttonRef.current) return

    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const buttonCenterX = rect.left + rect.width / 2
    const buttonCenterY = rect.top + rect.height / 2

    // Calculate distance between mouse and button center
    const distanceX = e.clientX - buttonCenterX
    const distanceY = e.clientY - buttonCenterY
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    // If mouse is getting close (within 100px), move the button away
    if (distance < 100) {
      // Calculate escape direction (opposite of approach)
      const escapeX = -distanceX * (150 / distance)
      const escapeY = -distanceY * (150 / distance)

      // Keep button within viewport bounds
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let newX = escapeX
      let newY = escapeY

      if (rect.left + escapeX < 0) newX = Math.abs(escapeX)
      if (rect.right + escapeX > viewportWidth) newX = -Math.abs(escapeX)
      if (rect.top + escapeY < 0) newY = Math.abs(escapeY)
      if (rect.bottom + escapeY > viewportHeight) newY = -Math.abs(escapeY)

      setPosition({ x: newX, y: newY })
    }
  }

  // Try to click the NO button (which will trigger sound and message)
  const handleNoClick = () => {
    playNoSound()
    const randomMessage = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)]
    setMessage(randomMessage)
    setShowMessage(true)

    // Hide message after 2 seconds
    setTimeout(() => {
      setShowMessage(false)
    }, 2000)

    // Move button to a random position
    const randomX = (Math.random() - 0.5) * 200
    const randomY = (Math.random() - 0.5) * 200
    setPosition({ x: randomX, y: randomY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative">
      <motion.div
        animate={{
          x: position.x,
          y: position.y,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        }}
      >
        <Button
          ref={buttonRef}
          onClick={handleNoClick}
          size="lg"
          variant="outline"
          className={cn(
            "text-xl px-12 py-6 border-2 border-gray-300 rounded-full shadow-md",
            isSupremeMode && "border-red-400 bg-red-100 hover:bg-red-200",
          )}
        >
          NO
        </Button>
      </motion.div>

      {/* Popup message */}
      <AnimatedMessage show={showMessage} message={message} isSupremeMode={isSupremeMode} />
    </div>
  )
}

interface AnimatedMessageProps {
  show: boolean
  message: string
  isSupremeMode?: boolean
}

function AnimatedMessage({ show, message, isSupremeMode }: AnimatedMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: show ? 1 : 0,
        y: show ? 0 : 10,
        scale: show ? [0.9, 1.1, 1] : 0.9,
        transition: { duration: 0.3 },
      }}
      className={cn(
        "absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-2 rounded-lg shadow-lg bg-white text-pink-600 font-medium z-50",
        isSupremeMode && "bg-gradient-to-r from-yellow-100 to-pink-100 text-red-600 font-bold",
      )}
    >
      {message}
    </motion.div>
  )
}
