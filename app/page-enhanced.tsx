"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { MouseParallax } from "@/components/mouse-parallax"
import { Clouds } from "@/components/cloud"

export default function ParallaxLandscape() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Set up parallax scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Different speeds for different layers
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
  const mountainFarY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const mountainMiddleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const mountainCloseY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-[300vh] relative ${isDarkMode ? "bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900" : "bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500"}`}
    >
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun className="h-6 w-6 text-yellow-300" /> : <Moon className="h-6 w-6 text-slate-800" />}
      </button>

      {/* Stars (visible in dark mode) */}
      {isDarkMode && (
        <motion.div
          className="fixed inset-0 z-0"
          style={{ y: starsY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <MouseParallax strength={5}>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(2px 2px at ${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%, white, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at ${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%, white, rgba(0,0,0,0)),
                                radial-gradient(2px 2px at ${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%, white, rgba(0,0,0,0)),
                                radial-gradient(1px 1px at ${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%, white, rgba(0,0,0,0))`,
                backgroundSize: "550px 550px, 350px 350px, 250px 250px, 150px 150px",
                opacity: 0.6,
              }}
            ></div>
          </MouseParallax>
        </motion.div>
      )}

      {/* Clouds (visible in light mode) */}
      <Clouds isDarkMode={isDarkMode} />

      {/* Sun/Moon */}
      <motion.div className="fixed top-[10%] right-[10%] z-10" style={{ y: starsY }}>
        <MouseParallax strength={15}>
          <div
            className={`w-16 h-16 rounded-full ${isDarkMode ? "bg-gray-300 shadow-[0_0_20px_10px_rgba(255,255,255,0.3)]" : "bg-yellow-300 shadow-[0_0_40px_20px_rgba(255,255,0,0.4)]"}`}
          ></div>
        </MouseParallax>
      </motion.div>

      {/* Far mountains */}
      <motion.div className="fixed bottom-0 left-0 right-0 w-full h-[30vh] z-10" style={{ y: mountainFarY }}>
        <MouseParallax strength={10}>
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill={isDarkMode ? "#312e81" : "#818cf8"}
              fillOpacity={isDarkMode ? "0.7" : "0.9"}
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </MouseParallax>
      </motion.div>

      {/* Middle mountains */}
      <motion.div className="fixed bottom-0 left-0 right-0 w-full h-[35vh] z-20" style={{ y: mountainMiddleY }}>
        <MouseParallax strength={20}>
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill={isDarkMode ? "#1e1b4b" : "#6366f1"}
              fillOpacity={isDarkMode ? "0.8" : "0.9"}
              d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </MouseParallax>
      </motion.div>

      {/* Close mountains */}
      <motion.div className="fixed bottom-0 left-0 right-0 w-full h-[40vh] z-30" style={{ y: mountainCloseY }}>
        <MouseParallax strength={30}>
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill={isDarkMode ? "#0f172a" : "#4f46e5"}
              fillOpacity={isDarkMode ? "0.9" : "0.9"}
              d="M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </MouseParallax>
      </motion.div>

      {/* Foreground silhouette */}
      <motion.div className="fixed bottom-0 left-0 right-0 w-full h-[20vh] z-40" style={{ y: foregroundY }}>
        <MouseParallax strength={40}>
          <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill={isDarkMode ? "#020617" : "#3730a3"}
              d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </MouseParallax>
      </motion.div>

      {/* Content */}
      <div className="relative z-50">
        {/* Hero section */}
        <section className="h-screen flex items-center justify-center relative">
          <motion.div
            className="text-center px-4"
            style={{ y: textY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Parallax Mountains</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80">
              Scroll down to experience the depth of the mountains and stars
            </p>
            <div className="mt-12 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto text-white/70"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </motion.div>
        </section>

        {/* Content sections to enable scrolling */}
        <section className="h-screen flex items-center justify-center bg-transparent">
          <div className="max-w-2xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Immersive Parallax Effect</h2>
            <p className="text-lg text-white/80">
              Notice how the stars move slower than the mountains, creating a sense of depth and immersion as you
              scroll.
            </p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-center bg-transparent">
          <div className="max-w-2xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Multiple Layers</h2>
            <p className="text-lg text-white/80">
              Each mountain range moves at a different speed, enhancing the 3D effect as you continue to scroll.
            </p>
          </div>
        </section>
      </div>

      {/* Shooting stars (visible in dark mode) */}
      {isDarkMode && <ShootingStars />}
    </div>
  )
}

// Shooting stars component
function ShootingStars() {
  return (
    <div className="fixed inset-0 z-5 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => {
        const randomDelay = Math.random() * 15
        const randomDuration = 1 + Math.random() * 2
        const randomTop = Math.random() * 50
        const randomLeft = Math.random() * 100

        return (
          <motion.div
            key={i}
            className="absolute h-px bg-white"
            style={{
              top: `${randomTop}%`,
              left: `${randomLeft}%`,
              width: "50px",
              height: "1px",
              background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
              rotate: "45deg",
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [-10, 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: randomDuration,
              delay: randomDelay,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 15 + Math.random() * 10,
            }}
          />
        )
      })}
    </div>
  )
}
