import React, { useEffect, useState } from "react"
import LaunchCard from "../LaunchCard/LaunchCard"
import { useLocation } from "react-router-dom"
import qs from "query-string"
import axios from "axios"
const LaunchHolder = () => {
  const [launchList, setLaunchList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setLaunchList([])
    const parsed = qs.parse(location.search)
    let url = ""
    if (
      parsed.launch_year ||
      parsed.land_success === true ||
      parsed.land_success === false ||
      parsed.launch_success === true ||
      parsed.launch_success === false
    ) {
      url = `https://api.spaceXdata.com/v3/launches?limit=100&${qs.stringify(
        parsed
      )}`
    } else {
      url = `https://api.spaceXdata.com/v3/launches?limit=100`
    }
    ;(async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(url)
        if (res.data.length > 0) {
          makeListForTransfer(res.data)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [location])

  function makeListForTransfer(gotList) {
    const modified = gotList.map(item => {
      let obj = {}
      if (item.rocket.first_stage.cores.length > 0) {
        obj.land_success = item.rocket.first_stage.cores[0].land_success
      }
      obj.mission_name = item.mission_name
      obj.launch_year = item.launch_year
      obj.launch_success = item.launch_success
      obj.flight_number = item.flight_number
      obj.mission_id = item.mission_id
      obj.imgLink = item.links.mission_patch
      return obj
    })
    setLaunchList(prev => {
      prev = modified
      return prev
    })
  }

  return (
    <div className="launcher-holder">
      {launchList.length === 0 && isLoading === true && (
        <div className="loader">Loading...</div>
      )}
      {launchList.length === 0 && isLoading === false && (
        <div className="fetch-error">Data Not Available.</div>
      )}

      {/* <LaunchCard /> */}
      {launchList.length > 0 &&
        launchList.map(element => {
          return (
            <LaunchCard
              key={element.mission_name}
              mission_name={element.mission_name}
              launch_year={element.launch_year}
              launch_success={element.launch_success}
              land_success={element.land_success}
              flight_number={element.flight_number}
              mission_id={element.mission_id}
              imgLink={element.imgLink}
            />
          )
        })}
    </div>
  )
}

export default LaunchHolder
