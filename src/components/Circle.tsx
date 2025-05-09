import React, {useEffect, useRef, useState} from "react"
import useDragger from "../customHooks/useDragger"

const Circle = () => {
  const selectRef = useRef<HTMLDivElement>(null)
  const selectRef2 = useRef<HTMLDivElement>(null)
  const [select, setSelect] = useState(false)
  console.log(select)
  useEffect(() => {
    const circle = selectRef.current
    const onClick = () => {
      console.log("clicked")
      setSelect(true)
      // setSelect(false)
    }
    circle?.addEventListener("mousedown", onClick)

    const cleanup = () => {
      circle?.removeEventListener("mousedown", onClick)
    }
    return cleanup
  }, [])

  useDragger("circle")
  return (
    <>
      {select && <div ref={selectRef2} id="circle" className="circle"></div>}
      <div ref={selectRef} id="circle" className="circle"></div>
    </>
  )
}

export default Circle
