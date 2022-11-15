import axios from "axios";

export const playShow = async (setPlaying: (arg0: boolean) => void) => {
  try {
    await axios.post('http://localhost:3000/show/play');
    setPlaying(true)
  } catch(error) {
    console.log(`error asking api to play show`)
  }
};

export const pauseShow = async (setPlaying: (arg0: boolean) => void) => {
  try {
    await axios.post('http://localhost:3000/show/pause')
    setPlaying(false);
  } catch(error) {
    console.log(`error asking api to play show`)
    console.log(error)
  }
};