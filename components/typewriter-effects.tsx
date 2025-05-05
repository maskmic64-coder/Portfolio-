"use client"

import { useState, useEffect } from "react"

export function TypewriterEffect({ phrases }: { phrases: string[] }) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[currentIndex]

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(phrase.substring(0, currentText.length + 1))
          if (currentText.length === phrase.length) {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          setCurrentText(phrase.substring(0, currentText.length - 1))
          if (currentText.length === 0) {
            setIsDeleting(false)
            setCurrentIndex((currentIndex + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, phrases])

  return (
    <h2 className="text-xl md:text-2xl mb-8 h-8 flex justify-center">
      <span>{currentText}</span>
      <span className="animate-pulse">|</span>
    </h2>
  )
}

export function TypewriterEffectWithGlitch({ phrases }: { phrases: string[] }) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const phrase = phrases[currentIndex]

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(phrase.substring(0, currentText.length + 1))

          // Random glitch effect during typing
          if (Math.random() > 0.9) {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 150)
          }

          if (currentText.length === phrase.length) {
            // Pause at the end of typing
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          setCurrentText(phrase.substring(0, currentText.length - 1))

          // Random glitch effect during deletion
          if (Math.random() > 0.9) {
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 150)
          }

          if (currentText.length === 0) {
            setIsDeleting(false)
            setCurrentIndex((currentIndex + 1) % phrases.length)

            // Strong glitch effect between phrases
            setGlitchActive(true)
            setTimeout(() => setGlitchActive(false), 200)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, phrases])

  return (
    <div className="text-slate-300">
      <span
        className={`inline-block ${glitchActive ? "glitch-text" : ""}`}
        style={{
          position: "relative",
          minHeight: "1.5em",
        }}
      >
        {currentText}
        <span className="animate-pulse ml-0.5">|</span>

        {/* Glitch layers */}
        {glitchActive && (
          <>
            <span
              className="absolute top-0 left-0 text-red-500 opacity-70"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
                transform: "translate(-2px, -2px)",
                zIndex: -1,
              }}
            >
              {currentText}
            </span>
            <span
              className="absolute top-0 left-0 text-blue-500 opacity-70"
              style={{
                clipPath: "polygon(0 45%, 100% 45%, 100% 100%, 0 100%)",
                transform: "translate(2px, 2px)",
                zIndex: -1,
              }}
            >
              {currentText}
            </span>
          </>
        )}
      </span>
    </div>
  )
}
