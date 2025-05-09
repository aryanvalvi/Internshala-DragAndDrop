import {useContext, useState, useEffect} from "react"
import {WebsiteContext} from "../context/WebsiteContext"

function ElementForm() {
  const {selectedElement, updateElement} = useContext(WebsiteContext)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (selectedElement) {
      setFormData(selectedElement.properties)
    }
  }, [selectedElement])

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (selectedElement) {
      updateElement(selectedElement.id, formData)
    }
  }

  if (!selectedElement) {
    return <p className="form-container">Select an element to edit</p>
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {selectedElement.type === "text" && (
        <>
          <div className="form-group">
            <label>Text Content</label>
            <input
              type="text"
              name="content"
              value={formData.content || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Font Size</label>
            <input
              type="number"
              name="fontSize"
              value={formData.fontSize || 16}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Color</label>
            <input
              type="color"
              name="color"
              value={formData.color || "#000000"}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {selectedElement.type === "image" && (
        <>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="src"
              value={formData.src || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Width</label>
            <input
              type="number"
              name="width"
              value={formData.width || 150}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      {selectedElement.type === "button" && (
        <>
          <div className="form-group">
            <label>Button Label</label>
            <input
              type="text"
              name="label"
              value={formData.label || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Background Color</label>
            <input
              type="color"
              name="bgColor"
              value={formData.bgColor || "#3b82f6"}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Text Color</label>
            <input
              type="color"
              name="textColor"
              value={formData.textColor || "#ffffff"}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <button type="submit" className="submit-button">
        Update Element
      </button>
    </form>
  )
}

export default ElementForm
