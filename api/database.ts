import axios from "axios";

export const restartDatabase = async (
  setWarningOn: (arg0: boolean) => void
) => {
  try {
    await axios.post("http://localhost:3000/mysql/restart");
    setWarningOn(false);
  } catch (error) {
    console.log("error restart db");
    setWarningOn(true);
    console.log(error);
  }
};

export const getCompanies = async () => {
  try {
    const res = await axios.get("http://localhost:3000/mysql/companies");
    return res.data;
  } catch (error) {
    console.log("error getting companies back");
    console.log(error);
  }
};
