// src/modules/heatmap/application/services/heatmap-image-generator.service.ts

import { Injectable } from '@nestjs/common'
import { createCanvas } from 'canvas'

@Injectable()
export class HeatmapImageGeneratorService {
  generateHeatmapImage(
    data: { xPct: number; yPct: number; intensity: number }[],
    width: number = 800,
    height: number = 600,
  ): Buffer {
    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')

    // Fondo blanco
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    if (!data || data.length === 0) {
      ctx.fillStyle = '#999999'
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('No hay datos para mostrar', width / 2, height / 2)
      return canvas.toBuffer('image/png')
    }


    const sorted = [...data.map(d => d.intensity)].sort((a, b) => a - b)
const p90Index = Math.floor(sorted.length * 0.9)
const maxIntensity = sorted[p90Index] || Math.max(...data.map(d => d.intensity))

    if (maxIntensity === 0) {
      ctx.fillStyle = '#999999'
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Sin eventos registrados', width / 2, height / 2)
      return canvas.toBuffer('image/png')
    }

    // Dibujar puntos de calor
    for (const point of data) {
      const x = (point.xPct / 100) * width
      const y = (point.yPct / 100) * height
      const intensity = point.intensity / maxIntensity

      const r = Math.min(255, Math.round(intensity * 255))
      const g = Math.min(255, Math.round((1 - Math.abs(intensity - 0.5) * 2) * 255))
      const b = Math.min(255, Math.round((1 - intensity) * 255))

      const alpha = 0.3 + intensity * 0.5
      const radius = Math.min(width, height) * 0.03 * (1 + intensity)

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`)
      gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`)
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    return canvas.toBuffer('image/png')
  }
}