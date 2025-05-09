import React, {useState} from "react"
import DraggableElement from "./DraggableElement"
import Sidebar from "./Sidebar"

interface Element {
  id: string
  type: "text" | "image" | "button"
  content: string
  position: {x: number; y: number}
}

const Canvas: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([])
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const elementType = e.dataTransfer.getData("elementType") as
      | "text"
      | "image"
      | "button"
    const newId = `element-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`
    const newElement: Element = {
      id: newId,
      type: elementType,
      content:
        elementType === "text"
          ? "Sample Text"
          : elementType === "image"
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSz7r2qEm75HOsz7ETXwJlYJYh3Ck2Dtv_vjh0jU71UA&s&ec=72940543"
          : "Click Me",
      position: {x: e.clientX - 300, y: e.clientY - 100},
    }
    setElements(prev => [...prev, newElement])
  }

  const updateElement = (id: string, updates: Partial<Element>) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? {...el, ...updates} : el))
    )
  }

  const handleSelect = (id: string) => {
    setSelectedElementId(id)
  }

  return (
    <div>
      <Sidebar
        elements={elements}
        selectedElementId={selectedElementId}
        onUpdate={updateElement}
        onSelect={handleSelect}
      />
      <div className="canvas" onDragOver={handleDragOver} onDrop={handleDrop}>
        {elements.map(el => (
          <DraggableElement
            key={el.id}
            id={el.id}
            type={el.type}
            content={el.content}
            position={el.position}
            isSelected={el.id === selectedElementId}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}

export default Canvas
