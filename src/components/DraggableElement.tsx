import React from "react"
import useDragger from "../customHooks/useDragger"

interface Props {
  id: string
  type: "text" | "image" | "button"
  content: string
  position: {x: number; y: number}
  isSelected: boolean
  onSelect: (id: string) => void
}

const DraggableElement: React.FC<Props> = ({
  id,
  type,
  content,
  position,
  isSelected,
  onSelect,
}) => {
  useDragger(id)

  const renderContent = () => {
    switch (type) {
      case "text":
        return <p>{content}</p>
      case "image":
        return <img src={content} alt="Dropped Image" />
      case "button":
        return <button>{content}</button>
      default:
        return null
    }
  }

  return (
    <div
      id={id}
      className={`dropped-element ${isSelected ? "selected" : ""}`}
      style={{left: position.x, top: position.y}}
      onClick={() => onSelect(id)}
    >
      {renderContent()}
    </div>
  )
}

export default DraggableElement
