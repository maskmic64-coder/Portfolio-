"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface CloudProps {
  isDarkMode: boolean
}

export function Clouds({ isDarkMode }: CloudProps) {
  const [clouds, setClouds] = useState<{ id: number; x: number; y: number; scale: number; speed: number }[]>([])

  useEffect(() => {
    // Generate random clouds
    const newClouds = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 5 + Math.random() * 30, // Keep clouds in the upper part of the screen
      scale: 0.5 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.8,
    }))

    setClouds(newClouds)
  }, [])

  if (!isDarkMode) {
    return (
      <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
        {clouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute"
            style={{
              top: `${cloud.y}%`,
              left: `${cloud.x}%`,
              scale: cloud.scale,
            }}
            animate={{
              x: ["0vw", "100vw"],
            }}
            transition={{
              duration: 100 / cloud.speed,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: -((cloud.x / 100) * (100 / cloud.speed)),
            }}
          >
            <svg
              width="200"
              height="60"
              viewBox="0 0 200 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-80"
            >
              <path
                d="M0 28C0 12.536 12.536 0 28 0H172C187.464 0 200 12.536 200 28V28C200 43.464 187.464 56 172 56H28C12.536 56 0 43.464 0 28V28Z"
                fill="white"
              />
              <circle cx="46" cy="22" r="22" fill="white" />
              <circle cx="101" cy="22" r="22" fill="white" />
              <circle cx="156" cy="22" r="22" fill="white" />
            </svg>
          </motion.div>
        ))}
      </div>
    )
  }

  return null
}
