"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Code, Server, Database, Download } from "lucide-react"
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

  // Handle resume download
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Het_Mehta_Resume.pdf"
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

  return (
    <>
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

        {/* 🏆 ACHIEVEMENTS SECTION WITH 3 SUBSECTIONS */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">🏆 Achievements</h2>

              {/* HERE ARE THE 3 SECTIONS YOU WANT: */}
              <div className="space-y-12">
                {/* 🏆 SECTION 1: Hackathons & Competitions */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
                    🏆 Hackathons & Competitions
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Odoo Hackathon */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-yellow-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🏆</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                            Odoo Hackathon 2025
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Winner</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Won the Odoo Hackathon 2025 for the Carbon Footprint Tracker project, focusing on reducing
                        industrial carbon emissions using IoT sensors and AI.
                      </p>
                    </motion.div>

                    {/* HSBC Hackathon */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🥈</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-green-600 dark:text-green-400">HSBC Hackathon</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Finalist</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Selected as a finalist in the HSBC Hackathon, developing fintech solutions for modern banking
                        challenges.
                      </p>
                    </motion.div>

                    {/* DOT 5G Hackathon */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400">DOT 5G Hackathon</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Finalist (Ongoing)</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Currently competing as a finalist in the DOT 5G Hackathon, working on next-generation 5G
                        applications and solutions.
                      </p>
                    </motion.div>

                    {/* IIT Indore Hackathon */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-orange-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🥉</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            IIT Indore Hackathon
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">4th Position</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Secured 4th position in the prestigious IIT Indore Hackathon, competing against top teams from
                        across India.
                      </p>
                    </motion.div>

                    {/* ISRO Robotics Challenge */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-red-600 dark:text-red-400">ISRO Robotics Challenge</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Shortlisted</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Shortlisted in the top 170 teams among 1,600 colleges for the ISRO IRoC-U challenge, creating an
                        Autonomous Navigation System for Martian Terrain.
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* 🌐 SECTION 2: Open Source Contributions */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center text-green-600 dark:text-green-400">
                    🌐 Open Source Contributions
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* GirlScript Summer of Code */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-pink-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">👩‍💻</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-pink-600 dark:text-pink-400">
                            GirlScript Summer of Code
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Contributor</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Active contributor in GirlScript Summer of Code, one of India's largest open-source programs.
                        Contributed to multiple projects, mentored newcomers, and helped build inclusive tech
                        communities.
                      </p>
                    </motion.div>

                    {/* Open Source India Connect */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-teal-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🌐</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-teal-600 dark:text-teal-400">
                            Open Source India Connect
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Contributor</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Contributing member of Open Source India Connect, promoting open-source culture and
                        collaboration. Participated in community initiatives, code contributions, and knowledge sharing
                        sessions.
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* 🎤 SECTION 3: Speaking & Community */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
                    🎤 Speaking & Community
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Tech Speaker */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-indigo-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🎤</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">Tech Speaker</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Conference & Meetup Speaker</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Regular speaker at tech conferences and meetups, sharing insights on AI/ML, full-stack
                        development, and emerging technologies. Delivered talks on carbon footprint tracking, network
                        security, and sustainable tech solutions.
                      </p>
                    </motion.div>

                    {/* CSI Core Team */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">👨‍💻</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400">CSI Core Team</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Technical Head</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Serving as Technical Head of the Computer Society of India (CSI) Core Team, leading technical
                        initiatives, organizing workshops, and mentoring students in emerging technologies. Responsible
                        for coordinating tech events and fostering innovation within the student community.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
              {/* END OF 3 SECTIONS */}
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
                      React, Next.js
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
                      RESTful APIs
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                      GraphQL
                    </li>
                  </ul>
                </motion.div>

                {/* Database & DevOps */}
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
                      Docker & AWS
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                      CI/CD
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
                      Scikit-learn
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      Computer Vision
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      NLP & LLMs
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 md:px-8 bg-slate-100 dark:bg-slate-900">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
              <div className="grid md:grid-cols-2 gap-8">
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
                  </div>
                </div>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
