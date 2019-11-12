import cloud from "./cloud";
import dotenv from "dotenv";

dotenv.config();

export const fetchLastPrice = async(symbol) => {
  let response
  try {
    response = await cloud.get(`/stock/${symbol}/price?token=${process.env.REACT_APP_CLOUD_SANDBOX_KEY}`);
  } catch (error) {
    console.log("error", error);
  }
  return response.data
}