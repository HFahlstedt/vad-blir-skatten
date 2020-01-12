import fetch from "isomorphic-unfetch";

const BASE_URL =
  'https://us-central1-vad-blir-skatten-121416.cloudfunctions.net/vad-blir-skatten?';

const api = {
  fetchTaxAmount: async (salary, taxTable, year) => {
    const res = await fetch(
      BASE_URL +
        new URLSearchParams({
          salary,
          tab: taxTable,
          year
        })
    );

    const json = await res.json();
    console.log(json);

    return json;
  }
};

export default api;