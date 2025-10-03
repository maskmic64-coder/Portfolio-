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
  ContactShadows,
  Text3D,
  Center,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei"
import type * as THREE from "three"
import { useTheme } from "next-themes"
import ThemeToggle from "./theme-toggle"
import { Download, Github, Linkedin, Mail, Code, Database, Server, Brain } from "lucide-react"

// 3D Scene Components
function FloatingIsland({ position, children, ...props }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <group position={position} {...props}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[3, 4, 1, 8]} />
        <meshStandardMaterial color="#4ade80" />
      </mesh>
      {children}
    </group>
  )
}

function SkillOrb({ position, color, icon, label, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial color={color} distort={0.3} speed={2} roughness={0.1} metalness={0.8} />
        <Html center>
          <div className="pointer-events-none">
            {icon}
            {hovered && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                {label}
              </div>
            )}
          </div>
        </Html>
      </mesh>
    </Float>
  )
}

function ProjectCard({ position, title, description, technologies, rotation = [0, 0, 0] }: any) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.1
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <mesh>
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial color={hovered ? "#3b82f6" : "#1e293b"} metalness={0.5} roughness={0.2} />
      </mesh>
      <Html
        center
        transform
        occlude
        position={[0, 0, 0.11]}
        style={{
          width: "280px",
          height: "350px",
          padding: "20px",
          background: "rgba(15, 23, 42, 0.95)",
          borderRadius: "12px",
          color: "white",
          fontSize: "14px",
          overflow: "hidden",
        }}
      >
        <div className="h-full flex flex-col">
          <h3 className="text-lg font-bold mb-3 text-blue-400">{title}</h3>
          <p className="text-sm mb-4 flex-1 text-gray-300">{description}</p>
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech: string, index: number) => (
              <span key={index} className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  )
}

