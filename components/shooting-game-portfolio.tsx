"use client"

import { useRef, useEffect, useState, Suspense, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  Text,
  Environment,
  Float,
  Html,
  Stars,
  Text3D,
  Center,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"
import ThemeToggle from "./theme-toggle"
import { Download, Github, Linkedin, Mail, Code, User, Briefcase, FolderOpen, Target } from "lucide-react"

// Game State Management
interface GameState {
  score: number
  sectionsRevealed: Set<string>
  currentTarget: string | null
  gameStarted: boolean
  crosshairPosition: { x: number; y: number }
}

// Shooting Game Components
function ShootingGameCrosshair({ position }: { position: { x: number; y: number } }) {
  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: position.x, top: position.y }}
    >
      <Target className="w-8 h-8 text-red-500" strokeWidth={3} />
    </div>
  )
}

function TargetSection({ position, size, color, sectionId, name, icon, isRevealed, onHit, children, ...props }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [hit, setHit] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.1

      // Hit effect
      if (hit) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2
        meshRef.current.scale.setScalar(scale)
      } else {
        const targetScale = hovered ? 1.2 : 1
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
      }
    }
  })

  const handleClick = () => {
    if (!isRevealed) {
      setHit(true)
      onHit(sectionId)
      setTimeout(() => setHit(false), 1000)
    }
  }

  return (
    <group position={position} {...props}>
      {/* Target Ring */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[size * 1.2, size * 1.4, 32]} />
        <meshBasicMaterial color={isRevealed ? "#10b981" : "#ef4444"} transparent opacity={0.3} />
      </mesh>

      {/* Main Target */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial
          color={isRevealed ? color : "#666666"}
          distort={isRevealed ? 0.3 : 0.1}
          speed={isRevealed ? 2 : 0.5}
          roughness={0.3}
          metalness={0.7}
          emissive={hit ? "#ffffff" : "#000000"}
          emissiveIntensity={hit ? 0.5 : 0}
        />
      </mesh>

      {/* Target Label */}
      <Html center position={[0, size + 1.5, 0]}>
        <div className="pointer-events-none text-center">
          <div className="flex flex-col items-center">
            {icon}
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                isRevealed
                  ? "bg-green-500/80 text-white"
                  : hovered
                    ? "bg-red-500/80 text-white"
                    : "bg-black/80 text-gray-300"
              }`}
            >
              {isRevealed ? `✓ ${name}` : `🎯 ${name}`}
            </div>
          </div>
        </div>
      </Html>

      {/* Sparkle effect when hit */}
      {hit && <Sparkles count={50} scale={[size * 3, size * 3, size * 3]} size={2} speed={2} color={color} />}

      {/* Content (only visible when revealed) */}
      {isRevealed && children}
    </group>
  )
}

function AboutTarget({ position, isRevealed, onHit }: any) {
  return (
    <TargetSection
      position={position}
      size={1}
      color="#3b82f6"
      sectionId="about"
      name="About Me"
      icon={<User className="w-6 h-6 text-blue-400" />}
      isRevealed={isRevealed}
      onHit={onHit}
    >
      <Html
        center
        transform
        occlude
        position={[3, 0, 0]}
        style={{
          width: "300px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          border: "2px solid #3b82f6",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-blue-400">🎯 Target Hit! About Me</h3>
          <p className="text-sm mb-3 text-gray-300">
            I'm a passionate Full Stack Developer and AI/ML Engineer with 3+ years of experience building web
            applications that solve real-world problems.
          </p>
          <p className="text-sm text-gray-300">
            My journey in tech began with curiosity about how websites and AI models work, leading me to master both
            fullstack and AI/ML technologies.
          </p>
          <div className="mt-3 text-green-400 text-sm">✅ Section Unlocked!</div>
        </div>
      </Html>
    </TargetSection>
  )
}

function SkillsTarget({ position, isRevealed, onHit }: any) {
  return (
    <TargetSection
      position={position}
      size={1.2}
      color="#8b5cf6"
      sectionId="skills"
      name="Skills"
      icon={<Code className="w-6 h-6 text-purple-400" />}
      isRevealed={isRevealed}
      onHit={onHit}
    >
      <Html
        center
        transform
        occlude
        position={[3.5, 0, 0]}
        style={{
          width: "320px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          border: "2px solid #8b5cf6",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-purple-400">🎯 Target Hit! Technical Skills</h3>
          <div className="space-y-2">
            <div>
              <span className="text-purple-400">Frontend:</span>
              <span className="text-gray-300 text-sm"> React, Next.js, TypeScript, Tailwind CSS</span>
            </div>
            <div>
              <span className="text-blue-400">Backend:</span>
              <span className="text-gray-300 text-sm"> Node.js, Python, Django, Flask</span>
            </div>
            <div>
              <span className="text-green-400">Database:</span>
              <span className="text-gray-300 text-sm"> MongoDB, PostgreSQL, Firebase</span>
            </div>
            <div>
              <span className="text-yellow-400">AI/ML:</span>
              <span className="text-gray-300 text-sm"> TensorFlow, PyTorch, Scikit-learn</span>
            </div>
          </div>
          <div className="mt-3 text-green-400 text-sm">✅ Section Unlocked!</div>
        </div>
      </Html>
    </TargetSection>
  )
}

function ExperienceTarget({ position, isRevealed, onHit }: any) {
  return (
    <TargetSection
      position={position}
      size={1.1}
      color="#10b981"
      sectionId="experience"
      name="Experience"
      icon={<Briefcase className="w-6 h-6 text-green-400" />}
      isRevealed={isRevealed}
      onHit={onHit}
    >
      <Html
        center
        transform
        occlude
        position={[3.2, 0, 0]}
        style={{
          width: "340px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          border: "2px solid #10b981",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-green-400">🎯 Target Hit! Professional Experience</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-blue-400">Software Developer Intern</h4>
              <p className="text-green-400 text-sm">TatvaSoft</p>
              <p className="text-gray-400 text-xs">May 2025 - June 2025</p>
              <p className="text-gray-300 text-sm mt-1">
                Developed web applications using .NET and AngularJS frameworks
              </p>
            </div>
            <div>
              <h4 className="font-bold text-blue-400">Python Developer Intern</h4>
              <p className="text-green-400 text-sm">Zidio Development</p>
              <p className="text-gray-400 text-xs">May 2025 - June 2025</p>
              <p className="text-gray-300 text-sm mt-1">Built data processing pipelines and ML applications</p>
            </div>
          </div>
          <div className="mt-3 text-green-400 text-sm">✅ Section Unlocked!</div>
        </div>
      </Html>
    </TargetSection>
  )
}

function ProjectsTarget({ position, isRevealed, onHit }: any) {
  return (
    <TargetSection
      position={position}
      size={1.3}
      color="#ef4444"
      sectionId="projects"
      name="Projects"
      icon={<FolderOpen className="w-6 h-6 text-red-400" />}
      isRevealed={isRevealed}
      onHit={onHit}
    >
      <Html
        center
        transform
        occlude
        position={[3.8, 0, 0]}
        style={{
          width: "350px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          border: "2px solid #ef4444",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-red-400">🎯 Target Hit! Featured Projects</h3>
          <div className="space-y-3">
            <div className="border-l-2 border-red-400 pl-3">
              <h4 className="font-bold text-blue-400">Carbon Footprint Tracker</h4>
              <p className="text-gray-300 text-sm">AI-powered emission monitoring system</p>
            </div>
            <div className="border-l-2 border-blue-400 pl-3">
              <h4 className="font-bold text-blue-400">Network Intrusion Detection</h4>
              <p className="text-gray-300 text-sm">CNN-LSTM based security system</p>
            </div>
            <div className="border-l-2 border-yellow-400 pl-3">
              <h4 className="font-bold text-blue-400">AI Legal Research Engine</h4>
              <p className="text-gray-300 text-sm">NLP-based legal research assistant</p>
            </div>
          </div>
          <div className="mt-3 text-green-400 text-sm">✅ Section Unlocked!</div>
        </div>
      </Html>
    </TargetSection>
  )
}

function ContactTarget({ position, isRevealed, onHit }: any) {
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Het_Mehta_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <TargetSection
      position={position}
      size={0.9}
      color="#f59e0b"
      sectionId="contact"
      name="Contact"
      icon={<Mail className="w-6 h-6 text-yellow-400" />}
      isRevealed={isRevealed}
      onHit={onHit}
    >
      <Html
        center
        transform
        occlude
        position={[2.8, 0, 0]}
        style={{
          width: "280px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          textAlign: "center",
          border: "2px solid #f59e0b",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">🎯 Target Hit! Get In Touch</h3>

          <div className="space-y-3 mb-4">
            <div>
              <p className="text-gray-400 text-xs">Email</p>
              <a href="mailto:mehtahet619@gmail.com" className="text-blue-400 text-sm hover:underline">
                mehtahet619@gmail.com
              </a>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mb-4">
            <a
              href="https://github.com/mehtahet619"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:mehtahet619@gmail.com"
              className="p-2 bg-red-600 rounded-full hover:bg-red-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm mx-auto"
          >
            <Download className="w-4 h-4" />
            Resume
          </button>
          <div className="mt-3 text-green-400 text-sm">✅ Section Unlocked!</div>
        </div>
      </Html>
    </TargetSection>
  )
}

function GameHUD({ gameState, onStartGame, onResetGame }: any) {
  const totalSections = 5
  const progress = (gameState.sectionsRevealed.size / totalSections) * 100

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/90 text-white p-4 rounded-lg min-w-[300px]">
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold text-yellow-400">🎯 Portfolio Shooting Game</h2>
          <p className="text-sm text-gray-300">Shoot the targets to reveal portfolio sections!</p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="text-sm">
            <span className="text-green-400">Score: {gameState.score}</span>
          </div>
          <div className="text-sm">
            <span className="text-blue-400">
              Progress: {gameState.sectionsRevealed.size}/{totalSections}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center space-x-2">
          {!gameState.gameStarted ? (
            <button
              onClick={onStartGame}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              🎮 Start Game
            </button>
          ) : (
            <button
              onClick={onResetGame}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              🔄 Reset Game
            </button>
          )}
        </div>

        {/* Victory Message */}
        {gameState.sectionsRevealed.size === totalSections && (
          <div className="mt-3 p-3 bg-green-600/20 border border-green-400 rounded text-center">
            <p className="text-green-400 font-bold">🎉 Congratulations!</p>
            <p className="text-sm text-gray-300">You've unlocked all portfolio sections!</p>
          </div>
        )}
      </div>
    </div>
  )
}

function Scene({ gameState, onHit }: any) {
  const { theme } = useTheme()
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 5, 15)
  }, [camera])

  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset={theme === "dark" ? "night" : "sunset"} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} />

      {/* Background */}
      <Stars radius={200} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={[50, 50, 50]} size={3} speed={0.3} color="#8b5cf6" />

      {/* Game Title */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Center position={[0, 8, 0]}>
          <Text3D
            font="/fonts/Geist_Bold.json"
            size={1.2}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
          >
            HET MEHTA
            <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
          </Text3D>
        </Center>
      </Float>

      <Center position={[0, 6.5, 0]}>
        <Text fontSize={0.6} color="#10b981" anchorX="center" anchorY="middle">
          🎯 Shoot to Explore Portfolio
        </Text>
      </Center>

      {/* Target Sections */}
      <AboutTarget position={[-6, 2, 0]} isRevealed={gameState.sectionsRevealed.has("about")} onHit={onHit} />
      <SkillsTarget position={[6, 3, 0]} isRevealed={gameState.sectionsRevealed.has("skills")} onHit={onHit} />
      <ExperienceTarget
        position={[-3, -1, -3]}
        isRevealed={gameState.sectionsRevealed.has("experience")}
        onHit={onHit}
      />
      <ProjectsTarget position={[4, -2, -2]} isRevealed={gameState.sectionsRevealed.has("projects")} onHit={onHit} />
      <ContactTarget position={[0, 0, -5]} isRevealed={gameState.sectionsRevealed.has("contact")} onHit={onHit} />
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-800">
      <div className="text-center">
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <Target className="w-32 h-32 text-red-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Target className="w-16 h-16 text-yellow-400 animate-pulse" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading Shooting Range</h2>
        <p className="text-gray-400">Preparing your interactive portfolio game...</p>
      </div>
    </div>
  )
}

export default function ShootingGamePortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    sectionsRevealed: new Set(),
    currentTarget: null,
    gameStarted: false,
    crosshairPosition: { x: 0, y: 0 },
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Mouse tracking for crosshair
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setGameState((prev) => ({
        ...prev,
        crosshairPosition: { x: e.clientX, y: e.clientY },
      }))
    }

    if (gameState.gameStarted) {
      window.addEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "none" // Hide default cursor
    } else {
      document.body.style.cursor = "default"
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "default"
    }
  }, [gameState.gameStarted])

  const handleHit = useCallback((sectionId: string) => {
    setGameState((prev) => ({
      ...prev,
      score: prev.score + 100,
      sectionsRevealed: new Set([...prev.sectionsRevealed, sectionId]),
    }))
  }, [])

  const handleStartGame = () => {
    setGameState((prev) => ({ ...prev, gameStarted: true }))
  }

  const handleResetGame = () => {
    setGameState({
      score: 0,
      sectionsRevealed: new Set(),
      currentTarget: null,
      gameStarted: false,
      crosshairPosition: { x: 0, y: 0 },
    })
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="h-screen w-full relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>

      {/* Game HUD */}
      <GameHUD gameState={gameState} onStartGame={handleStartGame} onResetGame={handleResetGame} />

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2 text-red-400">🎯 Game Instructions</h3>
        <ul className="text-sm space-y-1">
          <li>• Click targets to reveal sections</li>
          <li>• Each hit scores 100 points</li>
          <li>• Unlock all 5 sections to win</li>
          <li>• Drag to rotate view</li>
          <li>• Scroll to zoom in/out</li>
        </ul>
      </div>

      {/* Custom Crosshair */}
      {gameState.gameStarted && <ShootingGameCrosshair position={gameState.crosshairPosition} />}

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 15], fov: 75 }}
        style={{ background: "radial-gradient(ellipse at center, #1a1a2e 0%, #2d1b69 50%, #0f0f23 100%)" }}
      >
        <Suspense fallback={null}>
          <Scene gameState={gameState} onHit={handleHit} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={30}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>

      {/* Bottom Status */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/90 text-white px-6 py-3 rounded-full flex items-center space-x-4">
          <span className="text-sm">🎮 Interactive Portfolio Shooting Game</span>
          <div className="flex space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  gameState.sectionsRevealed.size > i ? "bg-green-400" : "bg-gray-600"
                } animate-pulse`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
