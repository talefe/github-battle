import React, { Fragment, useState, useReducer, useEffect } from 'react';
import { battle } from '../utils/api';
import { FaCompass, FaBriefcase, FaUser, FaUserFriends, FaUsers } from 'react-icons/fa';
import Card from './Card';
import PropTypes from 'prop-types';
import Loading from './Loading';
import Tooltip from './Tooltip';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 115, 115)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 115, 255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    company: PropTypes.string,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired
  })
};

function resultsReducer(state, action) {
  if (action.type === 'success') {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message
    };
  } else {
    throw new Error('That action type is not suported');
  }
}

export default function Results({ location }) {
  const { playerOne, playerTwo } = queryString.parse(location.search);
  const [state, dispatch] = useReducer(resultsReducer, {
    winner: null,
    loser: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    async function getResults() {
      try {
        let [winner, loser] = await battle([playerOne, playerTwo]);
        dispatch({ type: 'success', winner, loser });
      } catch (error) {
        dispatch({ type: 'error', error });
      }
    }
    getResults();
  }, [playerOne, playerTwo]);

  if (state.loading) {
    return <Loading />;
  }

  if (state.error) {
    return <p className='center-text error'>{state.error}</p>;
  }

  return (
    <Fragment>
      <div className='grid space-around container-sm'>
        <Card
          header={state.winner.score === state.loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${state.winner.score.toLocaleString()}`}
          avatar={state.winner.profile.avatar_url}
          href={state.winner.profile.html_url}
          name={state.winner.profile.login}>
          <ProfileList profile={state.winner.profile} />
        </Card>
        <Card
          header={state.winner.score === state.loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${state.loser.score.toLocaleString()}`}
          avatar={state.loser.profile.avatar_url}
          href={state.loser.profile.html_url}
          name={state.loser.profile.login}>
          <ProfileList profile={state.loser.profile} />
        </Card>
      </div>

      <Link className='btn btn-dark btn-space' to='/battle'>
        Reset
      </Link>
    </Fragment>
  );
}
