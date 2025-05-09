"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Code, Server, Database } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import ImmersiveParallax from "./immersive-parallax"

export default function ParallaxView() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])
  const mountainFarY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const mountainMiddleY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const mountainCloseY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"])

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
  `

  return (
    <>
      <style jsx global>
        {glitchStyles}
      </style>
      <div ref={ref} className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
        <div className="absolute top-4 left-4 z-50">
          <ThemeToggle />
        </div>

        <ImmersiveParallax />

        {/* About Section */}
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-800">
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
                      HTML, CSS, JS, Angular, React & Next.js
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
                    <div className="w-16 h-16 flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 rounded-full mb-3">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 text-orange-500" fill="currentColor">
                        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.111.744 1.715.744 1.144 0 2.392-.926 2.392-2.341 0-.639-.244-1.111-.721-1.587l-2.684-2.607c-1.541-1.541-3.67-2.459-5.994-2.459-2.325 0-4.453.918-5.994 2.459l-4.34 4.38c-1.541 1.541-2.459 3.67-2.459 5.994s.918 4.453 2.459 5.994l4.34 4.38c1.541 1.541 3.67 2.459 5.994 2.459s4.453-.918 5.994-2.459l2.684-2.607c.514-.514.722-1.111.722-1.716 0-1.367-1.144-2.342-2.392-2.342-.571 0-1.144.244-1.716.744z" />
                      </svg>
                    </div>
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
                    <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 text-green-600" fill="currentColor">
                        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.299 3.299 0 0 1-1.647.745 3.293 3.293 0 0 1-1.738-.168 3.316 3.316 0 0 1-1.884-1.613 3.332 3.332 0 0 1-.335-1.368 3.318 3.318 0 0 1 2.77-3.264 3.3 3.3 0 0 1 3.484 1.183c.565.745.848 1.683.792 2.622a3.32 3.32 0 0 1-.877 2.118zm-1.939-.112a1.66 1.66 0 0 0 1.475-1.651 1.664 1.664 0 0 0-1.474-1.652 1.66 1.66 0 0 0-1.475 1.652 1.664 1.664 0 0 0 1.474 1.651zm-6.838-6.39a3.332 3.332 0 0 1 1.738.168 3.32 3.32 0 0 1 1.884 1.613c.242.429.363.913.335 1.4a3.316 3.316 0 0 1-2.77 3.231 3.3 3.3 0 0 1-3.484-1.183 3.325 3.325 0 0 1-.792-2.622 3.32 3.32 0 0 1 .877-2.118c.143-.28.334-.532.565-.745a3.3 3.3 0 0 1 1.647-.744zm.464 4.427a1.66 1.66 0 0 0 1.475-1.651 1.664 1.664 0 0 0-1.475-1.652 1.66 1.66 0 0 0-1.474 1.652 1.664 1.664 0 0 0 1.474 1.651zM4.55 14.315a3.299 3.299 0 0 0 2.212 1.49 3.293 3.293 0 0 0 1.738-.168 3.316 3.316 0 0 0 1.884-1.613 3.332 3.332 0 0 0 .335-1.368 3.318 3.318 0 0 0-2.77-3.264 3.3 3.3 0 0 0-3.484 1.183 3.325 3.325 0 0 0-.792 2.622 3.32 3.32 0 0 0 .877 2.118zm1.939-.112a1.66 1.66 0 0 1-1.475-1.651 1.664 1.664 0 0 1 1.475-1.652 1.66 1.66 0 0 1 1.474 1.652 1.664 1.664 0 0 1-1.474 1.651z" />
                      </svg>
                    </div>
                    <span className="font-medium text-lg">GeeksforGeeks</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">mehtahet619</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
