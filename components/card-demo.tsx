import AnimatedCard from './animated-card'

export default function CardDemo() {
  const sampleProjects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution built with modern web technologies. Features include user authentication, payment processing, and real-time inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
      title: "AI Chat Assistant",
      description: "An intelligent conversational AI assistant that helps users with various tasks. Implements natural language processing and machine learning algorithms.",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"]
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills. Built with modern animations and optimized for performance across all devices.",
      technologies: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Animated Project Cards
        </h1>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Hover over the cards to see the smooth animation where the heading moves to the top and reveals the project description and technologies.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {sampleProjects.map((project, index) => (
            <AnimatedCard
              key={index}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
            />
          ))}
        </div>
      </div>
    </div>
  )
}