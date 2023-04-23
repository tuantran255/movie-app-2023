import React from "react";

import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideoSection from "./videoSection/VideoSection";
import Similar from "./carousel/Similar";
import Recommendation from "./carousel/Recommendation";

export default function Details() {
  const { mediaType, id } = useParams();
  const { data, defaultData, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <DetailsBanner
        video={
          data?.results.length > 0
            ? data?.results[Math.floor(Math.random() * data?.results.length)]
            : defaultData?.results[
                Math.floor(Math.random() * data?.results.length)
              ]
        }
        crew={credits?.crew}
      />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection
        data={data?.results.length > 0 ? data : defaultData}
        loading={loading}
      />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}
