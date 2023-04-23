import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { api } from "./utils/apiSetting";
import { getApiConfiguration, getGenres } from "./redux/slices/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();
  const currentLanguage = localStorage.getItem("language");
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = async () => {
    try {
      let { data } = await api.get("/configuration");
      const url = {
        backdrop: data.images.secure_base_url + "original",
        poster: data.images.secure_base_url + "original",
        profile: data.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    } catch (err) {
      console.log(err);
    }
  };

  const genresCall = async (language = currentLanguage) => {
    console.log(language);
    const endPoints = ["tv", "movie"];
    let allGenres = {};
    try {
      let apiResponses = await Promise.all(
        endPoints.map((endPoint) =>
          api.get(`/genre/${endPoint}/list`, {
            params: {
              language: language,
            },
          })
        )
      );
      apiResponses.forEach(({ data }) => {
        data?.genres?.forEach((genre) => {
          allGenres[genre.id] = genre;
        });
      });
      dispatch(getGenres(allGenres));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BrowserRouter>
      <Header genresCall={genresCall} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