function ExperienceTimeline() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  const experiences = [
    {
      position: [0, 2, 0],
      company: "TatvaSoft",
      role: "Software Developer Intern",
      period: "May 2025 - June 2025",
      color: "#3b82f6",
    },
    {
      position: [0, 0, 0],
      company: "Zidio Development",
      role: "Python Developer Intern",
      period: "May 2025 - June 2025",
      color: "#10b981",
    },
  ]

  return (
    <group ref={groupRef}>
      {/* Timeline line */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      {experiences.map((exp, index) => (
        <group key={index} position={exp.position}>
          <mesh>
            <sphereGeometry args={[0.3]} />
            <meshStandardMaterial color={exp.color} />
          </mesh>
          <Html center position={[2, 0, 0]}>
            <div className="bg-black/80 text-white p-4 rounded-lg min-w-[250px]">
              <h4 className="font-bold text-blue-400">{exp.role}</h4>
              <p className="text-green-400">{exp.company}</p>
              <p className="text-gray-300 text-sm">{exp.period}</p>
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}

function Scene() {
  const { theme } = useTheme()
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 5, 10)
  }, [camera])

  const handleDownloadResume = () => {
    // Open Google Drive resume link in new tab
    window.open("https://drive.google.com/file/d/12ofoAnD9Wi8eEaNRyFjFtc4eCKLSPe1W/view?usp=sharing", "_blank")
  }

  const projects = [
    {
      title: "Carbon Footprint Tracker",
      description:
        "AI-powered system to monitor and reduce industrial emissions in red-zone sectors. Achieved 20% emission reduction via real-time IoT sensor integration.",
      technologies: ["Python", "TensorFlow", "IoT", "React", "Node.js"],
    },
    {
      title: "Network Intrusion Detection",
      description:
        "AI-enhanced NIDS for real-time detection of anomalous and signature-based threats using CNN-LSTM architecture.",
      technologies: ["Python", "CNN-LSTM", "Cybersecurity", "Flask"],
    },
    {
      title: "AI Legal Research Engine",
      description: "NLP-based legal research assistant using LegalBERT and T5 for smart document search and analysis.",
      technologies: ["NLP", "BERT", "T5", "Django", "React"],
    },
  ]

  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset={theme === "dark" ? "night" : "sunset"} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={1} />

      {/* Background Elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={[20, 20, 20]} size={2} speed={0.4} />

      {/* Main Title */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Center position={[0, 8, 0]}>
          <Text3D
            font="/fonts/Geist_Bold.json"
            size={1.5}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            HET MEHTA
            <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
          </Text3D>
        </Center>
      </Float>

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Center position={[0, 6.5, 0]}>
          <Text fontSize={0.8} color="#10b981" anchorX="center" anchorY="middle">
            Full Stack Developer & AI/ML Engineer
          </Text>
        </Center>
      </Float>

      {/* Skills Orbs */}
      <group position={[0, 4, 0]}>
        <SkillOrb
          position={[-4, 0, 0]}
          color="#8b5cf6"
          icon={<Code className="w-6 h-6 text-white" />}
          label="Frontend Development"
        />
        <SkillOrb
          position={[4, 0, 0]}
          color="#3b82f6"
          icon={<Server className="w-6 h-6 text-white" />}
          label="Backend Development"
        />
        <SkillOrb
          position={[0, 0, -4]}
          color="#10b981"
          icon={<Database className="w-6 h-6 text-white" />}
          label="Database & DevOps"
        />
        <SkillOrb position={[0, 0, 4]} color="#f59e0b" icon={<Brain className="w-6 h-6 text-white" />} label="AI/ML" />
      </group>

      {/* Projects Section */}
      <group position={[0, 0, 0]}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            position={[(index - 1) * 5, 0, -8]}
            rotation={[0, Math.PI * 0.1 * (index - 1), 0]}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
          />
        ))}
      </group>

      {/* Experience Timeline */}
      <group position={[8, 0, 0]}>
        <ExperienceTimeline />
      </group>

      {/* Contact Section */}
      <group position={[-8, 2, 0]}>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh>
            <boxGeometry args={[3, 3, 0.2]} />
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.2} />
          </mesh>
          <Html
            center
            transform
            position={[0, 0, 0.11]}
            style={{
              width: "280px",
              height: "280px",
              padding: "20px",
              background: "rgba(15, 23, 42, 0.95)",
              borderRadius: "12px",
              color: "white",
              textAlign: "center",
            }}
          >
            <div className="h-full flex flex-col justify-center items-center space-y-4">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Get In Touch</h3>

              <div className="flex space-x-4">
                <a
                  href="https://github.com/mehtahet619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/het-mehta-5b9a47236/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:mehtahet619@gmail.com"
                  className="p-2 bg-red-600 rounded-full hover:bg-red-500 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </Html>
        </Float>
      </group>

      {/* Ground */}
      <ContactShadows
        position={[0, -5, 0]}
        opacity={0.4}
        scale={50}
        blur={2}
        far={10}
        resolution={256}
        color="#000000"
      />

      {/* Floating Islands for decoration */}
      <FloatingIsland position={[-15, -2, -10]}>
        <Sparkles count={20} scale={[2, 2, 2]} size={1} speed={0.6} />
      </FloatingIsland>

      <FloatingIsland position={[15, -1, -15]}>
        <Sparkles count={20} scale={[2, 2, 2]} size={1} speed={0.6} />
      </FloatingIsland>
    </>
  )
}

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading 3D Portfolio</h2>
        <p className="text-gray-400">Preparing the immersive experience...</p>
      </div>
    </div>
  )
}

export default function ThreePortfolio() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

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
      <div className="absolute top-4 right-4 z-50 bg-black/80 text-white p-4 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2">Navigation</h3>
        <ul className="text-sm space-y-1">
          <li>• Drag to rotate view</li>
          <li>• Scroll to zoom</li>
          <li>• Click on orbs and cards</li>
          <li>• Explore the 3D space!</li>
        </ul>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ background: "linear-gradient(to bottom, #0f172a, #1e293b)" }}
      >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>

      {/* Bottom Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/80 text-white px-6 py-3 rounded-full flex items-center space-x-4">
          <span className="text-sm">Explore the 3D Portfolio</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
