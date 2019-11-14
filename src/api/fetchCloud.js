import cloud from "./cloud";
import dotenv from "dotenv";

dotenv.config();

export const fetchKeyStat = async(symbol) => {
  try {
    const response = await cloud.get(`/stock/${symbol}/stats/5?token=${process.env.REACT_APP_CLOUD_SANDBOX_KEY}`);
    return response.data
  } catch (error) {
    console.error("fetch key stat : ", error);
  }
};

export const fetchPrevPrice = async(symbol) => {
  try {
    const response = await cloud.get(`/stock/${symbol}/previous?token=${process.env.REACT_APP_CLOUD_SANDBOX_KEY}`);
    return response.data
  } catch (error) {
    console.error("fetch privious price : ", error);
  }
};

export const fetchHistory = async(symbol, time) => {
  try {
    const response = await cloud.get(`/stock/${symbol}/chart/${time}?token=${process.env.REACT_APP_CLOUD_SANDBOX_KEY}`);
    return response.data
  } catch (error) {
    console.error("fetch history : ", error);
  }
}

export const fetchCompany = async(symbol) => {
  try {
    const response = await cloud.get(`/stock/${symbol}/company?token=${process.env.REACT_APP_CLOUD_SANDBOX_KEY}`);
    return response.data
  } catch (error) {
    console.error("fetch company : ", error);
  }
}

export const fetchNews = async symbol => {
  try {
    const response = await cloud.get(`/stock/${symbol}/news?token=${process.env.REACT_APP_CLOUD_SANDBOX_KEY}`);
    return response.data
  } catch (error) {
    console.error("fetch news : ", error);
  }
}