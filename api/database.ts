import axios from "axios";
import config from "../config/config.index";
import { setterFunction } from "../types/types.generic";
const databaseUrl = `${config.baseUrl}/mysql`;

/**
 * Ask api to restart database
 * @param setWarningOn setter function for can't restart warning. If cannot restart database due to show running will warn user
 */
export const restartDatabase = async (
  setWarningOn: setterFunction
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
