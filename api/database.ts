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
    await axios.delete(`${databaseUrl}/companies/${companyId}`);
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
      `${databaseUrl}/companies/${companyObject.id}`,
      {},
      { params: companyObject }
    );
  } catch (error) {
    console.log(`ERROR: could not save ${companyObject.id}`);
    console.log(error);
  }
};

export const addCompany = async (companyObject: ICompanyProperties) => {
  try {
    await axios.post(`${databaseUrl}/companies`, {}, { params: companyObject });
    return true;
  } catch (error) {
    console.log(`ERROR: could not add new company`);
    console.log(error);
    return false;
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

/**
 * save seller information into database
 * @param sellerObject json object with company information to be saved
 */
export const saveSeller = async (sellerObject: any) => {
  try {
    await axios.put(
      `${databaseUrl}/sellers/${sellerObject.id}`,
      {},
      { params: sellerObject }
    );
  } catch (error) {
    console.log(`ERROR: could not save ${sellerObject.id}`);
    console.log(error);
  }
};

/**
 * save share bundle object information into database
 * @param shareBundleObject json object with company information to be saved
 */
export const saveShareBundle = async (shareBundleObject: any) => {
  try {
    await axios.put(
      `${databaseUrl}/shareBundle/${shareBundleObject.id}`,
      {},
      { params: shareBundleObject }
    );
  } catch (error) {
    console.log(`ERROR: could not save ${shareBundleObject.id}`);
    console.log(error);
  }
};

/**
 * delete seller from database and all their shares
 * @param sellerId id of seller to be deleted
 * @returns true if deleted / false if error
 */
export const deleteSeller = async (sellerId: number) => {
  try {
    await axios.delete(`${databaseUrl}/sellers/${sellerId}`);
    return true;
  } catch (error) {
    console.log(`ERROR while trying to delete company with id: ${sellerId}`);
    console.log(error);
    return false;
  }
};

export const addSeller = async (sellerObject: any) => {
  try {
    await axios.post(`${databaseUrl}/sellers`, {}, { params: sellerObject });
    return true;
  } catch (error) {
    console.log(`ERROR: could not add new seller`);
    console.log(error);
    return false;
  }
};
/**
 * obtain player compani object from api
 * @returns player company information
 */
export const getPlayerCompany = async () => {
  try {
    const res = await axios.get(`${databaseUrl}/companies/playercompany`);
    return res.data;
  } catch (error) {
    console.log(`ERROR while trying to get player company`);
    console.log(error);
    return false;
  }
};

export const savePlayerCompany = async (playerCompany: any) => {
  try {
    await axios.put(`${databaseUrl}/companies/playercompany`, null, {
      params: playerCompany,
    });
    return true;
  } catch (error) {
    console.log(`ERROR: while trying to save player company`);
    console.log(error);
    return false;
  }
};

/**
 * request to sell shares from a seller back to company.
 * @param bundle
 * @param quantity
 * @param priceAtSale
 */
export const sellShares = async (
  bundle: any,
  quantity: number,
  priceAtSale: number
) => {
  await axios.post(`${databaseUrl}/shares/sell`, null, {
    params: { ...bundle, quantity, priceAtSale },
  });
};

/**
 * request to buy shares from a company.
 * @param bundle
 * @param quantity
 * @param priceAtSale
 */
export const buyShares = async (
  bundle: any,
  quantity: number,
  priceAtSale: number
) => {
  await axios.post(`${databaseUrl}/shares/buy`, null, {
    params: { ...bundle, quantity, priceAtSale },
  });
};

export const sellPlayerShares = async (
  bundle: any,
  quantity: number,
  priceAtSale: number
) => {
  await axios.post(`${databaseUrl}/shares/playersell`, null, {
    params: { ...bundle, quantity, priceAtSale },
  });
};

export const buyPlayerShares = async (
  bundle: any,
  quantity: number,
  priceAtSale: number
) => {
  await axios.post(`${databaseUrl}/shares/playerbuy`, null, {
    params: { ...bundle, quantity, priceAtSale },
  });
};

export const getPlayerBundles = async () => {
  try {
    const res = await axios.get(`${databaseUrl}/shares/playerbundles`);
    return res.data;
  } catch (error) {
    console.log("error getting companies back");
    console.log(error);
  }
};

export const getSellerBundles = async (sellerId : string) => {
  try {
    const res = await axios.get(`${databaseUrl}/sellers/${sellerId}/shares`)
    return res.data
  } catch(error) {
    console.log("error getting seller bundles");
    console.log(error);
  }
}

export const getShowStatus = async () => {
  try {
    const res = await axios.get(`${databaseUrl}/showstatus`);
    return res.data;
  } catch (error) {
    console.log("error getting companies back");
    console.log(error);
  }
};