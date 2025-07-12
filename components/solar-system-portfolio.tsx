"use client"

import { useRef, useEffect, useState, Suspense } from "react"
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
import {
  Download,
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Server,
  Brain,
  User,
  Briefcase,
  FolderOpen,
} from "lucide-react"

// Solar System Components
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Sun Core */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color={theme === "dark" ? "#fbbf24" : "#f59e0b"}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.3}
          emissive={theme === "dark" ? "#f59e0b" : "#fbbf24"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Sun Corona */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>

      {/* Sun Flares */}
      <Sparkles count={100} scale={[8, 8, 8]} size={3} speed={0.4} color="#fbbf24" />

      {/* Name Display */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Center position={[0, 3.5, 0]}>
          <Text3D
            font="/fonts/Geist_Bold.json"
            size={0.8}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
          >
            HET MEHTA
            <meshStandardMaterial color="#ffffff" emissive="#fbbf24" emissiveIntensity={0.3} />
          </Text3D>
        </Center>
      </Float>

      <Center position={[0, 2.5, 0]}>
        <Text fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
          Full Stack Developer & AI/ML Engineer
        </Text>
      </Center>
    </group>
  )
}

function Planet({
  position,
  size,
  color,
  orbitRadius,
  orbitSpeed,
  rotationSpeed,
  children,
  name,
  icon,
  onClick,
  ...props
}: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      // Orbit around the sun
      const angle = state.clock.elapsedTime * orbitSpeed
      groupRef.current.position.x = Math.cos(angle) * orbitRadius
      groupRef.current.position.z = Math.sin(angle) * orbitRadius
    }

    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += rotationSpeed
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1

      // Hover effect
      const targetScale = hovered ? 1.3 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={groupRef} position={position} {...props}>
      {/* Orbit Trail */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.05, orbitRadius + 0.05, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>

      {/* Planet */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial color={color} distort={0.2} speed={1} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Planet Atmosphere */}
      <mesh>
        <sphereGeometry args={[size * 1.1, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>

      {/* Planet Label */}
      <Html center position={[0, size + 1, 0]}>
        <div className="pointer-events-none text-center">
          <div className="flex flex-col items-center">
            {icon}
            <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium mt-2">{name}</div>
          </div>
        </div>
      </Html>

      {children}
    </group>
  )
}

function AboutPlanet({ orbitRadius, orbitSpeed }: any) {
  return (
    <Planet
      orbitRadius={orbitRadius}
      orbitSpeed={orbitSpeed}
      rotationSpeed={0.01}
      size={0.8}
      color="#3b82f6"
      name="About Me"
      icon={<User className="w-6 h-6 text-blue-400" />}
    >
      <Html
        center
        transform
        occlude
        position={[2, 0, 0]}
        style={{
          width: "300px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-blue-400">About Me</h3>
          <p className="text-sm mb-3 text-gray-300">
            I'm a passionate Full Stack Developer and AI/ML Engineer with 3+ years of experience building web
            applications that solve real-world problems.
          </p>
          <p className="text-sm text-gray-300">
            My journey in tech began with curiosity about how websites and AI models work, leading me to master both
            fullstack and AI/ML technologies.
          </p>
        </div>
      </Html>
    </Planet>
  )
}

function SkillsPlanet({ orbitRadius, orbitSpeed }: any) {
  const skills = [
    { name: "Frontend", color: "#8b5cf6", icon: <Code className="w-4 h-4" /> },
    { name: "Backend", color: "#3b82f6", icon: <Server className="w-4 h-4" /> },
    { name: "Database", color: "#10b981", icon: <Database className="w-4 h-4" /> },
    { name: "AI/ML", color: "#f59e0b", icon: <Brain className="w-4 h-4" /> },
  ]

  return (
    <Planet
      orbitRadius={orbitRadius}
      orbitSpeed={orbitSpeed}
      rotationSpeed={0.02}
      size={1}
      color="#8b5cf6"
      name="Skills"
      icon={<Code className="w-6 h-6 text-purple-400" />}
    >
      {/* Skill Moons */}
      {skills.map((skill, index) => (
        <SkillMoon
          key={skill.name}
          position={[0, 0, 0]}
          orbitRadius={2.5}
          orbitSpeed={0.5 + index * 0.2}
          size={0.3}
          color={skill.color}
          name={skill.name}
          icon={skill.icon}
          delay={(index * Math.PI) / 2}
        />
      ))}

      <Html
        center
        transform
        occlude
        position={[3, 0, 0]}
        style={{
          width: "280px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-purple-400">Technical Skills</h3>
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
        </div>
      </Html>
    </Planet>
  )
}

function SkillMoon({ orbitRadius, orbitSpeed, size, color, name, icon, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const angle = state.clock.elapsedTime * orbitSpeed + delay
      groupRef.current.position.x = Math.cos(angle) * orbitRadius
      groupRef.current.position.z = Math.sin(angle) * orbitRadius
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      <Html center position={[0, size + 0.5, 0]}>
        <div className="pointer-events-none text-center">
          <div className="flex flex-col items-center">
            {icon}
            <div className="text-white text-xs mt-1">{name}</div>
          </div>
        </div>
      </Html>
    </group>
  )
}

function ExperiencePlanet({ orbitRadius, orbitSpeed }: any) {
  return (
    <Planet
      orbitRadius={orbitRadius}
      orbitSpeed={orbitSpeed}
      rotationSpeed={0.015}
      size={0.9}
      color="#10b981"
      name="Experience"
      icon={<Briefcase className="w-6 h-6 text-green-400" />}
    >
      <Html
        center
        transform
        occlude
        position={[2.5, 0, 0]}
        style={{
          width: "320px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-green-400">Professional Experience</h3>
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
        </div>
      </Html>
    </Planet>
  )
}

function ProjectsPlanet({ orbitRadius, orbitSpeed }: any) {
  const projects = [
    {
      name: "Carbon Tracker",
      color: "#ef4444",
      description: "AI-powered emission monitoring system",
    },
    {
      name: "NIDS System",
      color: "#3b82f6",
      description: "Network intrusion detection with CNN-LSTM",
    },
    {
      name: "Legal AI",
      color: "#f59e0b",
      description: "NLP-based legal research assistant",
    },
  ]

  return (
    <Planet
      orbitRadius={orbitRadius}
      orbitSpeed={orbitSpeed}
      rotationSpeed={0.025}
      size={1.1}
      color="#ef4444"
      name="Projects"
      icon={<FolderOpen className="w-6 h-6 text-red-400" />}
    >
      {/* Project Moons */}
      {projects.map((project, index) => (
        <ProjectMoon
          key={project.name}
          orbitRadius={3}
          orbitSpeed={0.3 + index * 0.15}
          size={0.25}
          color={project.color}
          name={project.name}
          description={project.description}
          delay={(index * (Math.PI * 2)) / 3}
        />
      ))}

      <Html
        center
        transform
        occlude
        position={[3.5, 0, 0]}
        style={{
          width: "300px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-3 text-red-400">Featured Projects</h3>
          <div className="space-y-3">
            {projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-600 pl-3">
                <h4 className="font-bold text-blue-400">{project.name}</h4>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </Planet>
  )
}

function ProjectMoon({ orbitRadius, orbitSpeed, size, color, name, description, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      const angle = state.clock.elapsedTime * orbitSpeed + delay
      groupRef.current.position.x = Math.cos(angle) * orbitRadius
      groupRef.current.position.z = Math.sin(angle) * orbitRadius
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.03
      const targetScale = hovered ? 1.5 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {hovered && (
        <Html center position={[0, size + 1, 0]}>
          <div className="pointer-events-none bg-black/90 text-white p-2 rounded text-center max-w-[150px]">
            <div className="font-bold text-sm">{name}</div>
            <div className="text-xs text-gray-300">{description}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function ContactPlanet({ orbitRadius, orbitSpeed }: any) {
  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/resume.pdf"
    link.download = "Het_Mehta_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Planet
      orbitRadius={orbitRadius}
      orbitSpeed={orbitSpeed}
      rotationSpeed={0.02}
      size={0.7}
      color="#f59e0b"
      name="Contact"
      icon={<Mail className="w-6 h-6 text-yellow-400" />}
    >
      <Html
        center
        transform
        occlude
        position={[2, 0, 0]}
        style={{
          width: "280px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        <div>
          <h3 className="text-lg font-bold mb-4 text-yellow-400">Get In Touch</h3>

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
        </div>
      </Html>
    </Planet>
  )
}

function AsteroidBelt() {
  const asteroids = Array.from({ length: 50 }, (_, i) => ({
    angle: (i / 50) * Math.PI * 2,
    radius: 25 + Math.random() * 5,
    size: 0.1 + Math.random() * 0.2,
    speed: 0.01 + Math.random() * 0.02,
  }))

  return (
    <group>
      {asteroids.map((asteroid, index) => (
        <Asteroid
          key={index}
          angle={asteroid.angle}
          radius={asteroid.radius}
          size={asteroid.size}
          speed={asteroid.speed}
        />
      ))}
    </group>
  )
}

function Asteroid({ angle, radius, size, speed }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const currentAngle = angle + state.clock.elapsedTime * speed
      meshRef.current.position.x = Math.cos(currentAngle) * radius
      meshRef.current.position.z = Math.sin(currentAngle) * radius
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.02
    }
  })

  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[size]} />
      <meshStandardMaterial color="#666666" roughness={0.8} metalness={0.2} />
    </mesh>
  )
}

function Scene() {
  const { theme } = useTheme()
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 15, 20)
  }, [camera])

  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset={theme === "dark" ? "night" : "sunset"} />
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fbbf24" />
      <pointLight position={[20, 10, 20]} intensity={0.5} color="#ffffff" />

      {/* Background */}
      <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

      {/* Nebula Effect */}
      <Sparkles count={200} scale={[100, 100, 100]} size={4} speed={0.2} color="#8b5cf6" />

      {/* Central Sun */}
      <Sun />

      {/* Planets */}
      <AboutPlanet orbitRadius={6} orbitSpeed={0.8} />
      <SkillsPlanet orbitRadius={10} orbitSpeed={0.6} />
      <ExperiencePlanet orbitRadius={14} orbitSpeed={0.4} />
      <ProjectsPlanet orbitRadius={18} orbitSpeed={0.3} />
      <ContactPlanet orbitRadius={22} orbitSpeed={0.2} />

      {/* Asteroid Belt */}
      <AsteroidBelt />
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      <div className="text-center">
        <div className="relative">
          {/* Spinning solar system loader */}
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-spin"></div>
            <div
              className="absolute inset-2 rounded-full border-2 border-blue-400 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "2s" }}
            ></div>
            <div
              className="absolute inset-4 rounded-full border-2 border-purple-400 animate-spin"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute inset-6 rounded-full border-2 border-green-400 animate-spin"
              style={{ animationDirection: "reverse", animationDuration: "4s" }}
            ></div>
            <div className="absolute inset-8 w-16 h-16 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Initializing Solar System</h2>
        <p className="text-gray-400">Preparing your cosmic portfolio experience...</p>
      </div>
    </div>
  )
}

export default function SolarSystemPortfolio() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="h-screen w-full relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 left-4 z-50">
        <ThemeToggle />
      </div>

      {/* Instructions */}
      <div className="absolute top-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2 text-yellow-400">🌌 Solar System Navigation</h3>
        <ul className="text-sm space-y-1">
          <li>
            • <span className="text-yellow-400">☀️ Sun:</span> Your identity
          </li>
          <li>
            • <span className="text-blue-400">🌍 Blue Planet:</span> About Me
          </li>
          <li>
            • <span className="text-purple-400">🪐 Purple Planet:</span> Skills
          </li>
          <li>
            • <span className="text-green-400">🌱 Green Planet:</span> Experience
          </li>
          <li>
            • <span className="text-red-400">🔴 Red Planet:</span> Projects
          </li>
          <li>
            • <span className="text-yellow-400">🟡 Yellow Planet:</span> Contact
          </li>
          <li className="mt-2 text-gray-400">Drag to explore • Scroll to zoom</li>
        </ul>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 15, 20], fov: 75 }}
        style={{ background: "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)" }}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={8}
            maxDistance={100}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/90 text-white px-6 py-3 rounded-full flex items-center space-x-4">
          <span className="text-sm">🚀 Explore the Portfolio Solar System</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: "0.8s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
