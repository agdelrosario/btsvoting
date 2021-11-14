import Grid from '@material-ui/core/Grid';

const MultiStatisticsCard = (props) => {
  return (
    <div className="card multiple">
      <div className="card-nav">
        <h2>{ props.title }{props.allowCollection == false && (<span> *</span>)}</h2>
        <div className="rightNavigation"></div>
      </div>
      <Grid container>
        {
          (props.isEnableMultiple == null || props.isEnableMultiple == false) && (
            <Grid item className="points">
              <span className="points-value">
                { props.pointsValue }
              </span>
              <span className="points-type">{ props.pointsType }</span>
            </Grid>
          )
        }
        {
          props.isEnableMultiple == true && (
            <Grid container className="points-collection">
              {
                props.pointsArray.map((point, index) => {
                  return (
                    <Grid item xs className="points" key={`points-${index}`}>
                      <span className="points-value">
                        { point.pointsValue }
                      </span>
                      <span className="points-type">{ point.pointsType }</span>
                    </Grid>
                  )
                })
              }
            </Grid>
          )
        }
      </Grid>
    </div>
  )
}

export default MultiStatisticsCard;
