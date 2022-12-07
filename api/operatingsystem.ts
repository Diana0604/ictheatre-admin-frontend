import axios from "axios";
import config from "../config/config.index";

export const killServer = async () => {
  try {
    const confirmed = confirm('Are you sure you want to continue? This will shut down the server, thus making all programs stop working. If you accidentally shut it down you have to unplug the server for 10 seconds and plug it again. If you are doing this purposefully, think about restarting database in advance as well :)')
    if(confirmed)
      await axios.post(`${config.baseUrl}/os/shutdown`);
    return true;
  } catch (error) {
    console.log(`ERROR: could shut down`);
    console.log(error);
    return false;
  }
};