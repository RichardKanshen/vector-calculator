"use client"

interface VectorStatsProps {
  vector: {
    from: { name: string; x: number; y: number; z: number }
    to: { name: string; x: number; y: number; z: number }
    dx: number
    dy: number
    dz: number
    magnitude: number
  }
  is3D: boolean
}

function getSmallerAngle(angle: number) {
  let absolute = Math.abs(angle);
  return absolute > 90 ? 180 - absolute : absolute
}

export default function VectorStats({ vector, is3D }: VectorStatsProps) {
  const normalize = () => {
    const mag = vector.magnitude
    if (mag === 0) return { x: 0, y: 0, z: 0 }
    return {
      x: vector.dx / mag,
      y: vector.dy / mag,
      z: vector.dz / mag,
    }
  }

  const normalized = normalize()

  // Angle calculations
  const angleXY = Math.atan2(vector.dy, vector.dx) * (180 / Math.PI)
  const angleXZ = is3D ? Math.atan2(vector.dz, vector.dx) * (180 / Math.PI) : 0

  const stats = [
    { label: "Veľkosť vektora", value: vector.magnitude.toFixed(4), cols: 6},
    { label: "Δx", value: vector.dx.toFixed(4), cols: is3D ? 2 : 3 },
    { label: "Δy", value: vector.dy.toFixed(4), cols: is3D ? 2 : 3 },
    ...(is3D ? [{ label: "Δz", value: vector.dz.toFixed(4), cols: is3D ? 2 : 3 }] : []),
    { label: "Uhol (XY)", value: `${getSmallerAngle(angleXY).toFixed(2)}°`, cols: is3D ? 3 : 6 },
    ...(is3D ? [{ label: "Uhol (XZ)", value: `${getSmallerAngle(angleXZ).toFixed(2)}°`, cols: is3D ? 3 : 6 }] : []),
    { label: "Norm X", value: normalized.x.toFixed(4), cols: is3D ? 2 : 3 },
    { label: "Norm Y", value: normalized.y.toFixed(4), cols: is3D ? 2 : 3 },
    ...(is3D ? [{ label: "Norm Z", value: normalized.z.toFixed(4), cols: is3D ? 2 : 3 }] : []),
  ]

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        {vector.from.name} → {vector.to.name}
      </p>
      <div className="grid grid-cols-6 gap-2">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-muted/50 rounded p-2" style={{gridColumn: `span ${stat.cols} / span ${stat.cols}`}}>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-sm font-mono font-semibold text-accent">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
