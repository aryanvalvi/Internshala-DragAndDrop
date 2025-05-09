import {createContext, useState} from "react"

export const WebsiteContext = createContext()

export const WebsiteProvider = ({children}) => {
  const [elements, setElements] = useState([])
  const [selectedElement, setSelectedElement] = useState(null)

  const addElement = type => {
    const id = `${type}-${Date.now()}`
    const newElement = {
      id,
      type,
      position: {x: 100, y: 100},
      properties:
        type === "text"
          ? {content: "New Text", fontSize: 16, color: "#000000"}
          : type === "image"
          ? {src: "https://via.placeholder.com/150", width: 150}
          : {label: "Click Me", bgColor: "#3b82f6", textColor: "#ffffff"},
    }
    setElements([...elements, newElement])
  }

  const updateElement = (id, properties) => {
    setElements(elements.map(el => (el.id === id ? {...el, properties} : el)))
  }

  const moveElement = (id, x, y) => {
    setElements(
      elements.map(el => (el.id === id ? {...el, position: {x, y}} : el))
    )
  }

  return (
    <WebsiteContext.Provider
      value={{
        elements,
        addElement,
        updateElement,
        moveElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  )
}
