"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Heart, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import Confetti from "@/components/confetti"
import NoButton from "@/components/no-button"
import MemeDisplay from "@/components/meme-display"
import KonamiCode from "@/components/konami-code"
import { useSounds } from "@/hooks/use-sounds"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showMemes, setShowMemes] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSupremeMode, setIsSupremeMode] = useState(false)
  const router = useRouter()
  const { playYesSound, playBackgroundMusic, stopBackgroundMusic, toggleMute } = useSounds()

  const handleYesClick = () => {
    setShowConfetti(true)
    setShowMemes(true)
    playYesSound()
    playBackgroundMusic()
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    toggleMute()
  }

  const activateSupremeMode = () => {
    setIsSupremeMode(true)
  }

  return (
    <main
      className={cn(
        "flex min-h-screen flex-col items-center justify-center p-4 md:p-24 relative overflow-hidden",
        isSupremeMode
          ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
          : "bg-gradient-to-r from-pink-200 to-purple-200",
      )}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, "-100%"],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <KonamiCode onActivate={activateSupremeMode} />

      {/* Sound controls */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMuteToggle}
          className="rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </div>

      {/* Main content */}
      <AnimatePresence>
        {!showMemes ? (
          <motion.div
            className="flex flex-col items-center justify-center gap-8 text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.h1
              className={cn(
                "text-4xl md:text-6xl font-bold text-pink-600 mb-4",
                isSupremeMode && "text-white drop-shadow-lg",
              )}
              animate={
                isSupremeMode
                  ? {
                      scale: [1, 1.05, 1],
                      transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
                    }
                  : {}
              }
            >
              Will you be my Cial?
            </motion.h1>

            <div className="flex flex-col md:flex-row gap-6 items-center">
              <Button
                onClick={handleYesClick}
                size="lg"
                className={cn(
                  "text-xl px-12 py-6 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg",
                  isSupremeMode &&
                    "bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600",
                )}
              >
                YES
              </Button>

              <NoButton isSupremeMode={isSupremeMode} />
            </div>
          </motion.div>
        ) : (
          <MemeDisplay isSupremeMode={isSupremeMode} />
        )}
      </AnimatePresence>

      {/* Confetti overlay */}
      {showConfetti && <Confetti />}
    </main>
  )
}
