"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useTheme } from "next-themes"
import { TypewriterEffectWithGlitch } from "./typewriter-effects"

export default function ImmersiveParallax() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  // Set up parallax scrolling with smoother spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Smoother scroll progress with spring physics
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Sky gradient transitions based on scroll
  const skyTopColor = useTransform(
    smoothScrollProgress,
    [0, 1],
    theme === "dark" ? ["#0f172a", "#020617"] : ["#7dd3fc", "#bae6fd"],
  )

  const skyBottomColor = useTransform(
    smoothScrollProgress,
    [0, 1],
    theme === "dark" ? ["#1e293b", "#0f172a"] : ["#e0f2fe", "#93c5fd"],
  )

  // Sun/Moon position based on scroll
  const celestialY = useTransform(smoothScrollProgress, [0, 1], ["15%", "60%"])
  const celestialX = useTransform(smoothScrollProgress, [0, 1], ["75%", "50%"])
  const celestialSize = useTransform(
    smoothScrollProgress,
    [0, 1],
    theme === "dark" ? ["5rem", "7rem"] : ["8rem", "10rem"],
  )
  const celestialGlow = useTransform(
    smoothScrollProgress,
    [0, 1],
    theme === "dark"
      ? ["0 0 30px 10px rgba(241, 245, 249, 0.3)", "0 0 50px 20px rgba(241, 245, 249, 0.4)"]
      : ["0 0 60px 30px rgba(251, 191, 36, 0.7)", "0 0 80px 40px rgba(251, 191, 36, 0.8)"],
  )

  // Star opacity (only visible in dark mode)
  const starsOpacity = useTransform(smoothScrollProgress, [0, 0.5, 1], [0.3, 0.6, 1])

  // Cloud opacity (only visible in light mode)
  const cloudsOpacity = useTransform(smoothScrollProgress, [0, 0.5, 1], [1, 0.7, 0.4])

  // Mountain layers with different parallax speeds
  const mountainLayer1Y = useTransform(smoothScrollProgress, [0, 1], ["0%", "20%"])
  const mountainLayer2Y = useTransform(smoothScrollProgress, [0, 1], ["0%", "15%"])
  const mountainLayer3Y = useTransform(smoothScrollProgress, [0, 1], ["0%", "10%"])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  // Determine if we're in dark mode from the theme
  const isDarkMode = theme === "dark"

  return (
    <div
      ref={containerRef}
      className="relative h-[100vh] overflow-hidden"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Sky background with gradient that changes based on scroll */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to bottom, ${skyTopColor}, ${skyBottomColor})`,
          willChange: "background",
        }}
      />

      {/* Stars (visible only in dark mode) */}
      {isDarkMode && <StarField mousePosition={mousePosition} opacity={starsOpacity} />}

      {/* Sun/Moon with parallax effect */}
      <motion.div
        className="absolute z-20"
        style={{
          top: celestialY,
          left: celestialX,
          width: celestialSize,
          height: celestialSize,
          borderRadius: "50%",
          backgroundColor: isDarkMode ? "#f1f5f9" : "#fbbf24",
          boxShadow: celestialGlow,
          transform: "translate(-50%, -50%)",
          willChange: "transform, background-color, box-shadow, top, left, width, height",
        }}
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      >
        {/* Moon craters (only visible in dark mode) */}
        {isDarkMode && (
          <>
            <div
              className="absolute rounded-full bg-slate-300 opacity-70"
              style={{ width: "1.2rem", height: "1.2rem", top: "25%", left: "25%" }}
            />
            <div
              className="absolute rounded-full bg-slate-300 opacity-70"
              style={{ width: "0.8rem", height: "0.8rem", top: "60%", left: "40%" }}
            />
            <div
              className="absolute rounded-full bg-slate-300 opacity-70"
              style={{ width: "1rem", height: "1rem", top: "30%", left: "65%" }}
            />
          </>
        )}
      </motion.div>

      {/* Clouds (only visible in light mode) */}
      {!isDarkMode && <CloudLayer mousePosition={mousePosition} opacity={cloudsOpacity} />}

      {/* Mountain layers with different parallax speeds */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{
          y: mountainLayer1Y,
          height: "25vh",
          zIndex: 40,
          willChange: "transform",
        }}
        animate={{
          x: mousePosition.x * 10,
          rotateX: mousePosition.y * 2,
          rotateY: -mousePosition.x * 2,
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill={isDarkMode ? "#312e81" : "#818cf8"}
            fillOpacity={isDarkMode ? 0.7 : 0.6}
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{
          y: mountainLayer2Y,
          height: "30vh",
          zIndex: 50,
          willChange: "transform",
        }}
        animate={{
          x: mousePosition.x * 7,
          rotateX: mousePosition.y * 1.5,
          rotateY: -mousePosition.x * 1.5,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill={isDarkMode ? "#1e1b4b" : "#6366f1"}
            fillOpacity={isDarkMode ? 0.8 : 0.7}
            d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full"
        style={{
          y: mountainLayer3Y,
          height: "35vh",
          zIndex: 60,
          willChange: "transform",
        }}
        animate={{
          x: mousePosition.x * 4,
          rotateX: mousePosition.y * 1,
          rotateY: -mousePosition.x * 1,
        }}
        transition={{
          type: "spring",
          stiffness: 40,
          damping: 20,
        }}
      >
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill={isDarkMode ? "#0f172a" : "#4f46e5"}
            fillOpacity={isDarkMode ? 0.9 : 0.8}
            d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-70">
        <motion.div
          className="text-center px-4 text-white"
          animate={{
            y: mousePosition.y * -20,
            x: mousePosition.x * -20,
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 15,
          }}
        >
          <h1 className="text-xl font-bold mb-4 text-sky-500 dark:text-amber-400">Hi I'm</h1>

          <div className="glitch-container">
            <TypewriterEffectWithGlitch
              phrases={[
                "Het Mehta",
                "AI Engineer",
                "ML Engineer",
                "Cyber Enthusiast",
                "Full Stack Developer",
                "Youtuber",
              ]}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-70">
        <motion.div
          className="flex flex-col items-center text-white"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="mb-2 text-sm">Scroll Down</p>
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
            }}
          >
            <motion.div
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{
                y: [0, 4, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// Enhanced Star Field Component
function StarField({
  mousePosition,
  opacity,
}: {
  mousePosition: { x: number; y: number }
  opacity: any
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create stars with varying depths
    const stars: { x: number; y: number; size: number; brightness: number; speed: number; depth: number }[] = []
    const starCount = Math.floor((canvas.width * canvas.height) / 800)

    for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5 + 0.5,
    brightness: Math.random(),
    speed: Math.random() * 0.2 + 0.05,
    depth: Math.random(),
  })
}


    // Animation loop
   let animationFrameId: number

const draw = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (const star of stars) {
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * opacity})`
    ctx.fill()

    star.x += star.speed * (mousePosition.x - 0.5)
    star.y += star.speed * (mousePosition.y - 0.5)

    if (star.x < 0) star.x = canvas.width
    if (star.y < 0) star.y = canvas.height
    if (star.x > canvas.width) star.x = 0
    if (star.y > canvas.height) star.y = 0
  }

  animationFrameId = requestAnimationFrame(draw)
}

