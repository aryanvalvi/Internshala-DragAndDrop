import React from "react"

import "./index.css"
// import Sidebar from "./components/Sidebar"
import Canvas from "./components/Canvas"

const App: React.FC = () => {
  return (
    <>
      <div className="app-container">
        {/* <Sidebar /> */}
        <Canvas />
      </div>
    </>
  )
}

export default App
