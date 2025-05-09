"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "./theme-toggle"

interface CommandOutput {
  command: string
  output: React.ReactNode
}

export default function TerminalView() {
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([])
  const [cursorBlink, setCursorBlink] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initial welcome message
  useEffect(() => {
    const initialOutput = [
      {
        command: "",
        output: (
          <div className="text-green-500">
            <p className="text-xl font-bold mb-2">Welcome to Het's Terminal Portfolio v1.0.0</p>
            <p>
              Type <span className="text-yellow-400">help</span> to see available commands
            </p>
          </div>
        ),
      },
    ]
    setCommandHistory(initialOutput)
  }, [])

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commandHistory])

  // Focus input when clicking anywhere in the terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)
      return () => terminal.removeEventListener("click", handleClick)
    }
  }, [])

  // Cursor blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorBlink((prev) => !prev)
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      processCommand(input)
      setInput("")
    }
  }

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    let output: React.ReactNode

    switch (command) {
      case "help":
        output = (
          <div>
            <p className="font-bold text-yellow-400">Available commands:</p>
            <ul className="ml-4">
              <li>
                <span className="text-green-400">whoami</span> - Learn about me
              </li>
              <li>
                <span className="text-green-400">projects</span> - View my projects
              </li>
              <li>
                <span className="text-green-400">skills</span> - See my technical skills
              </li>
              <li>
                <span className="text-green-400">achievements</span> - View my achievements
              </li>
              <li>
                <span className="text-green-400">Competitive Coding</span> - View my CP Skills Type competitive
              </li>
              <li>
                <span className="text-green-400">contact</span> - Get my contact information
              </li>
              <li>
                <span className="text-green-400">clear</span> - Clear the terminal
              </li>
              <li>
                <span className="text-green-400">help</span> - Show this help message
              </li>
            </ul>
          </div>
        )
        break

      case "whoami":
        output = (
          <div>
            <p className="font-bold text-xl text-purple-400 mb-2">Het Mehta</p>
            <p className="mb-2">
              A passionate Full-stack Developer and AI/ML Engineer creating beautiful and interactive web experiences
              and ML Engineering.
            </p>
            <p>With 3+ years of experience in web development and Machine Learning.</p>
          </div>
        )
        break
      case "achievements":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">My Achievements:</p>
            <div className="ml-4 space-y-4">
              <div>
                <p className="font-bold text-green-400">Odoo Hackathon 2025 - 1st Runners Up</p>
                <p>
                  Won 1st Runner-Up for the Carbon Footprint Tracker project, focusing on reducing industrial carbon
                  emissions using IoT sensors and AI.
                </p>
              </div>
              <div>
                <p className="font-bold text-green-400">ISRO Robotics Challenge 2025 - Shortlisted</p>
                <p>
                  Shortlisted in the top 170 teams among 1,600 colleges, for the ISRO IRoC-U challenge, creating an
                  Autonomous Navigation System for Martian Terrain.
                </p>
              </div>
              <div>
                <p className="font-bold text-green-400">Smart India Hackathon 2024</p>
                <p>
                  Participated in SIH 2024, developing an AI-Driven Research Engine for Commercial Courts with a focus
                  on NLP and text processing.
                </p>
              </div>
              <div>
                <p className="font-bold text-green-400">Ongoing Startups</p>
                <p>Building a production grade AI Systems.</p>
              </div>
            </div>
          </div>
        )
        break

      case "projects":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">My Projects:</p>
            <div className="ml-4 space-y-4">
              <div>
                <p className="font-bold text-green-400">Carbon Footprint Tracker (Odoo 1st Runners up)</p>
                <p>
                  Developed an AI-powered system to monitor and reduce industrial emissions in red-zone sectors.
                  Achieved a 20% emission reduction via real-time IoT sensor integration and predictive modeling.
                </p>
              </div>
              <div>
                <p className="font-bold text-green-400">Network Intrusion Detection System (NIDS)</p>
                <p>
                  Built an AI-enhanced NIDS for real-time detection of anomalous and signature-based threats. Designed a
                  CNN-LSTM-based time-series module to catch evolving attack patterns.
                </p>
              </div>
              <div>
                <p className="font-bold text-green-400">AI-Driven Research Engine for Commercial Courts</p>
                <p>
                  Created an NLP-based legal research assistant using LegalBERT and T5 for smart document search.
                  Boosted legal research speed and decision-making accuracy by 15%.
                </p>
              </div>
            </div>
          </div>
        )
        break

      case "skills":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">Technical Skills:</p>
            <div className="ml-4">
              <p>
                <span className="text-green-400">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS, HTML, CSS,
                JavaScript
              </p>
              <p>
                <span className="text-green-400">Backend:</span> Node.js, Express, Python, Django, Flask
              </p>
              <p>
                <span className="text-green-400">Database:</span> MongoDB, PostgreSQL, Firebase, MySQL
              </p>
              <p>
                <span className="text-green-400">DevOps:</span> Docker, AWS, CI/CD, Git, Jenkins
              </p>
              <p>
                <span className="text-green-400">Machine Learning:</span> Scikit-learn, TensorFlow, Keras, XGBoost,
                Random Forest, LSTM, CNN, NLP, BERT
              </p>
              <p>
                <span className="text-green-400">Data Engineering:</span> Pandas, NumPy, PySpark, ETL, Data
                Preprocessing
              </p>
              <p>
                <span className="text-green-400">Cloud & AI Services:</span> Google Cloud, Azure, OpenAI API, GPT,
                Google Gemini
              </p>
              <p>
                <span className="text-green-400">Version Control:</span> Git, GitHub, GitLab
              </p>
              <p>
                <span className="text-green-400">Others:</span> Docker, Agile/Scrum, RESTful APIs, GraphQL, Jira, Trello
              </p>
            </div>
          </div>
        )
        break

      case "competitive":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">My CP:</p>
            <div className="ml-4 space-y-4">
              <div>
                <p className="font-bold text-green-400">LeetCode</p>
                <p>
                  Solved 340+ questions and still going:&nbsp;
                  <a
                    href="https://leetcode.com/u/mehtahet619/"
                    className="text-blue-400 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    leetcode.com/u/mehtahet619
                  </a>
                </p>
              </div>
              <div>
                <p className="font-bold text-green-400">GeeksforGeeks</p>
                <p>
                  Solved 130+ problems:&nbsp;
                  <a
                    href="https://www.geeksforgeeks.org/user/mehtahet619/"
                    className="text-blue-400 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    geeksforgeeks.org/user/mehtahet619
                  </a>
                </p>
              </div>
            </div>
          </div>
        )
        break

      case "contact":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">Contact Information:</p>
            <div className="ml-4">
              <p>
                <span className="text-green-400">Email:</span> mehtahet619@gmail.com
              </p>
              <p>
                <span className="text-green-400">GitHub:</span>{" "}
                <a
                  href="https://github.com/mehtahet619"
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/mehtahet619
                </a>
              </p>
              <p>
                <span className="text-green-400">LinkedIn:</span>{" "}
                <a
                  href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/het-mehta-5b9a47236
                </a>
              </p>
              <p>
                <span className="text-green-400">Leetcode:</span>{" "}
                <a
                  href="https://leetcode.com/u/mehtahet619/"
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  leetcode.com/u/mehtahet619
                </a>
              </p>
            </div>
          </div>
        )
        break

      case "clear":
        setCommandHistory([])
        return

      case "":
        output = <></>
        break

      default:
        output = (
          <p className="text-red-500">
            Command not found: {command}. Type <span className="text-yellow-400">help</span> to see available commands.
          </p>
        )
    }

    setCommandHistory((prev) => [...prev, { command, output }])
  }

  return (
    <div className="min-h-screen bg-slate-900 text-green-400 font-mono p-4 flex flex-col">
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-center mb-4 pt-12">
        <h1 className="text-2xl font-bold">Terminal Portfolio</h1>
      </div>

      <div ref={terminalRef} className="flex-1 bg-slate-950 rounded-lg p-4 overflow-y-auto border border-slate-700">
        <AnimatePresence>
          {commandHistory.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {item.command && (
                <div className="flex items-center mb-1">
                  <span className="text-purple-500 mr-2">hacker@portfolio:~$</span>
                  <span>{item.command}</span>
                </div>
              )}
              <div className="ml-0">{item.output}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center mt-4">
        <span className="text-purple-500">hacker@portfolio:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="ml-2 flex-1 bg-transparent text-green-400 outline-none"
          autoFocus
          placeholder="Type a command"
        />
        {cursorBlink && <span className="text-green-400">|</span>}
      </div>
    </div>
  )
}
