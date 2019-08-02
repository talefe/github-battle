var React = require('react');
var PropTypes = require('prop-types');
var {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} = require('react-icons/fa');
var Results = require('./Results');

Instructions = () => {
  return (
    <div className="instructions-container">
      <h1 className="center-text-header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            className="bg-light"
            color="rgb(255,191,116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-light" color="#727272" size={140} />
        </li>{' '}
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy className="bg-light" color="rgb(255,215,0)" size={140} />
        </li>{' '}
      </ol>
    </div>
  );
};

Player = ({ username, onReset, label }) => {
  return (
    <div className="column player">
      <h3 className="player-label">{label}</h3>
      <div className="row bg-light">
        <div className="player-info">
          <img
            className="avatar-small"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
};

class PlayerInput extends React.Component {
  state = {
    username: ''
  };

  handleChange = event => {
    var value = event.target.value;
    this.setState(() => ({
      username: value
    }));
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  };
  render() {
    return (
      <form className="column player" onSubmit={this.handleSubmit}>
        <label className="player-label" htmlFor="username">
          {this.props.label}
        </label>
        <div className="row player-inputs">
          <input
            className="input-light"
            type="text"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-dark"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null,
    battle: false
  };

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    });
  };
  handleReset = id => {
    this.setState({
      [id]: null
    });
  };
  render() {
    var { playerOne, playerTwo, battle } = this.state;

    if (battle) {
      return (
        <div>
          <Results
            playerOne={playerOne}
            playerTwo={playerTwo}
            onReset={() =>
              this.setState({
                playerOne: null,
                playerTwo: null,
                battle: false
              })
            }
          />
        </div>
      );
    }
    return (
      <React.Fragment>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {!playerOne ? (
              <PlayerInput
                label="Player One"
                onSubmit={player => {
                  console.log(player);
                  return this.handleSubmit('playerOne', player);
                }}
              />
            ) : (
              <Player
                username={playerOne}
                label="Player One"
                onReset={() => {
                  this.handleReset('playerOne');
                }}
              />
            )}

            {!playerTwo ? (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <Player
                username={playerTwo}
                label="Player Two"
                onReset={() => {
                  this.handleReset('playerTwo');
                }}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <button
              className="btn btn-dark btn-space"
              onClick={() => {
                this.setState({ battle: true });
              }}
            >
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

module.exports = Battle;
