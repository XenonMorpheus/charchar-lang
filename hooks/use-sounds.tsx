"use client"

import { useState, useEffect, useRef } from "react"
import { Howl } from "howler"

export function useSounds() {
  const [isMuted, setIsMuted] = useState(false)
  const bgMusicRef = useRef<Howl | null>(null)
  const noSoundRef = useRef<Howl | null>(null)
  const yesSoundRef = useRef<Howl | null>(null)

  useEffect(() => {
    // Initialize sounds
    bgMusicRef.current = new Howl({
      src: ["/sounds/background-music.mp3"],
      loop: true,
      volume: 0.5,
      html5: true,
      preload: true,
    })

    noSoundRef.current = new Howl({
      src: ["/sounds/emotional-damage.mp3"],
      volume: 0.7,
      html5: true,
      preload: true,
    })

    yesSoundRef.current = new Howl({
      src: ["/sounds/celebration.mp3"],
      volume: 0.7,
      html5: true,
      preload: true,
    })

    // Cleanup on unmount
    return () => {
      if (bgMusicRef.current) bgMusicRef.current.unload()
      if (noSoundRef.current) noSoundRef.current.unload()
      if (yesSoundRef.current) yesSoundRef.current.unload()
    }
  }, [])

  // Update mute state for all sounds
  useEffect(() => {
    if (bgMusicRef.current) bgMusicRef.current.mute(isMuted)
    if (noSoundRef.current) noSoundRef.current.mute(isMuted)
    if (yesSoundRef.current) yesSoundRef.current.mute(isMuted)
  }, [isMuted])

  const playNoSound = () => {
    if (noSoundRef.current) {
      noSoundRef.current.play()
    }
  }

  const playYesSound = () => {
    if (yesSoundRef.current) {
      yesSoundRef.current.play()
    }
  }

  const playBackgroundMusic = () => {
    if (bgMusicRef.current && !bgMusicRef.current.playing()) {
      bgMusicRef.current.play()
    }
  }

  const stopBackgroundMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.stop()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return {
    playNoSound,
    playYesSound,
    playBackgroundMusic,
    stopBackgroundMusic,
    toggleMute,
    isMuted,
  }
}
