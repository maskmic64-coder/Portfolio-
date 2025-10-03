"use client"

import { useState, useEffect } from "react"
import { Svg, Path, Animate } from "react-native-svg"

const ImmersiveParallax = ({ isDarkMode }) => {
  const [riverOffset, setRiverOffset] = useState(0)

  useEffect(() => {
    const animateRiver = () => {
      setRiverOffset((prev) => (prev + 1) % 1440)
    }
    const intervalId = setInterval(animateRiver, 50)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Svg width="1440" height="320">
      <Path
        fill={isDarkMode ? "#0f172a" : "#4f46e5"}
        fillOpacity={isDarkMode ? 0.9 : 0.8}
        d={`M${-riverOffset},96L${48 - riverOffset},112C${96 - riverOffset},128,${192 - riverOffset},160,${288 - riverOffset},176C${384 - riverOffset},192,${480 - riverOffset},192,${576 - riverOffset},176C${672 - riverOffset},160,${768 - riverOffset},128,${864 - riverOffset},128C${960 - riverOffset},128,${1056 - riverOffset},160,${1152 - riverOffset},165.3C${1248 - riverOffset},171,${1344 - riverOffset},149,${1392 - riverOffset},138.7L${1440 - riverOffset},128L${1440 - riverOffset},320L${1392 - riverOffset},320C${1344 - riverOffset},320,${1248 - riverOffset},320,${1152 - riverOffset},320C${1056 - riverOffset},320,${960 - riverOffset},320,${864 - riverOffset},320C${768 - riverOffset},320,${672 - riverOffset},320,${576 - riverOffset},320C${480 - riverOffset},320,${384 - riverOffset},320,${288 - riverOffset},320C${192 - riverOffset},320,${96 - riverOffset},320,${48 - riverOffset},320L${-riverOffset},320Z`}
      >
        <Animate
          attributeName="d"
          dur="3s"
          repeatCount="indefinite"
          values={`M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
          M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,144C672,149,768,139,864,122.7C960,107,1056,85,1152,90.7C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
          M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,197.3C672,203,768,181,864,165.3C960,149,1056,139,1152,149.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
          M0,96L48,112C96,128,192,160,288,176C384,192,480,192,576,176C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z`}
        />
      </Path>
      {/* rest of code here */}
    </Svg>
  )
}

export default ImmersiveParallax
