import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { getPopularRepos } from '../utils/api';
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} from 'react-icons/fa';
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
            onClick={() => onUpdateLanguage(language)}
          >
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
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;

        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
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

class Popular extends Component {
  state = {
    selectedLanguage: 'All',
    repos: {},
    error: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage,
      error: null
    });
    if (!this.state.repos[selectedLanguage]) {
      getPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: { ...repos, [selectedLanguage]: data },
            error: null
          }));
        })
        .catch(error => {
          console.warn('Error fetching repos: ', error);
          this.setState({
            error
          });
        });
    }
  };
  isLoading = () => {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  };
  render() {
    const { selectedLanguage, repos, error } = this.state;
    if (error) {
      return <p className='center-text error'>{error}</p>;
    }
    return (
      <Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <Loading text='Fetching repos' speed={300} />}
        {error && <p className='center-text error'>{error}</p>}
        {repos[selectedLanguage] && (
          <RepoGrid repos={repos[selectedLanguage]} />
        )}
      </Fragment>
    );
  }
}

export default Popular;
