import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from 'react-icons/fa';
import { ThemeConsumer } from '../contexts/theme';
import { Link } from 'react-router-dom';

function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className='instructions-container'>
          <h1 className='center-text header-lg'>Instructions</h1>
          <ol className='container-sm grid center-text battle-instructions'>
            <li>
              <h3 className='header-sm'>Enter two Github users</h3>
              <FaUserFriends
                className={`bg-${theme}`}
                color='rgb(255,191,116)'
                size={140}
              />
            </li>
            <li>
              <h3 className='header-sm'>Battle</h3>
              <FaFighterJet
                className={`bg-${theme}`}
                color='#727272'
                size={140}
              />
            </li>
            <li>
              <h3 className='header-sm'>See the winners</h3>
              <FaTrophy
                className={`bg-${theme}`}
                color='rgb(255,215,0)'
                size={140}
              />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  );
}

function Player({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className='column player'>
          <h3 className='player-label'>{label}</h3>
          <div className={`row bg-${theme}`}>
            <div className='player-info'>
              <img
                className='avatar-small'
                src={`https://github.com/${username}.png?size=200`}
                alt={`Avatar for ${username}`}
              />
              <a href={`https://github.com/${username}`} className='link'>
                {username}
              </a>
            </div>
            <button className='btn-clear flex-center' onClick={onReset}>
              <FaTimesCircle color='rgb(194, 57, 42)' size={26} />
            </button>
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
}

Player.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

class PlayerInput extends Component {
  state = {
    username: ''
  };

  handleChange = ({ target: { value } }) => {
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
      <ThemeConsumer>
        {({ theme }) => (
          <form className='column player' onSubmit={this.handleSubmit}>
            <label className='player-label' htmlFor='username'>
              {this.props.label}
            </label>
            <div className='row player-inputs'>
              <input
                className={`input-${theme}`}
                type='text'
                id='username'
                placeholder='github username'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
                type='submit'
                disabled={!this.state.username}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

class Battle extends Component {
  state = {
    playerOne: null,
    playerTwo: null
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
    const { playerOne, playerTwo } = this.state;

    return (
      <Fragment>
        <Instructions />
        <div className='players-container'>
          <h1 className='center-text header-lg'>Players</h1>
          <div className='row space-around'>
            {!playerOne ? (
              <PlayerInput
                label='Player One'
                onSubmit={player => this.handleSubmit('playerOne', player)}
              />
            ) : (
              <Player
                username={playerOne}
                label='Player One'
                onReset={() => {
                  this.handleReset('playerOne');
                }}
              />
            )}

            {!playerTwo ? (
              <PlayerInput
                label='Player Two'
                onSubmit={player => this.handleSubmit('playerTwo', player)}
              />
            ) : (
              <Player
                username={playerTwo}
                label='Player Two'
                onReset={() => {
                  this.handleReset('playerTwo');
                }}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <Link
              className={`btn btn-space btn-dark`}
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
              }}
            >
              Battle
            </Link>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Battle;
