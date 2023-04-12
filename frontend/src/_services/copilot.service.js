import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const copilotService = {
  getCopilotRecommendations,
  getCopiletApiKey,
};

async function getCopilotRecommendations(options) {
  const body = {
    query: options.query,
    context: options.context,
    language: options.lang,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(body) };

  const { data } = await fetch(`${config.apiUrl}/copilot`, requestOptions).then(handleResponse);

  return data || {};
}

function getCopiletApiKey() {
  const userId = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).id : null;

  console.log('auth headers gpt', userId);
  const requestOptions = { method: 'GET', headers: authHeader(), body: JSON.stringify({ userId }) };
  return fetch(`${config.apiUrl}/copilot/api-key`, requestOptions).then(handleResponse);
}
