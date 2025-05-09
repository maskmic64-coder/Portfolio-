"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, Code, Server, Database } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import ImmersiveParallax from "./immersive-parallax"
import { TypewriterEffectWithGlitch } from "./typewriter-effects"

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
                        <path d="https://imgs.search.brave.com/sTMGxSIjcVpkwdFzPo78OgHzwDDQCi5V-SBQNC6I_10/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/aS1oYXZlLWJlZW4t/bGVldGNvZGluZy1m/b3ItYS13aGlsZS1i/dXQtd2hhdC1kb2Vz/LXRoZS12MC11Y3k5/cTd3NDB3dGMxLmpw/Zz93aWR0aD03MjAm/Zm9ybWF0PXBqcGcm/YXV0bz13ZWJwJnM9/NDFlMTFhNTVmYWY4/NmUwYjdiYmJkZGY5/MzRiOTA2MjEyY2Fh/MGZhOQ" />
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
                        <path d="data:image/jpeg;base64,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" />
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
        {/* Footer */}
        <footer className="py-12 px-4 bg-slate-800 dark:bg-slate-950 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Het Mehta</h3>
                <div className="glitch-container">
                  <TypewriterEffectWithGlitch
                    phrases={["AI Engineer", "ML Engineer", "Cyber Enthusiast", "Full Stack Developer", "Youtuber"]}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Connect</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
                      className="flex items-center text-slate-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:mehtahet619@gmail.com"
                      className="flex items-center text-slate-300 hover:text-white transition-colors"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      mehtahet619@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/mehtahet619"
                      className="flex items-center text-slate-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5 mr-2" />
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">CP Profiles</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://leetcode.com/mehtahet619"
                      className="text-slate-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LeetCode
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://auth.geeksforgeeks.org/user/mehtahet619"
                      className="text-slate-300 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GeeksforGeeks
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
              <p>© {new Date().getFullYear()} Het Mehta. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
