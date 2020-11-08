import Axios from "axios";
import serverURL from "../configs/serverURL";

export const checkAvg = (avg, hashtag, limits) => {
  for (let limit of limits) {
    if (hashtag === limit.name) {
      if (avg < limit.limit && avg !== 0) {
        try {
          Axios.post(`${serverURL}/api/save`, { name: hashtag, limit: avg });
        } catch (err) {
          alert(
            `Getting Error \n${
              !!err.response ? err.response.data.msg : "Server is down"
            }`
          );
        }
      }
    }
  }
};
