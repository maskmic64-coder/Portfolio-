"use client"

import { useState } from "react"
import { Terminal, MountainIcon as Mountains, Target } from "lucide-react"
import { motion } from "framer-motion"

interface ViewSelectorProps {
  onSelectView: (view: string) => void
}

export default function ViewSelector({ onSelectView }: ViewSelectorProps) {
  const [hoverTerminal, setHoverTerminal] = useState(false)
  const [hoverParallax, setHoverParallax] = useState(false)
  const [hoverShooting, setHoverShooting] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-slate-800 dark:text-white">
        Choose Your Experience
      </h1>
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl">
        <motion.button
          className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoverTerminal(true)}
          onMouseLeave={() => setHoverTerminal(false)}
          onClick={() => onSelectView("terminal")}
        >
          <Terminal
            size={64}
            className={`mb-4 ${hoverTerminal ? "text-emerald-500" : "text-slate-700 dark:text-slate-300"} transition-colors`}
          />
          <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Terminal View</h2>
          <p className="text-center text-slate-600 dark:text-slate-400">
            Experience a command-line interface with interactive commands
          </p>
        </motion.button>

        <motion.button
          className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoverParallax(true)}
          onMouseLeave={() => setHoverParallax(false)}
          onClick={() => onSelectView("parallax")}
        >
          <Mountains
            size={64}
            className={`mb-4 ${hoverParallax ? "text-purple-500" : "text-slate-700 dark:text-slate-300"} transition-colors`}
          />
          <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Parallax View</h2>
          <p className="text-center text-slate-600 dark:text-slate-400">
            Explore a visually rich interface with parallax scrolling effects
          </p>
        </motion.button>

        <motion.button
          className="flex-1 flex flex-col items-center justify-center p-8 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoverShooting(true)}
          onMouseLeave={() => setHoverShooting(false)}
          onClick={() => onSelectView("shooting")}
        >
          <Target
            size={64}
            className={`mb-4 ${hoverShooting ? "text-red-500" : "text-slate-700 dark:text-slate-300"} transition-colors`}
          />
          <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Shooting Game</h2>
          <p className="text-center text-slate-600 dark:text-slate-400">
            Interactive shooting game to explore portfolio sections
          </p>
        </motion.button>
      </div>
    </div>
  )
}
