"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemeDisplayProps {
  isSupremeMode?: boolean
}

// Meme content with captions
const MEMES = [
  {
    caption: "You + me after you say yes:",
    description: "A dancing couple meme",
    emoji: "💃🕺",
  },
  {
    caption: "My heart when you finally clicked YES:",
    description: "Heart explosion meme",
    emoji: "❤️💥",
  },
  {
    caption: "My HTML is incomplete without your <body>",
    description: "Developer joke meme",
    emoji: "👩‍💻❤️👨‍💻",
  },
  {
    caption: "Me waiting for you to click YES:",
    description: "Waiting meme",
    emoji: "⏳😍",
  },
  {
    caption: "Us in the future:",
    description: "Cute old couple meme",
    emoji: "👵❤️👴",
  },
]

export default function MemeDisplay({ isSupremeMode = false }: MemeDisplayProps) {
  const [currentMeme, setCurrentMeme] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextMeme = () => {
    setDirection(1)
    setCurrentMeme((prev) => (prev + 1) % MEMES.length)
  }

  const prevMeme = () => {
    setDirection(-1)
    setCurrentMeme((prev) => (prev - 1 + MEMES.length) % MEMES.length)
  }

  // Auto-advance memes every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextMeme()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const meme = MEMES[currentMeme]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center gap-8 text-center z-10 max-w-3xl mx-auto"
    >
      <motion.h1
        className={cn(
          "text-3xl md:text-5xl font-bold text-pink-600 mb-2",
          isSupremeMode && "text-white drop-shadow-lg",
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        OMG! You said YES!
      </motion.h1>

      <motion.p
        className={cn("text-xl text-pink-500 mb-8", isSupremeMode && "text-white/90")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        I knew you couldn&apos;t resist! 💖
      </motion.p>

      {/* Meme carousel */}
      <div className="relative w-full max-w-md aspect-square bg-white rounded-xl shadow-xl overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentMeme}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction * 200,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: direction * -200,
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          >
            <div
              className={cn(
                "text-2xl md:text-3xl font-bold mb-4 text-pink-600",
                isSupremeMode &&
                  "text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600",
              )}
            >
              {meme.caption}
            </div>

            <div className="text-8xl md:text-9xl my-4 animate-bounce">{meme.emoji}</div>

            <div className="text-gray-500 mt-4">{meme.description}</div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={prevMeme}
            className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white"
          >
            <ArrowLeft size={20} />
          </Button>

          {MEMES.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => {
                setDirection(index > currentMeme ? 1 : -1)
                setCurrentMeme(index)
              }}
              className={cn(
                "w-2 h-2 rounded-full p-0 min-w-0",
                index === currentMeme ? "bg-pink-500 hover:bg-pink-600" : "bg-gray-300 hover:bg-gray-400",
              )}
            />
          ))}

          <Button
            variant="outline"
            size="icon"
            onClick={nextMeme}
            className="rounded-full bg-white/70 backdrop-blur-sm hover:bg-white"
          >
            <ArrowRight size={20} />
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className={cn("flex flex-wrap gap-2 justify-center mt-4", isSupremeMode && "animate-pulse")}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Heart key={i} className="text-pink-500" fill="currentColor" size={24 + i * 2} />
        ))}
      </motion.div>
    </motion.div>
  )
}
