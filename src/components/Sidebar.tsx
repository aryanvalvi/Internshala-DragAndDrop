import React from "react"

interface Element {
  id: string
  type: "text" | "image" | "button"
  content: string
  position: {x: number; y: number}
}

interface Props {
  elements: Element[]
  selectedElementId: string | null
  onUpdate: (id: string, updates: Partial<Element>) => void
  onSelect: (id: string) => void
}

const Sidebar: React.FC<Props> = ({
  elements,
  selectedElementId,
  onUpdate,
  onSelect,
}) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    e.dataTransfer.setData("elementType", type)
  }

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    onUpdate(id, {content: e.target.value})
  }

  return (
    <div className="sidebar">
      <h2 className="">Elements</h2>
      <div
        className="draggable-item"
        draggable
        onDragStart={e => handleDragStart(e, "text")}
      >
        Text
      </div>
      <div
        className="draggable-item"
        draggable
        onDragStart={e => handleDragStart(e, "image")}
      >
        Image
      </div>
      <div
        className="draggable-item"
        draggable
        onDragStart={e => handleDragStart(e, "button")}
      >
        Button
      </div>
      <div>
        <h3>Edit Elements</h3>
        {elements.length === 0 ? (
          <p>No elements added yet.</p>
        ) : (
          elements.map(el => (
            <div
              key={el.id}
              className={`p-2 mb-2 border rounded cursor-pointer ${
                el.id === selectedElementId ? "bg-blue-100" : ""
              }`}
              onClick={() => onSelect(el.id)}
            >
              <p>Type: {el.type}</p>
              <input
                type="text"
                value={el.content}
                onChange={e => handleContentChange(e, el.id)}
                className="edit-input"
                placeholder={`Edit ${el.type} content`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Sidebar
