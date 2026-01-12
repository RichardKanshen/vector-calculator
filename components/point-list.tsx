"use client"

interface Point {
  id: string
  x: number
  y: number
  z: number
  name: string
}

interface PointListProps {
  points: Point[]
  selectedPoint1: string | null
  selectedPoint2: string | null
  onSelectPoint1: (id: string | null) => void
  onSelectPoint2: (id: string | null) => void
  onDeletePoint: (id: string) => void
}

export default function PointList({
  points,
  selectedPoint1,
  selectedPoint2,
  onSelectPoint1,
  onSelectPoint2,
  onDeletePoint,
}: PointListProps) {
  return (
    <div className="space-y-2">
      {points.length === 0 ? (
        <p className="text-xs text-muted-foreground">Zatiaľ nie sú pridané body</p>
      ) : (
        points.map((point) => (
          <div key={point.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{point.name}</p>
              <p className="text-xs text-muted-foreground">
                ({point.x.toFixed(2)}, {point.y.toFixed(2)}, {point.z.toFixed(2)})
              </p>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onSelectPoint1(selectedPoint1 === point.id ? null : point.id)}
                className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                  selectedPoint1 === point.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-border text-foreground hover:bg-border/80"
                }`}
              >
                B1
              </button>
              <button
                onClick={() => onSelectPoint2(selectedPoint2 === point.id ? null : point.id)}
                className={`px-2 py-1 text-xs rounded font-medium transition-colors ${
                  selectedPoint2 === point.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-border text-foreground hover:bg-border/80"
                }`}
              >
                B2
              </button>
              <button
                onClick={() => onDeletePoint(point.id)}
                className="px-2 py-1 text-xs rounded font-medium bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
