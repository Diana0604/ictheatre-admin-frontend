import axios from "axios";
import config from "../config/config.index";

const showUrl = `${config.baseUrl}/show`;

export const playShow = async (setPlaying: (arg0: boolean) => void) => {
  try {
    await axios.post(`${showUrl}/play`);
    setPlaying(true);
  } catch (error) {
    console.log(`error asking api to play show`);
  }
};

export const pauseShow = async (setPlaying: (arg0: boolean) => void) => {
  try {
    await axios.post(`${showUrl}/pause`);
    setPlaying(false);
  } catch (error) {
    console.log(`error asking api to play show`);
    console.log(error);
  }
};
