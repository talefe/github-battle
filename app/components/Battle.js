import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import ThemeContext from '../contexts/theme';
import { Link } from 'react-router-dom';

function Instructions() {
  const theme = useContext(ThemeContext);

  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>Instructions</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two Github users</h3>
          <FaUserFriends className={`bg-${theme}`} color='rgb(255,191,116)' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>Battle</h3>
          <FaFighterJet className={`bg-${theme}`} color='#727272' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winners</h3>
          <FaTrophy className={`bg-${theme}`} color='rgb(255,215,0)' size={140} />
        </li>
      </ol>
    </div>
  );
}

function Player({ username, onReset, label }) {
  const theme = useContext(ThemeContext);

  return (
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
  );
}

Player.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

function PlayerInput({ label, onSubmit }) {
  const theme = useContext(ThemeContext);

  const [username, setUsername] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(username);
  };

  return (
    <form className='column player' onSubmit={handleSubmit}>
      <label className='player-label' htmlFor='username'>
        {label}
      </label>
      <div className='row player-inputs'>
        <input
          className={`input-${theme}`}
          type='text'
          id='username'
          placeholder='github username'
          autoComplete='off'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button
          className={`btn ${theme === 'dark' ? 'btn-light' : 'btn-dark'}`}
          type='submit'
          disabled={!username}>
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function Battle() {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);

  return (
    <Fragment>
      <Instructions />
      <div className='players-container'>
        <h1 className='center-text header-lg'>Players</h1>
        <div className='row space-around'>
          {!playerOne ? (
            <PlayerInput label='Player One' onSubmit={player => setPlayerOne(player)} />
          ) : (
            <Player
              username={playerOne}
              label='Player One'
              onReset={() => {
                setPlayerOne(null);
              }}
            />
          )}

          {!playerTwo ? (
            <PlayerInput label='Player Two' onSubmit={player => setPlayerTwo(player)} />
          ) : (
            <Player
              username={playerTwo}
              label='Player Two'
              onReset={() => {
                setPlayerTwo(null);
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
            }}>
            Battle
          </Link>
        )}
      </div>
    </Fragment>
  );
}

export default Battle;
