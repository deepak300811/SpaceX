import "../SSRComponent/SSRComponent.css"
import rocketLogo from "../../assets/rocket_1.png"
import React from "react"
const SSRComponent = () => {
  return (
    <div className="ssr-base">
      <div className="inner-base">
        <div className="rocket-icon">
          <img src={rocketLogo} alt="" />
        </div>
        <div className="loading-icon">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SSRComponent
