
import StatisticsCard from './StatisticsCard';
import MultiStatisticsCard from './MultiStatisticsCard';

const MemberDashboard = ({profile}) => {
  console.log("profile", profile)

  return (
    <div>
      <div className="dashboard">
        <div className="notice">
          <h3>Notice</h3>
          <p>Welcome to the BTS Voting Org Portal! Have a great day!</p>
        </div>

        <h1>Team { profile.teamInfo.name } Stats</h1>
        <p>Coming soon</p>
        {/* <div className="statistics">
          <StatisticsCard
            title="Idol Champ"
            pointsValue="2,986,443"
            pointsType="Ruby Chamsims"
          />
          <StatisticsCard
            title="Choeaedol"
            pointsValue="45,062,779"
            pointsType="Ever Hearts"
          />
          <MultiStatisticsCard
            title="Fan n Star"
            isEnableMultiple
            pointsArray={[
              {
                "pointsValue": 2,
                "pointsType": "Black"
              },
              {
                "pointsValue": 3,
                "pointsType": "Gold"
              },
              {
                "pointsValue": 7,
                "pointsType": "Silver"
              },
              {
                "pointsValue": 19,
                "pointsType": "Bronze"
              },
              {
                "pointsValue": 25,
                "pointsType": "Mint"
              },
            ]}
          />
        </div> */}
      </div>
      <div>

      </div>
    </div>
  )
};

export default MemberDashboard;