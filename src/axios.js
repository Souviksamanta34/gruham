import axios from "axios";
import axiosRetry from "axios-retry";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: //'https://us-central1-challenge-4b2b2.cloudfunctions.net/api'
     'http://localhost:5001/gruham-eb94a/us-central1/api',
});

axiosRetry(instance, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

export default instance;
