var React = require('react');
var { battle } = require('../utils/api');
var {
  FaCompass,
  FaBriefcase,
  FaUser,
  FaUserFriends,
  FaCode,
  FaUsers
} = require('react-icons/fa');
var Card = require('./Card');
var PropTypes = require('prop-types');

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <FaCompass color="rgb(144, 115, 255)" size={22} />
          {profile.location}
        </li>
      )}
      {profile.company && (
        <li>
          <FaBriefcase color="#795548" size={22} />
          {profile.company}
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following} following
      </li>
    </ul>
  );
}

class Results extends React.Component {
  state = {
    winner: null,
    loser: null,
    error: null,
    loading: true
  };
  componentDidMount = () => {
    const { playerOne, playerTwo } = this.props;

    battle([playerOne, playerTwo])
      .then(players => {
        this.setState({
          winner: players[0],
          loser: players[1],
          error: null,
          loading: false
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false
        });
      });
  };
  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading) {
      return <h1>Loading</h1>;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }

    return (
      <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={loser.profile.avatar_url}
            href={loser.profile.html_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />
          </Card>
        </div>

        <button className="btn btn-dark btn-space" onClick={this.props.onReset}>
          Reset
        </button>
      </React.Fragment>
    );
  }
}

Results.propTypes = {
  playerOne: PropTypes.object.isRequired,
  playerTwo: PropTypes.object.isRequired,
  onReset: PropTypes.func.isRequired
};

// Before building the UI,
// we should check if our data is how we want it to be

/*
render() {
    return (
        <div>
            Results
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
    )
}
*/
module.exports = Results;
