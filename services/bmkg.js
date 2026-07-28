// bmkg.js
const axios = require("axios");

async function latestEarthquake() {
  const res = await axios.get(
    "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json",
    { timeout: 10000 }
  );
  return res.data;
}

module.exports = { latestEarthquake };
