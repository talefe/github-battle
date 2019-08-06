var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle
} = require('react-icons/fa');
var Card = require('./Card');
var Loading = require('./Loading');
var Tooltip = require('./Tooltip');

SelectLanguage = ({ selectedLanguage, onUpdateLanguage }) => {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map(function(language) {
        return (
          <li key={language}>
            <button
              className="btn-clear nav-link"
              style={
                language === selectedLanguage
                  ? { color: 'rgb(187,46,31)' }
                  : null
              }
              onClick={() => onUpdateLanguage(language)}
            >
              {language}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

RepoGrid = ({ repos }) => {
  return (
    <ul className="grid space-around">
      {repos.map(function(repo, index) {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues
        } = repo;
        const { login, avatar_url } = owner;
        return (
          <li key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="rgb(255,191,116)" size={22} />
                    <a href={`https://github.com/${login}`} />
                    {login}
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255,215,0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129,195,245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241,138,147)" size={22} />
                  {open_issues.toLocaleString()} open issues
                </li>
              </ul>
            </Card>
          </li>
        );
      })}
    </ul>
  );
};

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: {},
      error: null
    };

    // no need, because now updateLanguage is an arrow function
    // this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount = () => this.updateLanguage(this.state.selectedLanguage);

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage,
      error: null
    });
    if (!this.state.repos[selectedLanguage]) {
      api
        .getPopularRepos(selectedLanguage)
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
      return <p className="center-text error">{error}</p>;
    }
    return (
      <React.Fragment>
        <SelectLanguage
          selectedLanguage={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() ? (
          <Loading text="Fetching repos" speed={300} />
        ) : (
          <RepoGrid repos={repos[selectedLanguage]} />
        )}

        {error && <p className="center-text error">{error}</p>}
      </React.Fragment>
    );
  }
}

module.exports = Popular;
