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
    // Open Google Drive resume link in new tab
    window.open("https://drive.google.com/file/d/1r0apoij6kKZgTzyvbKkziH7c_N02644q/view?usp=drivesdk", "_blank")
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
                    I'm a Software Engineer skilled in C++, Java, and Python with a strong foundation in data structures
                    and algorithms (645+ problems solved).
                  </p>
                  <p className="text-lg mb-4">
                    Experienced in building scalable systems, developing AI/ML and NLP solutions, and working with
                    distributed architectures and cloud technologies.
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Education:</span> B.Tech, Computer Science – G.C.E.T (2022 – 2026) |
                    CGPA: 8.59
                  </p>
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
                    {/* ISRO IRoC-U */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-red-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-red-600 dark:text-red-400">ISRO IRoC-U 2025</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Top 170/1600+</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Selected among top 170 teams out of 1600+ colleges for building Martian Terrain Navigation
                        System (Fully-funded).
                      </p>
                    </motion.div>

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
                          <p className="text-sm text-gray-600 dark:text-gray-400">1st Runners-Up</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Built Carbon Footprint Tracker reducing emissions by 20%.
                      </p>
                    </motion.div>

                    {/* NUV ACM */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-purple-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">🥇</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-purple-600 dark:text-purple-400">NUV ACM 2025</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Winner</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Built Real-time Campus Monitoring & Threat Prediction and Reduction System.
                      </p>
                    </motion.div>

                    {/* IIT Indore */}
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
                          <p className="text-sm text-gray-600 dark:text-gray-400">Fluxus Finalist</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Reached finals at prestigious IIT Indore Hackathon, competing against top teams.
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
                        Delivered technical seminars on GitHub, Competitive Programming (CP), and Hackathon strategy at
                        tech conferences and meetups.
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
                        Leading technical initiatives at Computer Society of India (CSI) Core Team, organizing workshops
                        and mentoring students in emerging technologies.
                      </p>
                    </motion.div>

                    {/* GeeksforGeeks Campus Ambassador */}
                    <motion.div
                      whileHover={{ y: -10, scale: 1.02 }}
                      className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-green-500"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                          <span className="text-2xl">📚</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-green-600 dark:text-green-400">
                            GeeksforGeeks Campus Ambassador
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Campus Representative</p>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Representing GeeksforGeeks on campus, organizing coding events and workshops to promote
                        competitive programming and problem-solving.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
              {/* END OF 3 SECTIONS */}
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Professional Experience</h2>
              <div className="space-y-8">
                <motion.div whileHover={{ y: -5 }} className="bg-slate-50 dark:bg-slate-700 p-8 rounded-lg shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Software Developer Intern</h3>
                      <p className="text-lg text-green-600 dark:text-green-400 font-semibold">TatvaSoft</p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">May 2025 - Jun 2025</p>
                  </div>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    <li>• Optimized APIs with async Node.js, reducing response time by 40%</li>
                    <li>• Achieved 95%+ test coverage and faster CI/CD deployment</li>
                    <li>• Boosted frontend speed 2.3× with React.js optimizations</li>
                    <li>• Processed 1M+ IoT data points/day using AWS Lambda</li>
                  </ul>
                  <p className="text-purple-400 mt-3 font-medium">
                    Skills: C++, Java, Python, Node.js, React.js, AWS, Distributed Systems, Problem-Solving
                  </p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
              <div className="grid md:grid-cols-1 gap-8">
                {/* Carbon Footprint Tracker */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-green-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                        1. Carbon Footprint Tracker 🏆
                      </h3>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold mb-3">
                        Odoo 1st Runners-Up
                      </p>
                    </div>
                    <a
                      href="https://github.com/mehtahet619"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline text-sm"
                    >
                      GitHub →
                    </a>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    Built a full-stack platform to track and reduce emissions in red-zone industries. Enabled real-time
                    IoT data ingestion (1M+ points/day) with Flask + Node.js + Supabase. Deployed with CI/CD pipelines;
                    achieved 20% reduction through optimized data-driven insights.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Flask", "React.js", "Node.js", "Supabase", "IoT", "CI/CD"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* NIDS */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-blue-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                      2. Network Intrusion Detection System (NIDS) 🛡️
                    </h3>
                    <a
                      href="https://github.com/mehtahet619"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline text-sm"
                    >
                      GitHub →
                    </a>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    Developed a real-time monitoring system with Snort for packet analysis and ELK dashboards. Optimized
                    Flask APIs and containerized services for scalable, low-latency threat detection. Integrated ML
                    models (CNN-LSTM, Random Forest, XGBoost) for improved accuracy.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Flask", "Scikit-learn", "Snort", "Wireshark", "ELK Stack", "Docker"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Legal AI */}
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-purple-500"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
                      3. AI Legal Research Engine ⚖️
                    </h3>
                    <a
                      href="https://github.com/mehtahet619"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline text-sm"
                    >
                      GitHub →
                    </a>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    Built an NLP assistant using LegalBERT and T5 to automatically extract legal information and assist
                    in decision-making. Improved legal research efficiency by 15%.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "Django", "React.js", "LegalBERT", "T5", "Elasticsearch", "NLP"].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Competitive Programming</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div whileHover={{ y: -10 }} className="bg-slate-50 dark:bg-slate-700 p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                    LeetCode - 421+ Problems
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    Part of 645+ problems solved across platforms! Focused on Data Structures, Algorithms, and
                    problem-solving patterns including Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs,
                    Hashing, Dynamic Programming, and Recursion.
                  </p>
                  <a
                    href="https://leetcode.com/u/mehtahet619/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 underline"
                  >
                    View Profile →
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Startup Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Startup Ventures</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-green-500"
                >
                  <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">LenGen 🌱</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">Carbon Neutrality Solutions</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    Building a comprehensive carbon neutrality platform for red zone industries. Our solution helps
                    industries monitor, reduce, and manage their carbon emissions through advanced IoT sensors,
                    AI-powered analytics, and automated reporting systems.
                  </p>
                  <a
                    href="https://lengen.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 underline"
                  >
                    Visit Website →
                  </a>
                </motion.div>

                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg border-l-4 border-blue-500"
                >
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">CornvAi 🤖</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">AI Sales Automation Platform</p>
                  <p className="text-slate-700 dark:text-slate-300 mb-4">
                    Developing an AI-powered sales automation platform designed specifically for SMBs. Our platform
                    automates lead generation, outreach campaigns, and deal tracking to help small businesses scale
                    their sales operations efficiently.
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    "Automate Your Sales. Accelerate Your Growth."
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
                  <h3 className="text-xl font-bold mb-4 text-center">Frontend & Languages</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      React, Next.js
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      JavaScript, TypeScript
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      HTML, CSS, Tailwind
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                      C++, Java, Python
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
                  <h3 className="text-xl font-bold mb-4 text-center">AI/ML & NLP</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      TensorFlow & PyTorch
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      NLP, LangChain, RAG
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      Vector DBs, Gemini API
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-2" />
                      Hugging Face, BERT
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
