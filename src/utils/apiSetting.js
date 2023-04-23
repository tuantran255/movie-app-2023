import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTI0MTliMDM4MDkwNTUxOTk2MGZlNTI4M2JjMzAzZSIsInN1YiI6IjY0MjY5ZWYyMDFiMWNhMDBiNjI5NmNmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hPMiFSNrojzf-WUL4baqghHGcMuxCjLC4pv1anLT93I";

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: "Bearer " + TMDB_TOKEN,
    };
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

// const headers = {
//   Authorization: "Bearer " + TMDB_TOKEN
// };

// export const fetchDataFromAPI = async (url, params) => {
//   try {
//     const { data } = await axios.get(BASE_URL + url, {
//       headers,
//       params,
//     });
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };
