"use client"

import { Terminal, MountainIcon as Mountains } from "lucide-react"
import { motion } from "framer-motion"

interface ViewToggleProps {
  currentView: string
  onToggle: (view: string) => void
}

export default function ViewToggle({ currentView, onToggle }: ViewToggleProps) {
  const toggleView = () => {
    const newView = currentView === "terminal" ? "parallax" : "terminal"
    onToggle(newView)
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleView}
      className="flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all"
    >
      {currentView === "terminal" ? (
        <Mountains className="h-5 w-5 text-purple-500" />
      ) : (
        <Terminal className="h-5 w-5 text-emerald-500" />
      )}
    </motion.button>
  )
}
