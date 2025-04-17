"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

export default function Confetti() {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })
  const [particles, setParticles] = useState(200)

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Update dimensions on resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)

    // Reduce particles over time for performance
    const timer = setTimeout(() => {
      setParticles(50)
    }, 5000)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timer)
    }
  }, [])

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={particles}
      recycle={false}
      colors={["#F472B6", "#EC4899", "#DB2777", "#BE185D", "#FBCFE8"]}
      confettiSource={{
        x: dimensions.width / 2,
        y: dimensions.height / 2,
        w: 0,
        h: 0,
      }}
      initialVelocityY={30}
      gravity={0.15}
      tweenDuration={5000}
    />
  )
}
