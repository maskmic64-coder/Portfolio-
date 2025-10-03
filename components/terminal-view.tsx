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

  const [historyIndex, setHistoryIndex] = useState(-1)
  const [inputHistory, setInputHistory] = useState<string[]>([])
  const [tempInput, setTempInput] = useState("")
  const availableCommands = [
    "help",
    "whoami",
    "projects",
    "skills",
    "achievements",
    "experience",
    "competitive",
    "startup",
    "contact",
    "clear",
    "resume",
  ]

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
      if (input.trim()) {
        // Add command to history
        setInputHistory((prev) => [...prev, input])
        setHistoryIndex(-1)
        processCommand(input)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      // Command completion
      const currentInput = input.toLowerCase().trim()
      if (currentInput) {
        const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(currentInput))
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0])
        } else if (matchingCommands.length > 1) {
          // Show available completions
          const completionsOutput = {
            command: input,
            output: (
              <div>
                <p className="text-yellow-400">Available completions:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {matchingCommands.map((cmd, index) => (
                    <span key={index} className="text-green-400">
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            ),
          }
          setCommandHistory((prev) => [...prev, completionsOutput])
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      // Navigate command history (up)
      if (inputHistory.length > 0) {
        if (historyIndex === -1) {
          // Save current input before navigating history
          setTempInput(input)
          setHistoryIndex(inputHistory.length - 1)
          setInput(inputHistory[inputHistory.length - 1])
        } else if (historyIndex > 0) {
          setHistoryIndex(historyIndex - 1)
          setInput(inputHistory[historyIndex - 1])
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      // Navigate command history (down)
      if (historyIndex !== -1) {
        if (historyIndex === inputHistory.length - 1) {
          setHistoryIndex(-1)
          setInput(tempInput)
        } else {
          setHistoryIndex(historyIndex + 1)
          setInput(inputHistory[historyIndex + 1])
        }
      }
    }
  }

  // Handle resume download
  const handleDownloadResume = () => {
    // Open Google Drive resume link in new tab
    window.open("https://drive.google.com/file/d/1r0apoij6kKZgTzyvbKkziH7c_N02644q/view?usp=drivesdk", "_blank")
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
                <span className="text-green-400">experience</span> - View my work experience
              </li>
              <li>
                <span className="text-green-400">competitive</span> - View my CP Skills
              </li>
              <li>
                <span className="text-green-400">startup</span> - View my startup ventures
              </li>
              <li>
                <span className="text-green-400">contact</span> - Get my contact information
              </li>
              <li>
                <span className="text-green-400">resume</span> - Download my resume
              </li>
              <li>
                <span className="text-green-400">clear</span> - Clear the terminal
              </li>
              <li>
                <span className="text-green-400">help</span> - Show this help message
              </li>
            </ul>
            <p className="mt-2 text-blue-400">
              Pro tip: Use <span className="text-yellow-400">Tab</span> for command completion and{" "}
              <span className="text-yellow-400">↑/↓</span> arrows to navigate command history
            </p>
          </div>
        )
        break

      case "whoami":
        output = (
          <div>
            <p className="font-bold text-xl text-purple-400 mb-2">Het Mehta</p>
            <p className="mb-2">
              Software Engineer skilled in C++, Java, and Python with a strong foundation in data structures and
              algorithms (645+ problems solved).
            </p>
            <p className="mb-2">
              Experienced in building scalable systems, developing AI/ML and NLP solutions, and working with distributed
              architectures and cloud technologies.
            </p>
            <p>
              <span className="text-green-400">Education:</span> B.Tech, Computer Science – G.C.E.T (2022 – 2026) |
              CGPA: 8.59
            </p>
          </div>
        )
        break
      case "achievements":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">My Achievements:</p>
            <div className="ml-4 space-y-4">
              <div>
                <p className="font-bold text-green-400">🏆 Hackathons & Competitions</p>
                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-bold text-blue-400">ISRO IRoC-U 2025 - Selected (Top 170/1600+) 🚀</p>
                    <p>
                      Selected among top 170 teams out of 1600+ colleges for building Martian Terrain Navigation System
                      (Fully-funded).
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400">Odoo Hackathon 2025 - 1st Runners-Up 🏆</p>
                    <p>Built Carbon Footprint Tracker reducing emissions by 20%.</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400">NUV ACM 2025 - Winner 🥇</p>
                    <p>Built Real-time Campus Monitoring & Threat Prediction and Reduction System.</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400">IIT Indore Hackathon - Fluxus Finalist 🥉</p>
                    <p>Reached finals at prestigious IIT Indore Hackathon.</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-green-400">🌐 Open Source Contributions</p>
                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-bold text-blue-400">GirlScript Summer of Code (GssoC) 2025 👩‍💻</p>
                    <p>Active contributor in GirlScript Summer of Code, one of India's largest open-source programs.</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400">Open Source India Connect (OSCI) 2025 🌐</p>
                    <p>Contributing member promoting open-source culture and collaboration.</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-bold text-green-400">🎤 Speaking & Leadership</p>
                <div className="ml-4 space-y-2">
                  <div>
                    <p className="font-bold text-blue-400">Tech Speaker 🎤</p>
                    <p>Delivered technical seminars on GitHub, Competitive Programming (CP), and Hackathon strategy.</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400">CSI Core Team - Technical Head 👨‍💻</p>
                    <p>Leading technical initiatives at Computer Society of India (CSI) Core Team.</p>
                  </div>
                  <div>
                    <p className="font-bold text-blue-400">GeeksforGeeks Campus Ambassador 📚</p>
                    <p>Representing GeeksforGeeks on campus, organizing coding events and workshops.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        break

      case "experience":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">Professional Experience:</p>
            <div className="ml-4 space-y-6">
              <div>
                <p className="font-bold text-green-400">Software Developer Intern - TatvaSoft</p>
                <p className="text-blue-400">May 2025 - June 2025</p>
                <div className="ml-2 mt-2 space-y-1">
                  <p>• Optimized APIs with async Node.js, reducing response time by 40%</p>
                  <p>• Achieved 95%+ test coverage and faster CI/CD deployment</p>
                  <p>• Boosted frontend speed 2.3× with React.js optimizations</p>
                  <p>• Processed 1M+ IoT data points/day using AWS Lambda</p>
                </div>
                <p className="text-purple-400 mt-2">
                  Skills: C++, Java, Python, Node.js, React.js, AWS, Distributed Systems, Problem-Solving
                </p>
              </div>
            </div>
          </div>
        )
        break

      case "projects":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">My Projects:</p>
            <div className="ml-4 space-y-6">
              <div>
                <p className="font-bold text-green-400">1. Carbon Footprint Tracker (Odoo 1st Runner-up) 🏆</p>
                <p className="mb-2">
                  Built a full-stack platform to track and reduce emissions in red-zone industries. Enabled real-time
                  IoT data ingestion (1M+ points/day) with Flask + Node.js + Supabase. Deployed with CI/CD pipelines;
                  achieved 20% reduction through optimized data-driven insights.
                </p>
                <p className="text-blue-400 mb-2">
                  <span className="text-purple-400">Tech Stack:</span> Python, Flask, React.js, Node.js, Supabase, IoT,
                  CI/CD
                </p>
                <p className="text-cyan-400">
                  Link:{" "}
                  <a
                    href="https://github.com/mehtahet619"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </p>
              </div>

              <div>
                <p className="font-bold text-green-400">2. Network Intrusion Detection System (NIDS) 🛡️</p>
                <p className="mb-2">
                  Developed a real-time monitoring system with Snort for packet analysis and ELK dashboards. Optimized
                  Flask APIs and containerized services for scalable, low-latency threat detection. Integrated ML models
                  (CNN-LSTM, Random Forest, XGBoost) for improved accuracy.
                </p>
                <p className="text-blue-400 mb-2">
                  <span className="text-purple-400">Tech Stack:</span> Python, Flask, Scikit-learn, Snort, Wireshark,
                  ELK Stack, Docker
                </p>
                <p className="text-cyan-400">
                  Link:{" "}
                  <a
                    href="https://github.com/mehtahet619"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </p>
              </div>

              <div>
                <p className="font-bold text-green-400">3. AI Legal Research Engine ⚖️</p>
                <p className="mb-2">
                  Built an NLP assistant using LegalBERT and T5 to automatically extract legal information and assist in
                  decision-making. Improved legal research efficiency by 15%.
                </p>
                <p className="text-blue-400 mb-2">
                  <span className="text-purple-400">Tech Stack:</span> Python, Django, React.js, LegalBERT, T5,
                  Elasticsearch, NLP
                </p>
                <p className="text-cyan-400">
                  Link:{" "}
                  <a
                    href="https://github.com/mehtahet619"
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
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
            <div className="ml-4 space-y-2">
              <div>
                <p className="text-green-400 font-semibold">Programming & Software Development:</p>
                <p>
                  Python, Java, C, C++, C#, .NET, JavaScript, HTML, CSS, ReactJS, NodeJS, ExpressJS, Django, Shell
                  Scripting, SDLC, Agile
                </p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Data Structures & Algorithms:</p>
                <p>
                  645+ problems solved (421 on LeetCode). Strong in Arrays, Strings, Linked Lists, Stacks, Queues,
                  Trees, Graphs, Hashing, Dynamic Programming, and Recursion. Proficient in OOP, Debugging
                </p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">AI & Machine Learning:</p>
                <p>
                  NLP, Scikit-learn, TensorFlow, Keras, Pandas, NumPy, Hugging Face Transformers, LangChain, Gemini API,
                  Vector Databases (Pinecone, FAISS, ChromaDB), Retrieval-Augmented Generation (RAG)
                </p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Web & API Technologies:</p>
                <p>HTTP, REST APIs, AJAX, Secure API Development</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Databases:</p>
                <p>SQL, NoSQL, Oracle, Teradata, MongoDB, PostgreSQL, Supabase</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Testing & Code Quality:</p>
                <p>Unit Testing, Integration Testing, Performance Testing, API Testing (Postman)</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">System Design & Architecture:</p>
                <p>
                  ATOM Principles (Scalability, Simplicity, Modularity, Flexibility), System Documentation, Unix, Linux,
                  Distributed Systems, Scalable Design
                </p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Cloud & Deployment:</p>
                <p>Flask, FastAPI, Docker, CI/CD (Jenkins, GitHub Actions), AWS (EC2, S3), Kubernetes (Basic)</p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Security & Payments:</p>
                <p>
                  TCP/IP, Authentication & Authorization, Encryption, OWASP Top 10, Transaction Integrity, Fraud
                  Detection, PCI-DSS Awareness
                </p>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Tools & Utilities:</p>
                <p>Git, Postman, Systemd, Cron Jobs</p>
              </div>
            </div>
          </div>
        )
        break

      case "competitive":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">My Competitive Programming:</p>
            <div className="ml-4 space-y-4">
              <div>
                <p className="font-bold text-green-400">LeetCode - 421+ Problems Solved</p>
                <p>
                  Part of 645+ problems solved across platforms. Strong focus on DSA, algorithms, and problem-solving
                  patterns:&nbsp;
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
                <p className="font-bold text-green-400">Overall: 645+ Problems</p>
                <p>
                  Strong proficiency in Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, Hashing, Dynamic
                  Programming, and Recursion. Skilled in OOP and Debugging.
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

      case "startup":
        output = (
          <div>
            <p className="font-bold text-yellow-400 mb-2">My Startup Ventures:</p>
            <div className="ml-4 space-y-6">
              <div>
                <p className="font-bold text-green-400">LenGen - Carbon Neutrality Solutions 🌱</p>
                <p className="mb-2">
                  Building LenGen, a comprehensive carbon neutrality platform for red zone industries. Our solution
                  helps industries monitor, reduce, and manage their carbon emissions through advanced IoT sensors,
                  AI-powered analytics, and automated reporting systems.
                </p>
                <p className="mb-2">
                  <span className="text-blue-400">Website:</span>{" "}
                  <a
                    href="https://lengen.in/"
                    className="text-blue-400 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    lengen.in
                  </a>
                </p>
                <p className="mb-2">
                  <span className="text-purple-400">Key Features:</span>
                </p>
                <ul className="ml-4 space-y-1">
                  <li>• Real-time emission monitoring with IoT integration</li>
                  <li>• AI-powered predictive analytics for emission reduction</li>
                  <li>• Automated compliance reporting and penalty management</li>
                  <li>• Industry-specific carbon footprint optimization</li>
                </ul>
                <p className="mt-2">
                  <span className="text-green-400">Status:</span> Currently in development and testing phase
                </p>
              </div>

              <div>
                <p className="font-bold text-green-400">CornvAi - AI Sales Automation Platform 🤖</p>
                <p className="mb-2">
                  Developing CornvAi, an AI-powered sales automation platform designed specifically for SMBs. Our
                  platform automates lead generation, outreach campaigns, and deal tracking to help small businesses
                  scale their sales operations efficiently.
                </p>
                <p className="mb-2">
                  <span className="text-blue-400">Tagline:</span> "Automate Your Sales. Accelerate Your Growth."
                </p>
                <p className="mb-2">
                  <span className="text-purple-400">Core Features:</span>
                </p>
                <ul className="ml-4 space-y-1">
                  <li>• AI Outreach Engine - Personalized email & WhatsApp automation</li>
                  <li>• Smart Lead Generation - LinkedIn and Google Maps scraping</li>
                  <li>• CRM Automation - Automatic deal tracking and updates</li>
                  <li>• Sales Insights Dashboard - Pipeline visualization and forecasting</li>
                </ul>
                <p className="mb-2">
                  <span className="text-cyan-400">How It Works:</span>
                </p>
                <ul className="ml-4 space-y-1">
                  <li>1. Connect Your Accounts (Email, WhatsApp, CRM)</li>
                  <li>2. Launch AI-Generated Campaigns</li>
                  <li>3. Track & Close with AI Insights</li>
                </ul>
                <p className="mt-2">
                  <span className="text-green-400">Status:</span> Early development phase, seeking early access users
                </p>
              </div>
            </div>
          </div>
        )
        break

      case "resume":
        // Trigger resume opening
        setTimeout(() => {
          handleDownloadResume()
        }, 500)

        output = (
          <div>
            <p className="text-green-500 mb-2">
              <span className="animate-pulse">🔗</span> Opening resume...
            </p>
            <p>
              If the resume doesn't open automatically, click{" "}
              <button
                onClick={handleDownloadResume}
                className="text-blue-400 underline cursor-pointer hover:text-blue-500"
              >
                here
              </button>
            </p>
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
