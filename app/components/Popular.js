import React, { Fragment, useState, useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className='flex-center'>
      {languages.map(language => (
        <li key={language}>
          <button
            className='btn-clear nav-link'
            style={language === selected ? { color: 'rgb(187,46,31)' } : null}
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export function RepoGrid({ repos }) {
  console.log(repos);
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card header={`#${index + 1}`} avatar={avatar_url} href={html_url} name={login}>
              <ul className='card-list'>
                <li>
                  <Tooltip text='Github username'>
                    <FaUser color='rgb(255,191,116)' size={22} />
                    <a href={`https://github.com/${login}`} />
                    {login}
                  </Tooltip>
                </li>
                <li>
                  <FaStar color='rgb(255,215,0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgb(129,195,245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241,138,147)' size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

function popularReducer(state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      [action.language]: action.repos,
      error: null
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

export default function Popular() {
  const [language, setLanguage] = useState('All');
  const [state, dispatch] = useReducer(popularReducer, { error: null });
  const fetchedLanguages = useRef([]);

  useEffect(() => {
    let isSubscribed = true;

    if (fetchedLanguages.current.includes(language) === false) {
      fetchedLanguages.current.push(language);

      async function getRepos() {
        try {
          const data = await getPopularRepos(language);
          if (isSubscribed) {
            dispatch({ type: 'success', repos: data, language });
          }
        } catch (error) {
          console.warn(error);
          if (isSubscribed) {
            dispatch({ type: 'error', error });
          }
        }
      }
      getRepos();
    }

    return () => (isSubscribed = false);
  }, [fetchedLanguages, language]);

  const isLoading = () => !state[language] && state.error === null;

  if (state.error) {
    return <p className='center-text error'>{state.error}</p>;
  }

  return (
    <Fragment>
      <LanguagesNav selected={language} onUpdateLanguage={setLanguage} />
      {isLoading() && <Loading text='Fetching repos' speed={300} />}
      {state.error && <p className='center-text error'>{state.error}</p>}
      {state[language] && <RepoGrid repos={state[language]} />}
    </Fragment>
  );
}
