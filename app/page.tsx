"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import NoButton from "@/components/no-button"
import MemeDisplay from "@/components/meme-display"
import Confetti from "@/components/confetti"
import KonamiCode from "@/components/konami-code"
import { useSounds } from "@/hooks/use-sounds"

export default function Page() {
  const [showCelebration, setShowCelebration] = useState(false)
  const [isSupremeMode, setIsSupremeMode] = useState(false)
  const { playYesSound, playBackgroundMusic, toggleMute, isMuted } = useSounds()

  // Handle YES button click
  const handleYesClick = () => {
    playYesSound()
    playBackgroundMusic()
    setShowCelebration(true)
  }

  // Activate Super Simp Mode via Konami code
  const activateSupremeMode = () => {
    setIsSupremeMode(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Sound control button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm z-50"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Konami code detector */}
      <KonamiCode onActivate={activateSupremeMode} />

      {/* Background */}
      <div
        className={`absolute inset-0 ${
          isSupremeMode
            ? "bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500"
            : "bg-gradient-to-br from-pink-100 to-rose-100"
        } transition-colors duration-1000`}
      >
        {/* Floating hearts background */}
        {Array.from({ length: isSupremeMode ? 20 : 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-500 opacity-20"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, "-100%"],
              transition: {
                y: {
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              },
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      {!showCelebration ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center gap-12 text-center z-10"
        >
          <motion.h1
            className={`text-4xl md:text-6xl font-bold ${
              isSupremeMode ? "text-white drop-shadow-lg" : "text-pink-600"
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: [null, 1.05, 1] }}
            transition={{ duration: 0.5, times: [0, 0.7, 1] }}
          >
            Will you be my Cial?
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <Button
              onClick={handleYesClick}
              size="lg"
              className={`text-xl px-12 py-6 rounded-full shadow-md ${
                isSupremeMode
                  ? "bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-white"
                  : "bg-pink-500 hover:bg-pink-600 text-white"
              }`}
            >
              YES
            </Button>

            <NoButton isSupremeMode={isSupremeMode} />
          </div>
        </motion.div>
      ) : (
        <>
          <MemeDisplay isSupremeMode={isSupremeMode} />
          <Confetti />
        </>
      )}
    </main>
  )
}
