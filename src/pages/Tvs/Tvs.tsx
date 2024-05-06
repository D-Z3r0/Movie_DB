import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import SmoothRender from "react-smooth-render";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import { MovieSlider } from "../../components/MovieSlider";
import { getAiringTodayTvs } from "../../services/TV/getAiringTodayTvs";
import { getOnTheAirTvs } from "../../services/TV/getOnTheAirTvs";
import { getPopularTvs } from "../../services/TV/getPopularTvs";
import { getTopRatedTvs } from "../../services/TV/getTopRatedTvs";
import { IMovieResponse } from "../../services/movies/types";
import { AiringToday } from "../AiringToday";

const Tvs = () => {
  const [airingTodayTvs, setAiringTodayTvs] = useState<IMovieResponse[]>([]);
  const [onTheAirTvs, setOnTheAirTvs] = useState<IMovieResponse[]>([]);
  const [popularTvs, setPopularTvs] = useState<IMovieResponse[]>([]);
  const [topRatedTvs, setTopRatedTvs] = useState<IMovieResponse[]>([]);
  const [hoverAiringToday, setHoverAiringToday] = useState<boolean>(false);
  const [hoverOnTheAir, setHoverOnTheAir] = useState<boolean>(false);
  const [hoverPopular, setHoverPopular] = useState<boolean>(false);
  const [hoverTopRated, setHoverTopRated] = useState<boolean>(false);

  const onHover = (setter: Dispatch<SetStateAction<boolean>>) => {
    setter(true);
  };

  const onLeave = (setter: Dispatch<SetStateAction<boolean>>) => {
    setter(false);
  };

  const getAiringToday = async () => {
    await getAiringTodayTvs()
      .then((data) => {
        if (data && data.data) {
          const filteredTvs = data.data.results.filter((tv: IMovieResponse) => tv.vote_average > 7);
          setAiringTodayTvs(filteredTvs);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getOnTheAir = async () => {
    await getOnTheAirTvs()
      .then((data) => {
        if (data && data.data) {
          const filteredTvs = data.data.results.filter((tv: IMovieResponse) => tv.vote_average > 6.5);
          setOnTheAirTvs(filteredTvs);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getPopular = async () => {
    await getPopularTvs()
      .then((data) => {
        if (data && data.data) {
          const filteredTvs = data.data.results.filter((tv: IMovieResponse) => tv.vote_average > 6.5);
          setPopularTvs(filteredTvs);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  const getTopRated = async () => {
    await getTopRatedTvs()
      .then((data) => {
        if (data && data.data) {
          const limitedMovies = data.data.results.slice(0, 10);
          setTopRatedTvs(limitedMovies);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getAiringToday();
    getOnTheAir();
    getPopular();
    getTopRated();
  }, []);

  return (
    <div className="px-6 py-4 w-full h-full bg-gunmetal-700">
      <div>
        <div
          className="flex flex-row gap-6 place-items-center w-max cursor-pointer"
          onMouseEnter={() => onHover(setHoverAiringToday)}
          onMouseLeave={() => onLeave(setHoverAiringToday)}
        >
          <h2 className="font-semibold text-3xl text-white py-5">Airing Today</h2>
          {hoverAiringToday && (
            <SmoothRender timing={450}>
              <Link
                to={ROUTES.AIRINGTODAY}
                className="text-white text-lg font-medium opacity-50"
              >
                Explore all
              </Link>
            </SmoothRender>
          )}
        </div>
        <MovieSlider movies={airingTodayTvs} />
      </div>
      <div>
        <div
          className="flex flex-row gap-6 place-items-center w-max cursor-pointer"
          onMouseEnter={() => onHover(setHoverOnTheAir)}
          onMouseLeave={() => onLeave(setHoverOnTheAir)}
        >
          <h2 className="font-semibold text-3xl text-white py-5">On The Air</h2>
          {hoverOnTheAir && (
            <SmoothRender timing={450}>
              <Link
                to={ROUTES.ONAIR}
                className="text-white text-lg font-medium opacity-50"
              >
                Explore all
              </Link>
            </SmoothRender>
          )}
        </div>
        <MovieSlider movies={onTheAirTvs} />
      </div>
      <div>
        <div
          className="flex flex-row gap-6 place-items-center w-max cursor-pointer"
          onMouseEnter={() => onHover(setHoverPopular)}
          onMouseLeave={() => onLeave(setHoverPopular)}
        >
          <h2 className="font-semibold text-3xl text-white py-5">Popular</h2>
          {hoverPopular && (
            <SmoothRender timing={450}>
              <Link
                to={ROUTES.POPULARTVS}
                className="text-white text-lg font-medium opacity-50"
              >
                Explore all
              </Link>
            </SmoothRender>
          )}
        </div>
        <MovieSlider movies={popularTvs} />
      </div>
      <div>
        <div
          className="flex flex-row gap-6 place-items-center w-max cursor-pointer"
          onMouseEnter={() => onHover(setHoverTopRated)}
          onMouseLeave={() => onLeave(setHoverTopRated)}
        >
          <h2 className="font-semibold text-3xl text-white py-5">Top Rated</h2>
          {hoverTopRated && (
            <SmoothRender timing={450}>
              <Link
                to={ROUTES.TOPRATEDTVS}
                className="text-white text-lg font-medium opacity-50"
              >
                Explore all
              </Link>
            </SmoothRender>
          )}
        </div>
        <MovieSlider movies={topRatedTvs} />
      </div>
    </div>
  );
};

export default Tvs;
