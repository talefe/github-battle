//var axios = require('axios');
const githubEndpoint = 'https://api.github.com';

function getErrorMessage(username, message) {
  if (message === 'Not Found') {
    console.log(message);
    return `${username} doesn't exist`;
  }

  return message;
}
function getProfile(username) {
  let getUserURI = window.encodeURI(`${githubEndpoint}/users/${username}`);
  return fetch(getUserURI)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMessage(username, profile.message));
      }

      return profile;
    });
}

function getRepos(username) {
  let getUserReposURI = window.encodeURI(
    `${githubEndpoint}/users/${username}/repos?&per_page=100`
  );

  return fetch(getUserReposURI)
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMessage(username, repos.message));
      }

      return repos;
    });
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getStarCount(repos) {
  return repos.reduce((acc, { stargazers_count }) => acc + stargazers_count, 0);
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos)
    })
  );
}

function sortPlayers(players) {
  return players.sort((p1, p2) => p2.score - p1.score);
}

export function getPopularRepos(language) {
  let getReposURI = window.encodeURI(
    `${githubEndpoint}/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(getReposURI)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
export function battle(players) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then(results => sortPlayers(results));
}
