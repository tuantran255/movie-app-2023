import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import PosterFallback from "../../../assets/images/no-poster.png";
import Img from "../../../components/lazyLoadImage/Img";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import { PlayIcon } from "../Playbtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

export default function DetailsBanner({ video, crew }) {
  const [show, setShow] = useState(false);
  const [videoID, setVideoID] = useState(null);

  const { mediaType, id } = useParams();
  const { data, defaultData, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const director = crew?.filter((i) => i.job === "Director");
  const writerBeDuplicate = crew?.filter(
    (i) => i.job === "Screenplay" || i.job === "Story" || i.job === "Writer"
  );
  const writer = writerBeDuplicate?.filter(
    (person, index) =>
      writerBeDuplicate.findIndex((i) => i.name === person.name) === index
  );
  //   console.log(writerBeDuplicate);
  //   console.log(writer);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {data && (
            <Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={data?.genres.map((g) => g.id)} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      {video && (
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoID(video.key);
                            console.log(video.key);
                          }}
                        >
                          <PlayIcon />
                          <div className="text">Watch Trailer</div>
                        </div>
                      )}
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="descriptrion">
                        {data.overview ? data.overview : defaultData.overview}
                      </div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM DD,YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Director{director.length > 1 && "s"}:{" "}
                        </span>
                        <span className="text">
                          {director.map((person, index) => (
                            <span key={index}>
                              {person.name}
                              {director.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">
                          Writer{writer.length > 1 && "s"}:{" "}
                        </span>
                        <span className="text">
                          {writer.map((person, index) => (
                            <span key={index}>
                              {person.name}
                              {writer.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data?.created_by.map((person, index) => (
                            <span key={index}>
                              {person.name}
                              {data?.created_by.length - 1 !== index && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoID={videoID}
                  setVideoID={setVideoID}
                />
              </ContentWrapper>
            </Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}
