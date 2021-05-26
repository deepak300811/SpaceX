import "../LaunchCard/LaunchCard.css"
const LaunchCard = ({
  mission_name,
  launch_year,
  launch_success,
  land_success,
  flight_number,
  mission_id,
  imgLink
}) => {
  return (
    <div className="white-background holder m-b-1">
      <div className="p-p-5 whole-card">
        <section className="upper-img-section m-b-1">
          <img src={imgLink} alt="Img not available" />
        </section>
        <section className="content-section ">
          <p className="sub-heading primary-color m-b-1">
            {mission_name} #{flight_number}
          </p>
          <div className="m-b-p-5">
            {mission_id.length > 0 ? (
              <>
                <p className="inner-heading m-b-p-25">Mission Ids: </p>
                <ul className="mission-id-list  primary-color">
                  {mission_id.map(item => {
                    return <li key={item}>{item}</li>
                  })}
                </ul>
              </>
            ) : (
              <>
                <p className="inner-heading m-b-p-25 display-inline-bock">
                  Mission Ids:
                </p>{" "}
                <i>Not available</i>
              </>
            )}
          </div>
          <div className="m-b-p-5">
            <p className="inner-heading  display-inline-bock ">Launch Year:</p>{" "}
            <span className="primary-color">{launch_year}</span>
          </div>
          <div className="m-b-p-5">
            <p className="inner-heading display-inline-bock ">
              Successful Launch:
            </p>{" "}
            <span className="primary-color">
              {launch_success === null ? (
                <> Not available </>
              ) : (
                <>{launch_success ? <> true </> : <> false </>} </>
              )}
            </span>
          </div>
          <div>
            <p className="inner-heading display-inline-bock">
              Successful Landing:{" "}
            </p>{" "}
            {land_success === null ? (
              <>
                {" "}
                <span>
                  {" "}
                  <i>Not available</i>{" "}
                </span>{" "}
              </>
            ) : (
              <span className="primary-color">
                <>{land_success ? <> true </> : <> false </>} </>
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default LaunchCard
