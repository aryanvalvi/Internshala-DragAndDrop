import useDragger from "../customHooks/useDragger"

const PinkBox = () => {
  useDragger("pink-box")
  return <div id="pink-box" className="box"></div>
}

export default PinkBox
