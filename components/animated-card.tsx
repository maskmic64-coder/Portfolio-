"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface AnimatedCardProps {
  title: string
  description: string
  technologies: string[]
  className?: string
}

export default function AnimatedCard({ title, description, technologies, className = "" }: AnimatedCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`relative w-72 h-80 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden cursor-pointer ${className}`}
      style={{
        boxShadow: hovered 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.3)" 
          : "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative h-full p-6">
        {/* Heading - Initially centered, moves to top on hover */}
        <motion.div 
          className="absolute inset-x-0 px-6"
          initial={{ top: "50%", y: "-50%" }}
          animate={hovered 
            ? { top: "0px", y: "0px" } 
            : { top: "50%", y: "-50%" }
          }
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.h3 
            className="font-bold text-center transition-all duration-500 ease-out"
            animate={hovered 
              ? { fontSize: "1.25rem", color: "#60a5fa", marginBottom: "1rem" } 
              : { fontSize: "1.5rem", color: "#93c5fd", marginBottom: "0rem" }
            }
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {title}
          </motion.h3>
        </motion.div>

        {/* Description and Technologies - Hidden initially, revealed on hover from bottom */}
        <motion.div 
          className="absolute inset-x-0 bottom-0 px-6 pb-6"
          initial={{ opacity: 0, y: 32 }}
          animate={hovered 
            ? { opacity: 1, y: 0 } 
            : { opacity: 0, y: 32 }
          }
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: hovered ? 0.1 : 0 }}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {description}
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: string, index: number) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Subtle background gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  )
}