import { useEffect, useState } from "react";
import { api } from "../utils/apiSetting";
import { useSelector } from "react-redux";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { language } = useSelector((state) => state.home);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setDefaultData(null);
    setError(null);
    const fetchData = async () => {
      try {
        let { data } = await api.get(url, {
          params: {
            language: language,
          },
        });
        let { data: defaultData } = await api.get(url);
        setLoading(false);
        setData(data);
        setDefaultData(defaultData);
      } catch (err) {
        setLoading(false);
        setError("Something went wrong");
      }
    };
    fetchData();
  }, [url, language]);
  return { data, defaultData, loading, error };
};

export default useFetch;
