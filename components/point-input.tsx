"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PointInputProps {
  is3D: boolean
  onAddPoint: (point: { x: number; y: number; z: number; name: string }) => void
}

export default function PointInput({ is3D, onAddPoint }: PointInputProps) {
  const [name, setName] = useState("")
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [z, setZ] = useState("")

  const handleAddPoint = () => {
    if (!name || x === "" || y === "") return

    onAddPoint({
      name: name || "Bod",
      x: Number.parseFloat(x),
      y: Number.parseFloat(y),
      z: is3D && z !== "" ? Number.parseFloat(z) : 0,
    })

    setName("")
    setX("")
    setY("")
    setZ("")
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-muted-foreground">Názov</label>
        <Input
          type="text"
          placeholder="Bod A"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
        />
      </div>

      <div className={`grid ${is3D ? "grid-cols-3" : "grid-cols-2"} gap-2`}>
        <div>
          <label className="text-xs text-muted-foreground">X</label>
          <Input
            type="number"
            placeholder="0"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="mt-1"
            step="0.1"
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Y</label>
          <Input
            type="number"
            placeholder="0"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="mt-1"
            step="0.1"
          />
        </div>
        {is3D && (
          <div>
            <label className="text-xs text-muted-foreground">Z</label>
            <Input
              type="number"
              placeholder="0"
              value={z}
              onChange={(e) => setZ(e.target.value)}
              className="mt-1"
              step="0.1"
            />
          </div>
        )}
      </div>

      <Button onClick={handleAddPoint} className="w-full mt-2">
        Pridať bod
      </Button>
    </div>
  )
}
