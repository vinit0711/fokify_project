import { async } from "regenerator-runtime";
import { TIMEOUT_Sec } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    console.log("get jSON Called , now race start");
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_Sec)]);
    const data = await res.json();
    // console.log("data recived From API");
    if (!res.ok) throw new Error(`${res.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};
