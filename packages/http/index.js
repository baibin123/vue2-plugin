import common from "../util/common";
import { Message } from "element-ui";
const token = common.getStoreData("token");
const baseUrl = "https://t-waasapi.xydti.com";
export const POST = (url, params, showErr = true) => {
  return new Promise((resolve, reject) => {
    fetch(baseUrl + url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then(async (response) => {
        const res = await response.json();
        if (res.success) {
          resolve(res);
        } else {
          if (res?.fail?.message && showErr) {
            Message.error(res.fail.message);
          }
          reject(res.fail);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
