import dotenv from "dotenv";

export const fetchClound = () => {
  fetch(process.env.CLOUD_URL);
}