import "./App.css"
import Filters from "./components/Filters/Filters"
import LaunchHolder from "./components/LaunchHolder/LaunchHolder"
import { Route } from "react-router-dom"
import SSRComponent from "./components/SSRComponent/SSRComponent"
import React from "react"

function App() {
  const [showCover, setShowCover] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => {
      setShowCover(false)
    }, 2000)
  }, [])

  return (
    <>
      {showCover && (
        <div>
          <SSRComponent />
        </div>
      )}
      {showCover || (
        <div className="App">
          <p className="page-heading">SpaceX Launch Programs</p>
          <div className="app-holder">
            <section className="m-b-1">
              <Route path="/" component={Filters} />
            </section>
            <section>
              <Route path="/" component={LaunchHolder} />
            </section>
          </div>
          <div className="credits">
            <p className="inner-heading p-p-5 m-b-p-25 display-inline-bock ">
              Developed by:{" "}
            </p>{" "}
            <span className="primary-color">Deepak Kumar (+919045902445)</span>
          </div>
        </div>
      )}
    </>
  )
}

export default App
