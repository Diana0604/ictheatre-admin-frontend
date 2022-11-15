import axios from "axios";
import config from "../config/config.index";

const databaseUrl = `${config.baseUrl}/mysql`;

export const restartDatabase = async (
  setWarningOn: (arg0: boolean) => void
) => {
  try {
    await axios.post(`${databaseUrl}/restart`);
    setWarningOn(false);
  } catch (error) {
    console.log("error restart db");
    setWarningOn(true);
    console.log(error);
  }
};

export const getCompanies = async () => {
  try {
    const res = await axios.get(`${databaseUrl}/companies`);
    return res.data;
  } catch (error) {
    console.log("error getting companies back");
    console.log(error);
  }
};
