"use client"

import { useState, useMemo } from "react"
import Canvas3D from "@/components/canvas-3d"
import PointInput from "@/components/point-input"
import VectorStats from "@/components/vector-stats"
import PointList from "@/components/point-list"

export default function Home() {
  const [is3D, setIs3D] = useState(true)
  const [points, setPoints] = useState<{ id: string; x: number; y: number; z: number; name: string }[]>([])
  const [selectedPoint1, setSelectedPoint1] = useState<string | null>(null)
  const [selectedPoint2, setSelectedPoint2] = useState<string | null>(null)

  const selectedVector = useMemo(() => {
    if (!selectedPoint1 || !selectedPoint2) return null
    const p1 = points.find((p) => p.id === selectedPoint1)
    const p2 = points.find((p) => p.id === selectedPoint2)
    if (!p1 || !p2) return null

    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    const dz = is3D ? p2.z - p1.z : 0

    return {
      from: p1,
      to: p2,
      dx,
      dy,
      dz,
      magnitude: Math.sqrt(dx * dx + dy * dy + dz * dz),
    }
  }, [points, selectedPoint1, selectedPoint2, is3D])

  const handleAddPoint = (point: { x: number; y: number; z: number; name: string }) => {
    const newPoint = {
      id: `point-${Date.now()}-${Math.random()}`,
      ...point,
    }
    setPoints([...points, newPoint])
  }

  const handleDeletePoint = (id: string) => {
    setPoints(points.filter((p) => p.id !== id))
    if (selectedPoint1 === id) setSelectedPoint1(null)
    if (selectedPoint2 === id) setSelectedPoint2(null)
  }

  return (
    <div className="w-full h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Vektorová Kalkulačka</h1>
        <button
          onClick={() => setIs3D(!is3D)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          {is3D ? "3D" : "2D"} režim
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area (Left 2/3) */}
        <div className="flex-1 border-r border-border p-4 bg-muted/30">
          <Canvas3D points={points} is3D={is3D} selectedPoint1={selectedPoint1} selectedPoint2={selectedPoint2} />
        </div>

        {/* Sidebar (Right 1/3) */}
        <div className="w-1/3 bg-card border-l border-border overflow-y-auto flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {/* Point Input */}
            <div className="border-b border-border p-4">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4">Pridať bod</h2>
              <PointInput is3D={is3D} onAddPoint={handleAddPoint} />
            </div>

            {/* Points List */}
            <div className="border-b border-border p-4">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">Body: ({points.length})</h2>
              <PointList
                points={points}
                selectedPoint1={selectedPoint1}
                selectedPoint2={selectedPoint2}
                onSelectPoint1={setSelectedPoint1}
                onSelectPoint2={setSelectedPoint2}
                onDeletePoint={handleDeletePoint}
              />
            </div>
          </div>

          {/* Vector Stats */}
          {selectedVector && (
            <div className="border-t border-border p-4 bg-muted/50">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3">Štatistiky Vektora</h2>
              <VectorStats vector={selectedVector} is3D={is3D} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
