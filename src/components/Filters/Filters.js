import "../Filters/Filters.css"
import { filterList } from "../../data/FilterList"
import { useState, useEffect } from "react"
import qs from "query-string"
import { useHistory, useLocation } from "react-router-dom"

const Filters = () => {
  const location = useLocation()
  const history = useHistory()
  const [list, setList] = useState(filterList)
  const [isLaunchSuccess, setIsLaunchSuccess] = useState(null)
  const [isLandSuccess, setIsLandSuccess] = useState(null)
  const handleSelection = year => {
    setList(
      list.map(element => {
        if (+element.year === year) {
          element.isSelected = true
        } else {
          element.isSelected = false
        }
        return element
      })
    )
  }

  const clearFilters = () => {
    history.push({
      pathname: "/"
    })
  }

  useEffect(() => {
    if (location.search === "") {
      setList(prev =>
        prev.map(item => {
          item.isSelected = false

          return item
        })
      )
      setIsLandSuccess(null)
      setIsLaunchSuccess(null)
    }
  }, [location])

  useEffect(() => {
    const parsed = qs.parse(location.search)
    setList(prev =>
      prev.map(item => {
        if (item.year === +parsed.launch_year) {
          item.isSelected = true
        }
        return item
      })
    )
    setIsLandSuccess(prev => {
      prev = parsed.land_success
      if (prev === "true") {
        prev = true
      } else if (prev === "false") {
        prev = false
      }

      return prev
    })
    setIsLaunchSuccess(prev => {
      prev = parsed.launch_success
      if (prev === "true") {
        prev = true
      } else if (prev === "false") {
        prev = false
      }
      return prev
    })
  }, [])

  useEffect(() => {
    if (list.length > 0) {
      let selectionObj = {}
      selectionObj.launch_year = list.find(item => item.isSelected === true)
      if (selectionObj.launch_year) {
        selectionObj.launch_year = selectionObj.launch_year.year
      }
      selectionObj.land_success = isLandSuccess
      selectionObj.launch_success = isLaunchSuccess

      if (selectionObj.land_success === null) {
        delete selectionObj.land_success
      }
      if (selectionObj.launch_success === null) {
        delete selectionObj.launch_success
      }

      if (
        selectionObj.launch_year ||
        selectionObj.land_success === true ||
        selectionObj.land_success === false ||
        selectionObj.launch_success === true ||
        selectionObj.launch_success === false
      ) {
        history.push({
          pathname: "/",
          search: qs.stringify(selectionObj)
        })
      }
    }
  }, [list, isLandSuccess, isLaunchSuccess, history])

  return (
    <div className="white-background holder">
      <p className="sub-heading m-b-p-5">Filters</p>{" "}
      <div className="p-p-5">
        <section className="m-b-1">
          <header className="sub-heading-border m-b-p-5">
            <p>Launch Year</p>
          </header>
          <div className="button-holder ">
            {list.map(element => (
              <button
                className={
                  element.isSelected ? "btn-primary dark-shade" : "btn-primary"
                }
                key={element.year}
                value={element.year}
                onClick={() => handleSelection(element.year)}
              >
                {element.year}
              </button>
            ))}
          </div>
        </section>
        <section className="m-b-1">
          <header className="sub-heading-border m-b-p-5">
            <p>Successful Launch</p>
          </header>
          <div className="button-holder">
            <button
              className={
                isLaunchSuccess === true
                  ? "btn-primary dark-shade"
                  : "btn-primary"
              }
              value={true}
              onClick={() => setIsLaunchSuccess(true)}
            >
              True
            </button>
            <button
              className={
                isLaunchSuccess === false
                  ? "btn-primary dark-shade"
                  : "btn-primary"
              }
              value={false}
              onClick={() => setIsLaunchSuccess(false)}
            >
              False
            </button>
          </div>
        </section>
        <section className="m-b-1">
          <header className="sub-heading-border m-b-p-5">
            <p>Successful Landing</p>
          </header>
          <div className="button-holder">
            <button
              className={
                isLandSuccess === true
                  ? "btn-primary dark-shade"
                  : "btn-primary"
              }
              value={true}
              onClick={() => setIsLandSuccess(true)}
            >
              True
            </button>
            <button
              className={
                isLandSuccess === false
                  ? "btn-primary dark-shade"
                  : "btn-primary"
              }
              value={false}
              onClick={() => setIsLandSuccess(false)}
            >
              False
            </button>
          </div>
        </section>
      </div>
      <div className="clear-link" onClick={clearFilters}>
        clear filters
      </div>
    </div>
  )
}

export default Filters
