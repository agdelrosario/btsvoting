const MultiStatisticsCard = (props) => {
  return (
    <div className="card multiple">
      <div className="card-nav">
        <h2>{ props.title }</h2>
        <div className="rightNavigation" />
      </div>
      {
        (props.isEnableMultiple == null || props.isEnableMultiple == false) && (
          <div className="points">
            <span className="points-value">
              { props.pointsValue }
            </span>
            <span className="points-type">{ props.pointsType }</span>
          </div>
        )
      }
      {
        props.isEnableMultiple == true && (
          <div className="points-collection">
            {
              props.pointsArray.map((point, index) => {
                return (
                  <div className="points" key={`points-${index}`}>
                    <span className="points-value">
                      { point.pointsValue }
                    </span>
                    <span className="points-type">{ point.pointsType }</span>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default MultiStatisticsCard;
