import React, { useState, useEffect, useRef } from 'react'

/**
 * TransparentImage dynamically removes solid/dark backgrounds (like black) from logos
 * and converts them into true alpha channel transparency with smooth anti-aliased glowing edges.
 */
export default function TransparentImage({
  src,
  alt = '',
  className = '',
  threshold = 12,
  ...props
}) {
  const [processedSrc, setProcessedSrc] = useState(null)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true
    if (!src) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = src

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          if (isMounted.current) setProcessedSrc(src)
          return
        }

        canvas.width = img.naturalWidth || img.width
        canvas.height = img.naturalHeight || img.height

        ctx.drawImage(img, 0, 0)
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const maxVal = Math.max(r, g, b)

          if (maxVal < threshold) {
            // Pure background noise -> fully transparent
            data[i + 3] = 0
          } else {
            // Recover hue saturation and create transparent alpha glow
            const alpha = Math.min(255, Math.pow(maxVal / 255, 0.75) * 255)
            const factor = 255 / Math.max(1, maxVal)

            data[i] = Math.min(255, Math.round(r * factor))
            data[i + 1] = Math.min(255, Math.round(g * factor))
            data[i + 2] = Math.min(255, Math.round(b * factor))
            data[i + 3] = Math.round(alpha)
          }
        }

        ctx.putImageData(imgData, 0, 0)
        const dataUrl = canvas.toDataURL('image/png')
        if (isMounted.current) {
          setProcessedSrc(dataUrl)
        }
      } catch (err) {
        console.error('Error removing background from image:', err)
        if (isMounted.current) {
          setProcessedSrc(src)
        }
      }
    }

    img.onerror = () => {
      if (isMounted.current) setProcessedSrc(src)
    }

    return () => {
      isMounted.current = false
    }
  }, [src, threshold])

  return (
    <img
      src={processedSrc || src}
      alt={alt}
      className={className}
      {...props}
    />
  )
}
