const StatisticsCard = (props) => {
  return (
    <div className="card">
      <div className="card-nav">
        <h2>{ props.title }</h2>
        <div className="rightNavigation" />
      </div>
      <div className="points">
        <span className="points-value">
          { Number(props.pointsValue).toLocaleString() }
        </span>
        <span className="points-type">{ props.pointsType }</span>
      </div>
    </div>
  )
}

export default StatisticsCard;
