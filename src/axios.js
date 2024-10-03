import axios from 'axios';
import axiosRetry from "axios-retry";

// Base URL points to the deployed Netlify functions path
const instance = axios.create({
    baseURL: 'https://gruhamproduct.netlify.app/.netlify/functions', // Full URL including function name
});

axiosRetry(instance, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

export default instance;
