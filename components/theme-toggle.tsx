"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Set initial theme based on time of day
  useEffect(() => {
    setMounted(true)

    // Check if theme is already set in localStorage
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) return

    // If no theme is set, determine based on time
    const currentHour = new Date().getHours()
    const isDayTime = currentHour >= 6 && currentHour < 18

    setTheme(isDayTime ? "light" : "dark")
  }, [setTheme])

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
    </motion.button>
  )
}
