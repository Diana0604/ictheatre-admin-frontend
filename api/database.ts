import axios from "axios";
import config from "../config/config.index";
import { ICompanyProperties } from "../types/types.database";
import { setterFunction } from "../types/types.generic";
const databaseUrl = `${config.baseUrl}/mysql`;

/**
 * Ask api to restart database
 * @param setWarningOn setter function for can't restart warning. If cannot restart database due to show running will warn user
 */
export const restartDatabase = async (setWarningOn: setterFunction) => {
  try {
    await axios.post(`${databaseUrl}/restart`);
    setWarningOn(false);
  } catch (error) {
    console.log("error restart db");
    setWarningOn(true);
    console.log(error);
  }
};

/**
 * get list of all companies from database
 * @returns json object with all companies and company information
 */
export const getCompanies = async () => {
  try {
    const res = await axios.get(`${databaseUrl}/companies`);
    return res.data;
  } catch (error) {
    console.log("error getting companies back");
    console.log(error);
  }
};

/**
 * delete company from database
 * @param companyId id of company to be deleted
 * @returns true if deleted / false if error
 */
export const deleteCompany = async (companyId: number) => {
  try {
    await axios.delete(`${databaseUrl}/company/${companyId}`);
    return true;
  } catch (error) {
    console.log(`ERROR while trying to delete company with id: ${companyId}`);
    console.log(error);
    return false;
  }
};

/**
 * save company information into database
 * @param companyObject json object with company information to be saved
 */
export const saveCompany = async (companyObject: ICompanyProperties) => {
  try {
    await axios.put(
      `${databaseUrl}/company/${companyObject.id}`,
      {},
      { params: companyObject }
    );
  } catch (error) {
    console.log(`ERROR: could not save ${companyObject.id}`);
    console.log(error);
  }
};

/**
 * get list of sellers and their shares
 */
export const getSellers = async () => {
  try {
    const res = await axios.get(`${databaseUrl}/sellers`);
    return res.data;
  } catch (error) {
    console.log("error getting companies back");
    console.log(error);
  }
};
