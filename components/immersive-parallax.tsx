"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"
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

  // Sky gradient transitions
  const skyTopColors = [
    "rgb(135, 206, 235)", // Day - sky blue
    "rgb(255, 183, 107)", // Sunset - orange
    "rgb(65, 88, 208)", // Dusk - deep blue
    "rgb(25, 25, 62)", // Night - dark blue
  ]

  const skyBottomColors = [
    "rgb(220, 237, 255)", // Day - light blue
    "rgb(255, 111, 60)", // Sunset - deep orange
    "rgb(128, 19, 54)", // Dusk - purple
    "rgb(10, 10, 35)", // Night - very dark blue
  ]

  const skyColorTop = useTransform(smoothScrollProgress, [0, 0.33, 0.66, 1], skyTopColors)

  const skyColorBottom = useTransform(smoothScrollProgress, [0, 0.33, 0.66, 1], skyBottomColors)

  // Sun/Moon transitions
  const sunMoonY = useTransform(smoothScrollProgress, [0, 0.5, 1], ["25%", "100%", "25%"])

  const sunMoonX = useTransform(smoothScrollProgress, [0, 0.5, 1], ["75%", "50%", "25%"])

  const sunMoonSize = useTransform(smoothScrollProgress, [0, 0.4, 0.6, 1], ["6rem", "8rem", "5rem", "4rem"])

  const sunMoonColors = [
    "rgb(255, 215, 0)", // Sun - gold
    "rgb(255, 165, 0)", // Setting sun - orange
    "rgb(255, 250, 240)", // Rising moon - off-white
    "rgb(230, 230, 250)", // Moon - pale lavender
  ]

  const sunMoonColor = useTransform(smoothScrollProgress, [0, 0.4, 0.6, 1], sunMoonColors)

  const sunMoonGlows = [
    "0 0 60px 20px rgba(255, 215, 0, 0.7)", // Sun glow
    "0 0 80px 40px rgba(255, 165, 0, 0.8)", // Setting sun glow
    "0 0 40px 20px rgba(255, 250, 240, 0.5)", // Rising moon glow
    "0 0 30px 15px rgba(230, 230, 250, 0.4)", // Moon glow
  ]

  const sunMoonGlow = useTransform(smoothScrollProgress, [0, 0.4, 0.6, 1], sunMoonGlows)

  // Star field opacity and scale
  const starsOpacity = useTransform(smoothScrollProgress, [0.3, 0.6, 0.8], [0, 0.5, 1])

  // Cloud layers opacity and movement
  const cloudsOpacity = useTransform(smoothScrollProgress, [0.3, 0.7], [1, 0])

  // Mountain layers with different parallax speeds
  const mountainLayers = [
    {
      speed: useTransform(smoothScrollProgress, [0, 1], ["0%", "10%"]),
      height: "25vh",
      zIndex: 40,
      fill: theme === "dark" ? "#312e81" : "#818cf8",
      opacity: theme === "dark" ? 0.7 : 0.6,
      path: "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    },
    {
      speed: useTransform(smoothScrollProgress, [0, 1], ["0%", "20%"]),
      height: "30vh",
      zIndex: 50,
      fill: theme === "dark" ? "#1e1b4b" : "#6366f1",
      opacity: theme === "dark" ? 0.8 : 0.7,
      path: "M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    },
    {
      speed: useTransform(smoothScrollProgress, [0, 1], ["0%", "30%"]),
      height: "35vh",
      zIndex: 60,
      fill: theme === "dark" ? "#0f172a" : "#4f46e5",
      opacity: theme === "dark" ? 0.9 : 0.8,
      path: "M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    },
  ]

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
          background: `linear-gradient(to bottom, ${skyColorTop}, ${skyColorBottom})`,
          willChange: "background",
        }}
      />

      {/* Stars (visible as we scroll to night) */}
      <StarField opacity={starsOpacity} mousePosition={mousePosition} />

      {/* Sun/Moon with 3D effect */}
      <motion.div
        className="absolute z-20"
        style={{
          top: sunMoonY,
          left: sunMoonX,
          width: sunMoonSize,
          height: sunMoonSize,
          borderRadius: "50%",
          backgroundColor: sunMoonColor,
          boxShadow: sunMoonGlow,
          transform: "translate(-50%, -50%)",
          willChange: "transform, background-color, box-shadow",
        }}
        animate={{
          x: mousePosition.x * 10,
          y: mousePosition.y * 10,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
        }}
      />

      {/* Cloud layers with 3D effect */}
      <CloudLayer
        opacity={cloudsOpacity}
        depth={1}
        scrollProgress={smoothScrollProgress}
        mousePosition={mousePosition}
      />

      {/* Mountain layers with 3D effect */}
      {mountainLayers.map((layer, index) => (
        <motion.div
          key={index}
          className="absolute bottom-0 left-0 right-0 w-full"
          style={{
            y: layer.speed,
            height: layer.height,
            zIndex: layer.zIndex,
            willChange: "transform",
          }}
          animate={{
            x: mousePosition.x * (10 - index * 3),
            rotateX: mousePosition.y * 2,
            rotateY: -mousePosition.x * 2,
          }}
          transition={{
            type: "spring",
            stiffness: 60 - index * 10,
            damping: 20,
          }}
        >
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path fill={layer.fill} fillOpacity={layer.opacity} d={layer.path}></path>
          </svg>
        </motion.div>
      ))}

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
  opacity,
  mousePosition,
}: {
  opacity: MotionValue<number>
  mousePosition: { x: number; y: number }
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
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        depth: Math.random() * 3 + 1,
      })
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get current opacity value
      const currentOpacity = opacity.get()

      // Draw stars with depth-based parallax
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.speed * 10) * 0.2 + 0.8

        // Apply mouse movement parallax based on star depth
        const parallaxX = mousePosition.x * (star.depth * 2)
        const parallaxY = mousePosition.y * (star.depth * 2)

        const x = star.x + parallaxX
        const y = star.y + parallaxY

        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness * twinkle * currentOpacity})`
        ctx.beginPath()
        ctx.arc(x, y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [opacity, mousePosition])

  return <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" style={{ opacity: 1 }} />
}

// Enhanced Cloud Layer Component
function CloudLayer({
  opacity,
  depth,
  scrollProgress,
  mousePosition,
}: {
  opacity: MotionValue<number>
  depth: number
  scrollProgress: MotionValue<number>
  mousePosition: { x: number; y: number }
}) {
  // Generate cloud positions based on depth
  const cloudPositions = [
    { left: "10%", width: 180, height: 90, top: "15%", delay: 0 },
    { left: "30%", width: 220, height: 110, top: "25%", delay: 0.1 },
    { left: "60%", width: 200, height: 100, top: "20%", delay: 0.2 },
    { left: "85%", width: 160, height: 80, top: "30%", delay: 0.3 },
    { left: "45%", width: 240, height: 120, top: "10%", delay: 0.4 },
  ]

  // Calculate parallax speeds based on depth
  const baseSpeed = 15 * depth
  const yOffset = useTransform(scrollProgress, [0, 1], ["0%", `${baseSpeed}%`])

  return (
    <motion.div
      className="absolute inset-x-0 z-30"
      style={{
        opacity,
        willChange: "opacity, transform",
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
            x: mousePosition.x * (baseSpeed - cloud.delay * 10),
            y: mousePosition.y * (baseSpeed - cloud.delay * 10),
          }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 20,
            delay: cloud.delay,
          }}
        >
          <motion.div style={{ y: yOffset }} className="w-full h-full">
            <Cloud width={cloud.width} height={cloud.height} />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Enhanced Cloud Component
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
