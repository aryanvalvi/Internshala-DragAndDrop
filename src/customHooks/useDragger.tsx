import {useEffect} from "react"

const useDragger = (id: string) => {
  useEffect(() => {
    const element = document.getElementById(id)
    if (!element) return

    let isDragging = false
    let currentX = parseFloat(element.style.left || "0")
    let currentY = parseFloat(element.style.top || "0")
    let initialX: number
    let initialY: number

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      initialX = e.clientX - currentX
      initialY = e.clientY - currentY
      isDragging = true
    }

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()
        currentX = e.clientX - initialX
        currentY = e.clientY - initialY

        const canvas = element.closest(".canvas") as HTMLElement
        if (canvas) {
          const rect = canvas.getBoundingClientRect()
          currentX = Math.max(
            0,
            Math.min(currentX, rect.width - element.offsetWidth)
          )
          currentY = Math.max(
            0,
            Math.min(currentY, rect.height - element.offsetHeight)
          )
        }

        element.style.left = `${currentX}px`
        element.style.top = `${currentY}px`
      }
    }

    const onMouseUp = () => {
      isDragging = false
    }

    const onMouseLeave = () => {
      isDragging = false
    }

    element.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
    element.addEventListener("mouseleave", onMouseLeave)

    return () => {
      element.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
      element.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [id])
}

export default useDragger
