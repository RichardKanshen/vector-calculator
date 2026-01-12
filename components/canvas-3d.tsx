"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, DragControls, Text } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"

interface Point {
  id: string
  x: number
  y: number
  z: number
  name: string
}

interface Canvas3DProps {
  points: Point[]
  is3D: boolean
  selectedPoint1: string | null
  selectedPoint2: string | null
}

function Scene({ points, is3D, selectedPoint1, selectedPoint2 }: Canvas3DProps) {
  const linesRef = useRef<THREE.LineSegments>(null)
  const pointsRef = useRef<THREE.Points>(null)

  // Create geometry for points
  const pointsGeometry = new THREE.BufferGeometry()
  const pointPositions = points.flatMap((p) => [p.x, p.y, is3D ? p.z : 0])
  pointsGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pointPositions), 3))

  // Create colors for points
  const pointColors = points.map((p) => {
    if (p.id === selectedPoint1 || p.id === selectedPoint2) {
      return [1, 0.5, 0] // Orange for selected
    }
    return [0.3, 0.8, 1] // Cyan for unselected
  })
  pointsGeometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(pointColors.flat()), 3))

  // Create geometry for vectors
  const vectorsGeometry = new THREE.BufferGeometry()
  const vectorPositions: number[] = []
  const vectorColors: number[] = []

  if (selectedPoint1 && selectedPoint2) {
    const p1 = points.find((p) => p.id === selectedPoint1)
    const p2 = points.find((p) => p.id === selectedPoint2)
    if (p1 && p2) {
      vectorPositions.push(p1.x, p1.y, is3D ? p1.z : 0)
      vectorPositions.push(p2.x, p2.y, is3D ? p2.z : 0)
      vectorColors.push(1, 0.5, 0, 1, 0.5, 0)
    }
  }

  if (vectorPositions.length > 0) {
    vectorsGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(vectorPositions), 3))
    vectorsGeometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(vectorColors), 3))
  }

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />

      {/* Grid */}
      <gridHelper args={[20, 20]} position={[0, 0, 0]} />
      <axesHelper args={[5]} />

      {/* Points */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial size={0.3} vertexColors />
      </points>

      {/* Point Labels */}
      {points.map((p) => (
        <Text key={p.id} position={[p.x, p.y + 0.5, is3D ? p.z : 0]} fontSize={0.3} color="#ffffff">
          {p.name}
        </Text>
      ))}

      {/* Vector Line */}
      {vectorPositions.length > 0 && (
        <lineSegments geometry={vectorsGeometry}>
          <lineBasicMaterial vertexColors linewidth={2} />
        </lineSegments>
      )}

      {/* Controls */}
      <OrbitControls />
    </>
  )
}

export default function Canvas3D(props: Canvas3DProps) {
  return (
    <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
      <Scene {...props} />
    </Canvas>
  )
}
