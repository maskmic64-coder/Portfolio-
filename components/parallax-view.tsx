"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Code,
  Server,
  Database,
  Download,
  Briefcase,
  Calendar,
  MapPin,
  Bot,
  Users,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import ThemeToggle from "./theme-toggle"
import ImmersiveParallax from "./immersive-parallax"
import ContactForm from "./contact-form"

export default function ParallaxView() {
  const ref = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Smoother scroll progress with spring physics
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Enhanced parallax transformations
  const backgroundY = useTransform(smoothScrollProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(smoothScrollProgress, [0, 1], ["0%", "200%"])
  const cloudsFarY = useTransform(smoothScrollProgress, [0, 1], ["0%", "15%"])
  const cloudsMiddleY = useTransform(smoothScrollProgress, [0, 1], ["0%", "30%"])
  const cloudsCloseY = useTransform(smoothScrollProgress, [0, 1], ["0%", "45%"])
  const riverY = useTransform(smoothScrollProgress, [0, 1], ["0%", "60%"])
  const mountainFarY = useTransform(smoothScrollProgress, [0, 1], ["0%", "30%"])
  const mountainMiddleY = useTransform(smoothScrollProgress, [0, 1], ["0%", "50%"])
  const mountainCloseY = useTransform(smoothScrollProgress, [0, 1], ["0%", "70%"])
  const sunMoonY = useTransform(smoothScrollProgress, [0, 1], ["15%", "60%"])
  const sunMoonX = useTransform(smoothScrollProgress, [0, 1], ["75%", "50%"])
  const sunMoonScale = useTransform(smoothScrollProgress, [0, 1], [1, 1.5])
  const sunMoonRotate = useTransform(smoothScrollProgress, [0, 1], [0, 45])

  // Handle resume download
  const handleDownloadResume = () => {
    // Create a link element
    const link = document.createElement("a")
    link.href = "/resume.pdf" // Path to your resume file in public folder
    link.download = "Het_Mehta_Resume.pdf" // Name for the downloaded file
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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

  const glitchStyles = `
    @keyframes glitch {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-2px, 2px);
      }
      40% {
        transform: translate(-2px, -2px);
      }
      60% {
        transform: translate(2px, 2px);
      }
      80% {
        transform: translate(2px, -2px);
      }
      100% {
        transform: translate(0);
      }
    }
    
    .glitch-text {
      animation: glitch 0.2s linear infinite;
      position: relative;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
      50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
    }

    @keyframes slide-in-left {
      0% { transform: translateX(-100px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }

    @keyframes slide-in-right {
      0% { transform: translateX(100px); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }

    .animate-slide-in-left {
      animation: slide-in-left 0.8s ease-out forwards;
    }

    .animate-slide-in-right {
      animation: slide-in-right 0.8s ease-out forwards;
    }
  `

  return (
    <>
      <style jsx global>
        {glitchStyles}
      </style>
      <div ref={ref} className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
        <ImmersiveParallax />
        <div className="absolute top-4 left-4 z-50">
          <ThemeToggle />
        </div>
        <div className="absolute top-4 right-4 z-50">
          <motion.button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="h-4 w-4" />
            <span>Resume</span>
          </motion.button>
        </div>

        {/* About Section */}
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-800 mt-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-square max-w-md mx-auto rounded-full overflow-hidden">
                  <img
                    src="/images/profile.png"
                    alt="Het Mehta Profile Picture"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg mb-4">
                    I'm a passionate Full Stack Developer and AIML Engineer with 3+ years of experience building web
                    applications that solve real-world problems.
                  </p>
                  <p className="text-lg mb-4">
                    My journey in tech began with a curiosity about how websites work and models work, which led me to
                    dive deep into both fullstack and AIML technologies.
                  </p>
                  <p className="text-lg">When I'm not coding, you can find me sleeping, eating, or writing poetry.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">🏆 Achievements</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Achievement 1 */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-yellow-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-600 dark:text-yellow-400">Odoo Hackathon 2025</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Winner</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Won the Odoo Hackathon 2025 for the Carbon Footprint Tracker project, focusing on reducing
                    industrial carbon emissions using IoT sensors and AI.
                  </p>
                </motion.div>

                {/* Achievement 3 */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🥈</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-600 dark:text-green-400">HSBC Hackathon</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Finalist</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Selected as a finalist in the HSBC Hackathon, developing fintech solutions for modern banking
                    challenges.
                  </p>
                </motion.div>

                {/* Achievement 4 */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400">DOT 5G Hackathon</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Finalist (Ongoing)</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Currently competing as a finalist in the DOT 5G Hackathon, working on next-generation 5G
                    applications and solutions.
                  </p>
                </motion.div>

                {/* Achievement 5 */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-red-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-600 dark:text-red-400">ISRO Robotics Challenge</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Shortlisted</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Shortlisted in the top 170 teams among 1,600 colleges for the ISRO IRoC-U challenge, creating an
                    Autonomous Navigation System for Martian Terrain.
                  </p>
                </motion.div>

                {/* Achievement 6 - Tech Speaker */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-indigo-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🎤</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Tech Speaker</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Conference & Meetup Speaker</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Regular speaker at tech conferences and meetups, sharing insights on AI/ML, full-stack development,
                    and emerging technologies. Delivered talks on carbon footprint tracking, network security, and
                    sustainable tech solutions.
                  </p>
                </motion.div>

                {/* Achievement 7 - IIT Indore Hackathon */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-orange-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🥉</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400">IIT Indore Hackathon</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">4th Position</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Secured 4th position in the prestigious IIT Indore Hackathon, competing against top teams from
                    across India. Developed innovative solutions showcasing technical excellence and problem-solving
                    skills.
                  </p>
                </motion.div>

                {/* Achievement 8 - GirlScript Summer of Code */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-pink-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">👩‍💻</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400">GirlScript Summer of Code</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Contributor</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Active contributor in GirlScript Summer of Code, one of India's largest open-source programs.
                    Contributed to multiple projects, mentored newcomers, and helped build inclusive tech communities.
                  </p>
                </motion.div>

                {/* Achievement 9 - Open Source India Connect */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-teal-500"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🌐</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400">Open Source India Connect</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Contributor</p>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    Contributing member of Open Source India Connect, promoting open-source culture and collaboration.
                    Participated in community initiatives, code contributions, and knowledge sharing sessions.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4 md:px-8 bg-slate-100 dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {/* Frontend */}
                <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">Frontend</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      AngularJS,.NET framework
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      TypeScript
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      Tailwind CSS
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      Framer Motion
                    </li>
                  </ul>
                </motion.div>

                {/* Backend */}
                <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                      <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">Backend</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      Node.js & Express
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      Python & Django
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      RESTful APIs and FastAPIs
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      GraphQL
                    </li>
                  </ul>
                </motion.div>

                {/* DevOps */}
                <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <Database className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">Database & DevOps</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      MongoDB
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      PostgreSQL
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      Docker & Kubernetes
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      AWS & Vercel
                    </li>
                  </ul>
                </motion.div>

                {/* AI/ML */}
                <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-pink-600 dark:text-pink-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a4 4 0 0 1 4 4M5 10a7 7 0 0 1 7-7M2 18a10 10 0 0 1 10-10M12 22a10 10 0 0 1-10-10"></path>
                        <path d="M16 6a4 4 0 0 1-4 4M10 10a7 7 0 0 1-5 0M8 18a10 10 0 0 1 0-8M19 22a10 10 0 0 1-7-10"></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">AI/ML</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      TensorFlow & PyTorch
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      Scikit-learn & NLTK
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      Computer Vision & NLP
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      LLMs & Transformers
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-800 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Professional Experience
                </span>
              </motion.h2>

              <div className="relative">
                {/* Animated Timeline line */}
                <motion.div
                  className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden md:block rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  viewport={{ once: true }}
                />

                {/* Experience Items */}
                <div className="space-y-12">
                  {/* TatvaSoft Experience */}
                  <motion.div
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ x: 10 }}
                  >
                    {/* Animated Timeline dot */}
                    <motion.div
                      className="absolute left-6 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg hidden md:flex items-center justify-center animate-pulse-glow"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <Briefcase className="h-3 w-3 text-white" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="md:ml-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full border border-blue-100 dark:border-slate-600"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div className="animate-float">
                          <motion.h3
                            className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            Software Developer Intern
                          </motion.h3>
                          <motion.p
                            className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <MapPin className="h-4 w-4" />
                            TatvaSoft
                          </motion.p>
                        </div>
                        <motion.div
                          className="mt-2 md:mt-0"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          viewport={{ once: true }}
                        >
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium shadow-md">
                            <Calendar className="h-4 w-4" />
                            May 2025 - June 2025
                          </span>
                        </motion.div>
                      </div>

                      <motion.div
                        className="space-y-4 text-slate-700 dark:text-slate-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        viewport={{ once: true }}
                      >
                        <p className="leading-relaxed text-lg">
                          Worked as a Software Developer Intern at TatvaSoft, gaining hands-on experience in .NET and
                          AngularJS development and contributing to real-world projects using modern web technologies.
                        </p>

                        <div className="mt-6">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg">
                            Key Responsibilities & Achievements:
                          </h4>
                          <ul className="space-y-3">
                            {[
                              "Developed and maintained web applications using .NET and AngularJS frameworks",
                              "Collaborated with senior developers on feature implementation and code optimization",
                              "Participated in code reviews and followed industry best practices for clean, maintainable code",
                              "Gained experience with version control systems (Git) and agile development methodologies",
                              "Worked on database integration and API development for seamless data flow",
                            ].map((item, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start group"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                  {item}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <motion.div
                          className="mt-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
                            Technologies Used:
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {["React.js", ".NET", "AngularJS", "Git", "REST APIs"].map((tech, index) => (
                              <motion.span
                                key={tech}
                                className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1, y: -2 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Zidio Experience */}
                  <motion.div
                    className="relative flex items-start"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ x: -10 }}
                  >
                    {/* Animated Timeline dot */}
                    <motion.div
                      className="absolute left-6 w-6 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-full border-4 border-white dark:border-slate-800 shadow-lg hidden md:flex items-center justify-center animate-pulse-glow"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      viewport={{ once: true }}
                      style={{ animationDelay: "1s" }}
                    >
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className="md:ml-16 bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-700 dark:to-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full border border-green-100 dark:border-slate-600"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <div className="animate-float" style={{ animationDelay: "1s" }}>
                          <motion.h3
                            className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                          >
                            Python Developer Intern
                          </motion.h3>
                          <motion.p
                            className="text-lg font-semibold text-green-600 dark:text-green-400 flex items-center gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <MapPin className="h-4 w-4" />
                            Zidio Development
                          </motion.p>
                        </div>
                        <motion.div
                          className="mt-2 md:mt-0"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.7 }}
                          viewport={{ once: true }}
                        >
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-medium shadow-md">
                            <Calendar className="h-4 w-4" />
                            May 2025 - June 2025
                          </span>
                        </motion.div>
                      </div>

                      <motion.div
                        className="space-y-4 text-slate-700 dark:text-slate-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <p className="leading-relaxed text-lg">
                          Worked as a Data Science Intern at Zidio Development, focusing on backend development, data
                          processing, and machine learning applications using Python ecosystem.
                        </p>

                        <div className="mt-6">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-lg">
                            Key Responsibilities & Achievements:
                          </h4>
                          <ul className="space-y-3">
                            {[
                              "Developed Real time stock market prediction automation scripts for various business processes",
                              "Worked with data analysis and visualization using pandas, numpy, and matplotlib",
                              "Built RESTful APIs using Flask and FastAPI frameworks",
                              "Implemented data processing pipelines and ETL operations",
                              "Collaborated on machine learning projects using scikit-learn and TensorFlow",
                            ].map((item, index) => (
                              <motion.li
                                key={index}
                                className="flex items-start group"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                                <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                                  {item}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <motion.div
                          className="mt-6"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.4 }}
                          viewport={{ once: true }}
                        >
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
                            Technologies Used:
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {[
                              "Python",
                              "Flask",
                              "FastAPI",
                              "pandas",
                              "numpy",
                              "scikit-learn",
                              "TensorFlow",
                              "PostgreSQL",
                            ].map((tech, index) => (
                              <motion.span
                                key={tech}
                                className="px-4 py-2 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 text-green-800 dark:text-green-300 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.1, y: -2 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4 md:px-8 bg-slate-100 dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Project 1 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-lg mb-6 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Carbon Footprint Tracker</h3>
                  </div>
                  <div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      AI-powered system to monitor and reduce industrial emissions in red-zone sectors. Achieved a 20%
                      emission reduction via real-time IoT sensor integration.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                        IoT
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        AI
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                        Sustainability
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Project 2 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg mb-6 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Network Intrusion Detection</h3>
                  </div>
                  <div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      AI-enhanced NIDS for real-time detection of anomalous and signature-based threats. Designed a
                      CNN-LSTM-based time-series module to catch evolving attack patterns.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm">
                        Cybersecurity
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        Deep Learning
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">
                        CNN-LSTM
                      </span>
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm">
                        <a
                          href="https://github.com/mehtahet619/NIDS_using_RandomForest"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Github{" "}
                        </a>
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Project 3 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg mb-6 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">AI-Driven Research Engine</h3>
                  </div>
                  <div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      NLP-based legal research assistant using LegalBERT and T5 for smart document search. Boosted legal
                      research speed and decision-making accuracy by 15%.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm">
                        NLP
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        BERT
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                        Legal Tech
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                        <a
                          href="https://github.com/mehtahet619/AI-Driven-Research-Engine-for-Commercial-Courts"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Github
                        </a>
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Project 4 */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg mb-6 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Autonomous Navigation System</h3>
                  </div>
                  <div>
                    <p className="text-slate-700 dark:text-slate-300 mb-4">
                      Developed for the ISRO IRoC-U challenge, creating an autonomous navigation system for Martian
                      terrain using computer vision and reinforcement learning.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                        Robotics
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        Computer Vision
                      </span>
                      <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-sm">
                        RL
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CP Profiles Section */}
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="shadow-lg text-justify"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">CP Profiles</h2>
              <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-lg shadow-lg">
                <p className="text-center mb-6 text-lg text-slate-700 dark:text-slate-300">
                  I enjoy solving problems and participating in contests across various platforms.
                </p>

                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <motion.a
                    href="https://leetcode.com/mehtahet619"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors shadow"
                    whileHover={{ y: -5 }}
                  >
                    <span className="font-medium text-lg">LeetCode</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">mehtahet619</span>
                  </motion.a>

                  <motion.a
                    href="https://auth.geeksforgeeks.org/user/mehtahet619"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-4 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors shadow"
                    whileHover={{ y: -5 }}
                  >
                    <span className="font-medium text-lg">GeeksforGeeks</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">mehtahet619</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Startup Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">🚀 My Startup Ventures</h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* LenGen */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-l-4 border-emerald-500"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-6">
                      <span className="text-3xl">🌱</span>
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">LenGen</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">Carbon Neutrality Solutions</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      Building a comprehensive platform that helps red zone industries achieve carbon neutrality through
                      advanced monitoring, intelligent reduction strategies, and automated compliance management.
                    </p>

                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">🔧 Key Features</h4>
                      <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          Real-time emission monitoring with IoT sensors
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          AI-powered predictive analytics for optimization
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          Automated compliance reporting
                        </li>
                      </ul>
                    </div>

                    <div className="text-center pt-4">
                      <motion.a
                        href="https://lengen.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all shadow-md text-lg font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl">🌐</span>
                        Visit LenGen
                      </motion.a>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">Status:</span> Development
                        & Testing Phase
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* CornvAi */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-l-4 border-blue-500"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-6">
                      <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">CornvAi</h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">AI Sales Automation Platform</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-blue-800 dark:text-blue-300 font-semibold text-center">
                        "Automate Your Sales. Accelerate Your Growth."
                      </p>
                    </div>

                    <p className="text-slate-700 dark:text-slate-300">
                      Developing an AI-powered sales automation platform designed specifically for SMBs. Our platform
                      automates lead generation, outreach campaigns, and deal tracking.
                    </p>

                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">🤖 Core Features</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">AI Outreach Engine</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Smart Lead Generation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4 text-purple-500" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">CRM Automation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">Sales Insights</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3">📈 How It Works</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <span className="text-sm text-slate-700 dark:text-slate-300">Connect Your Accounts</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </div>
                          <span className="text-sm text-slate-700 dark:text-slate-300">Launch AI Campaigns</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </div>
                          <span className="text-sm text-slate-700 dark:text-slate-300">Track & Close Deals</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-4">
                      <motion.button
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md text-lg font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Bot className="w-5 h-5" />
                        Get Early Access
                      </motion.button>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-blue-600 dark:text-blue-400">Status:</span> Early Development
                        Phase
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section with EmailJS Integration */}
        <section className="py-20 px-4 md:px-8 bg-slate-100 dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
                Send me a message and I'll get back to you as soon as possible.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-6 text-center">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                        <a
                          href="mailto:mehtahet619@gmail.com"
                          className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          mehtahet619@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-purple-600 dark:text-purple-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">LinkedIn</p>
                        <a
                          href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          linkedin.com/in/het-mehta
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-full mr-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-slate-700 dark:text-slate-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">GitHub</p>
                        <a
                          href="https://github.com/mehtahet619"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                        >
                          github.com/mehtahet619
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-center space-x-4">
                    <motion.a
                      href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="LinkedIn Profile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </motion.a>

                    <motion.a
                      href="https://github.com/mehtahet619"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="GitHub Profile"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </motion.a>

                    <motion.a
                      href="mailto:mehtahet619@gmail.com"
                      className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Email Contact"
                    >
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
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </motion.a>
                  </div>
                </div>

                {/* Contact Form */}
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
