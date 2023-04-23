import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";
import { api } from "../../utils/apiSetting";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";
import { useSelector } from "react-redux";

export default function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();
  const { language } = useSelector((state) => state.home);

  console.log(data, pageNum);
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      let apiResponse = (
        await api.get(
          `/search/multi?query=${query}&page=${pageNum}&language=${language}`
        )
      ).data;
      setData(apiResponse);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextPageData = async () => {
    try {
      let apiResponse = (
        await api.get(
          `/search/multi?query=${query}&page=${pageNum}&language=${language}`
        )
      ).data;
      console.log(apiResponse);
      if (data?.results) {
        setData({
          ...data,
          results: [...data?.results, ...apiResponse.results],
        });
      } else {
        setData(apiResponse);
      }
      setPageNum((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query, language]);

  return (
    <div className="searchResultsPage">
      {console.log(loading)}
      {loading && <Spinner initial={true} />}
      {console.log(data)}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data.total_results > 1 ? "results" : "result"
                } of '${query}':`}
                <InfiniteScroll
                  className="content"
                  dataLength={data.results.length || []}
                  next={fetchNextPageData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={<Spinner />}
                >
                  {data.results.map((item, index) => {
                    if (item.media_type === "person") return;
                    return (
                      <MovieCard key={index} data={item} fromSearch={true} />
                    );
                  })}
                </InfiniteScroll>
              </div>
            </>
          ) : (
            <span className="resultNotFound">
              There are no movies that matched your query
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
}
