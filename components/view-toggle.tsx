"use client"

import { Terminal, MountainIcon as Mountains, Target } from "lucide-react"
import { motion } from "framer-motion"

interface ViewToggleProps {
  currentView: string
  onToggle: (view: string) => void
}

export default function ViewToggle({ currentView, onToggle }: ViewToggleProps) {
  const getNextView = () => {
    switch (currentView) {
      case "terminal":
        return "parallax"
      case "parallax":
        return "shooting"
      case "shooting":
        return "terminal"
      default:
        return "terminal"
    }
  }

  const getIcon = () => {
    switch (getNextView()) {
      case "terminal":
        return <Terminal className="h-5 w-5 text-emerald-500" />
      case "parallax":
        return <Mountains className="h-5 w-5 text-purple-500" />
      case "shooting":
        return <Target className="h-5 w-5 text-red-500" />
      default:
        return <Terminal className="h-5 w-5 text-emerald-500" />
    }
  }

  const toggleView = () => {
    onToggle(getNextView())
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleView}
      className="flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all"
      title={`Switch to ${getNextView()} view`}
    >
      {getIcon()}
    </motion.button>
  )
}
