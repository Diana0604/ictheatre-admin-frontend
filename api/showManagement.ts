import axios from "axios";
import config from "../config/config.index";
import { setterFunction } from "../types/types.generic";

const showUrl = `${config.baseUrl}/show`;

/**
 * Ask API to play show. Set show to playing if successfull call.
 * @param isPlaying setter function for show playing
 */
export const playShow = async (isPlaying: setterFunction) => {
  try {
    await axios.post(`${showUrl}/play`);
    isPlaying(true);
  } catch (error) {
    console.log(`error asking api to play show`);
  }
};

/**
 * Ask API to pause show. Set show to pause if successfull call.
 * @param isPlaying setter function for show playing
 */
export const pauseShow = async (isPlaying: setterFunction) => {
  try {
    await axios.post(`${showUrl}/pause`);
    isPlaying(false);
  } catch (error) {
    console.log(`error asking api to play show`);
    console.log(error);
  }
};
