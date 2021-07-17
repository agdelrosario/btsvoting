
import StatisticsCard from './StatisticsCard';
import MultiStatisticsCard from './MultiStatisticsCard';

const MemberDashboard = props => {
  return (
    <div>
      <div className="dashboard">
        <div className="notice">
          <h3>Notice</h3>
          <p>Welcome to the BTS Voting Org Portal! Your profile will be verified by the admin. After successful verification, you will be able to update your profile information and view your team's statistics. Have a great day!</p>
        </div>

        <h1>Team President Namjoon Stats</h1>
        <div className="statistics">
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
        </div>
      </div>
      <hr />
      <div>

      </div>
    </div>
  )
};

export default MemberDashboard;