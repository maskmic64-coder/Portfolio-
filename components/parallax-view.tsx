"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, Code, Server, Database } from "lucide-react"
import ThemeToggle from "./theme-toggle"

function TypewriterEffect({ phrases }: { phrases: string[] }) {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[currentIndex]

    // Handle typing and deleting animation
    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setCurrentText(phrase.substring(0, currentText.length + 1))

          // If we've typed the full phrase, start deleting after a pause
          if (currentText.length === phrase.length) {
            setTimeout(() => setIsDeleting(true), 1500)
          }
        } else {
          // Deleting
          setCurrentText(phrase.substring(0, currentText.length - 1))

          // If we've deleted everything, move to next phrase
          if (currentText.length === 0) {
            setIsDeleting(false)
            setCurrentIndex((currentIndex + 1) % phrases.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    ) // Deleting is faster than typing

    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, phrases])

  return (
    <h2 className="text-xl md:text-2xl mb-8 h-8 flex justify-center">
      <span>{currentText}</span>
      <span className="animate-pulse">|</span>
    </h2>
  )
}

export default function ParallaxView() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  return (
    <div ref={ref} className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white">
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section with Parallax */}
      <div className="relative h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-purple-500 to-blue-600 dark:from-purple-900 dark:to-blue-950"
          style={{ y: backgroundY }}
        />

        <motion.div
          className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-20"
          style={{ y: backgroundY }}
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative h-full flex flex-col items-center justify-center px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: textY }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Het Mehta</h1>
            <TypewriterEffect
              phrases={[
                "Full Stack Developer",
                "Artificial Intelligence",
                "Machine Learning",
                "Cybersecurity Enthusiast",
                "Youtuber",
              ]}
            />
            <div className="flex justify-center space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Github className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://github.com/mehtahet619"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center">
              <p className="mb-2">Scroll Down</p>
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <motion.div
                  className="w-1 h-2 bg-white rounded-full mt-2"
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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
                  src="/placeholder.svg?height=400&width=400&text=Profile"
                  alt="Het Mehta Profile Picture"
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
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    HTML,CSS,JS,Angular,React & Next.js
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    TypeScript
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    Framer Motion
                  </li>
                </ul>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Backend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Node.js & Express
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Python & Django
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    RESTful APIs and FastAPIs
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    GraphQL
                  </li>
                </ul>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <Database className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Database & DevOps</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    MongoDB
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    PostgreSQL
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Docker & Kubernetes
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    AWS & Vercel
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg mt-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-4 text-center">AI/ML</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                CNN, Neural Networks, LSTM
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                BERT, T5, LegalBERT, Spacy
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                DVC Pipeline
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Numpy,Pandas,Matplotlib,Scikit-Learn,Seaborn
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Resume Analyzer AI",
                  description:
                    "An AI-powered tool to score resumes, analyze keyword gaps, and suggest role-specific improvements using Gemini API and RandomForest classifier.",
                  tags: ["React", "Gemini API", "RandomForest"],
                  demo: "#",
                  github: "https://github.com/mehtahet619/ResumeAndLinkedInAnalyzer.git",
                  image:
                    "https://imgs.search.brave.com/nbTnsIDwSg4rJqnFFqw5AaoucHKlrkwSb0FHct1jB2Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YXRzZnJpZW5kbHku/Y29tL19uZXh0L2lt/YWdlP3VybD0vX25l/eHQvc3RhdGljL21l/ZGlhL2FpLXJlc3Vt/ZS1idWlsZGVyLmUy/ZDJiMDhlLnBuZyZ3/PTEwODAmcT03NQ.jpeg",
                },
                {
                  title: "Carbon Footprint Tracker",
                  description:
                    "IoT & ML-based platform that predicts emissions, tracks carbon output, and provides recommendations for reduction. Ranked 2nd at Odoo Hackathon 2025.",
                  tags: ["IoT", "Flask", "XGBoost"],
                  demo: "#",
                  github: "https://github.com/virajwarhade/COMPETECODERS_47",
                  image:
                    "https://imgs.search.brave.com/0pruCrNoa942ADICc0D0TYXY0l71C1AWBXwXmM-a7Hc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgz/MDM5NjU1L3Bob3Rv/L2NvMi1jYXJib24t/Zm9vdHByaW50Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1V/bHRuVkNxdEt2dG82/UWsyY0xCSURrZW1x/cGlTTFBPcDVVdjE2/SW4wVzY0PQ",
                },

                {
                  title: "Network Intrusion Detection",
                  description:
                    "Multi-class classification system trained on NSL-KDD dataset using RandomForest, SVM, and KNN with real-time visualization.",
                  tags: ["NSL-KDD", "ML", "Cybersecurity"],
                  demo: "#",
                  github: "#",
                  image:
                    "https://imgs.search.brave.com/qjm2DI3fkPMipHktBq0gwa9wnb_FqnhMFLdzLRy5jhs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9yZXBv/c2l0b3J5LWltYWdl/cy5naXRodWJ1c2Vy/Y29udGVudC5jb20v/MzExMzUzNzI2LzQz/OWMyMjAwLTIzMjUt/MTFlYi04ZmEyLTIw/MWM1ZmU0ZTQ4YQ.jpeg",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        project.image && project.image.trim() !== ""
                          ? project.image
                          : `/placeholder.svg?height=300&width=600&text=${encodeURIComponent(project.title)}`
                      }
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a href={project.demo} className="text-purple-600 dark:text-purple-400 hover:underline">
                        View Demo
                      </a>
                      <a href={project.github} className="text-purple-600 dark:text-purple-400 hover:underline">
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Achievements</h2>
            <ul className="space-y-6 text-lg text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li>
                Secured 2nd place in the Odoo Hackathon 2025 among 150+ teams for building an AI-driven Carbon Footprint
                Tracker.
              </li>
              <li>
                <b> ISRO IRoC-U '25 (Rs. 70,000 Raised, In Progress)</b>
                Got shortlisted in 170 teams amongst 1,600 participating colleges for the ISRO Robotics Challenge 2025
                for making an Autonomous Navigation System for Martian Terrain.
              </li>
              <li>Built NIDS in CVMU Hackathon Finals and secured a postion in Top 5.</li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">CP Profiles</h2>
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              <p className="text-center mb-6 text-lg text-slate-700 dark:text-slate-300">
                I enjoy solving problems and participating in contests across various platforms.
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <a
                  href="https://leetcode.com/mehtahet619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors shadow"
                >
                  <img src="/placeholder.svg?height=40&width=40&text=LeetCode" alt="LeetCode" className="h-10 mb-2" />
                  <span className="font-medium">LeetCode</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">mehtahet619</span>
                </a>

                <a
                  href="https://auth.geeksforgeeks.org/user/mehtahet619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-4 bg-white dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors shadow"
                >
                  <img src="/placeholder.svg?height=40&width=40&text=GFG" alt="GeeksforGeeks" className="h-10 mb-2" />
                  <span className="font-medium">GFG</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">mehtahet619</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <a
                    href="mailto:mehtahet619@gmail.com"
                    className="flex flex-col items-center p-4 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Mail className="h-6 w-6 mb-2" />
                    <span>Gmail</span>
                  </a>
                  <a
                    href="https://github.com/mehtahet619"
                    className="flex flex-col items-center p-4 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Github className="h-6 w-6 mb-2" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/het-mehta-5b9a47236"
                    className="flex flex-col items-center p-4 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Linkedin className="h-6 w-6 mb-2" />
                    <span>Linkedin</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-slate-800 dark:bg-slate-950 text-white text-center">
        <p>© {new Date().getFullYear()} Het Mehta. All rights reserved.</p>
      </footer>
    </div>
  )
}