draw()

return () => cancelAnimationFrame(animationFrameId)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition, opacity])

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" style={{ opacity: 1 }} />
}

// Cloud Layer Component
function CloudLayer({
  mousePosition,
  opacity,
}: {
  mousePosition: { x: number; y: number }
  opacity: any
}) {
  // Generate cloud positions
  const cloudPositions = [
    { left: "10%", width: 180, height: 90, top: "15%", delay: 0, speed: 15 },
    { left: "30%", width: 220, height: 110, top: "25%", delay: 0.1, speed: 12 },
    { left: "60%", width: 200, height: 100, top: "20%", delay: 0.2, speed: 10 },
    { left: "85%", width: 160, height: 80, top: "30%", delay: 0.3, speed: 8 },
    { left: "45%", width: 240, height: 120, top: "10%", delay: 0.4, speed: 5 },
  ]

  return (
    <motion.div
      className="absolute inset-x-0 z-30"
      style={{
        opacity,
        willChange: "opacity",
      }}
    >
      {cloudPositions.map((cloud, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: cloud.left,
            top: cloud.top,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
          }}
          animate={{
            x: mousePosition.x * cloud.speed,
            y: mousePosition.y * cloud.speed,
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 20,
            delay: cloud.delay,
          }}
        >
          <Cloud width={cloud.width} height={cloud.height} />
        </motion.div>
      ))}
    </motion.div>
  )
}

// Cloud Component
function Cloud({ width, height }: { width: number; height: number }) {
  return (
    <svg viewBox="0 0 200 100" width={width} height={height} className="drop-shadow-lg">
      <defs>
        <radialGradient id="cloudGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0.8" />
        </radialGradient>
      </defs>
      <g>
        <ellipse cx="80" cy="60" rx="40" ry="30" fill="url(#cloudGradient)" />
        <ellipse cx="120" cy="60" rx="40" ry="30" fill="url(#cloudGradient)" />
        <ellipse cx="60" cy="50" rx="30" ry="20" fill="url(#cloudGradient)" />
        <ellipse cx="100" cy="40" rx="35" ry="25" fill="url(#cloudGradient)" />
        <ellipse cx="140" cy="50" rx="30" ry="20" fill="url(#cloudGradient)" />
      </g>
    </svg>
  )
}
