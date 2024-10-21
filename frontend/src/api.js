import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rules';

export const createRule = async (ruleString) => {
  return await axios.post(`${API_URL}/create`, { ruleString });
};

export const evaluateRule = async (ast, data) => {
  return await axios.post(`${API_URL}/evaluate`, { ast, data });
};
