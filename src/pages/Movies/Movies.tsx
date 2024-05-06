import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { MovieSlider } from "../../components/MovieSlider";
import { IMovieResponse } from "../../services/movies/types";
import { getPopular } from "../../services";
import { getTopRated } from "../../services";
import { getNowPlaying } from "../../services";
import { Link, useLocation} from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import SmoothRender from "react-smooth-render";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieResponse[]>([]);
  const [hover, setHover] = useState<boolean>(false);
  const [hoverPopular, setHoverPopular] = useState<boolean>(false);
  const [hoverTopRated, setHoverTopRated] = useState<boolean>(false);
  const [hoverNowPlaying, setHoverNowPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorRequest, setErrorRequest] = useState<boolean>(false);

  const onHover = (setter: Dispatch<SetStateAction<boolean>>) => {
      setter(true);
  };

  const onLeave = (setter: Dispatch<SetStateAction<boolean>>) => {
      setter(false);
  };

  const getPopularMovies = async () => {
      await getPopular()
      .then((data) => {
      if(data && data.data){
          const filteredMovies = data.data.results.filter((movie: IMovieResponse) => movie.vote_average > 6.5);
          setPopularMovies(filteredMovies);
      } 
      })
      .catch((err) => {
      setErrorRequest(true);
      });
  };

  const getTopRatedMovies = async () => {
      await getTopRated()
      .then((data) => {
      if(data && data.data){
          console.log(data.data.results);
          const limitedMovies = data.data.results.slice(0, 10);
          setTopRatedMovies(limitedMovies);
      }
      })
      .catch((err) => {
      setErrorRequest(true);
      });
  }

  const getNowPlayingMovies = async () => {
      await getNowPlaying()
      .then((data) => {
      if(data && data.data){
          console.log(data.data.results);
          const filteredMovies = data.data.results.filter((movie: IMovieResponse) => movie.vote_average > 7);
          setNowPlayingMovies(filteredMovies);
      }
      })
      .catch((err) => {
      setErrorRequest(true);
      });
  }

  useEffect(() => {
      setIsLoading(true);
      getPopularMovies();
      getTopRatedMovies();
      getNowPlayingMovies();
  }, []);

  return (
      <div className="px-6 py-4 w-full h-full bg-gunmetal-700">
          <div>
              <div className="flex flex-row gap-6 place-items-center w-max cursor-pointer" onMouseEnter={() => onHover(setHoverPopular)} onMouseLeave={() => onLeave(setHoverPopular)}>
                  <h2 className="font-semibold text-3xl text-white py-5">Popular</h2>
                  {hoverPopular && 
                  <SmoothRender timing={450}>
                      <Link to={ROUTES.POPULAR} className="text-white text-lg font-medium opacity-50">Explore all</Link>
                  </SmoothRender> }
              </div>
              <MovieSlider movies={popularMovies} />
          </div>
          <div>
          <div className="flex flex-row gap-6 place-items-center w-max cursor-pointer" onMouseEnter={() => onHover(setHoverTopRated)} onMouseLeave={() => onLeave(setHoverTopRated)}>
                  <h2 className="font-semibold text-3xl text-white py-5">Top Rated</h2>
                  {hoverTopRated && 
                  <SmoothRender timing={450}>
                  <Link to={ROUTES.POPULAR} className="text-white text-lg font-medium opacity-50">Explore all</Link>
                  </SmoothRender> }
              </div>
              <MovieSlider movies={topRatedMovies} />
          </div>
          <div>
          <div className="flex flex-row gap-6 place-items-center w-max cursor-pointer" onMouseEnter={() => onHover(setHoverNowPlaying)} onMouseLeave={() => onLeave(setHoverNowPlaying)}>
                  <h2 className="font-semibold text-3xl text-white py-5">Now Playing</h2>
                  {hoverNowPlaying && 
                  <SmoothRender timing={450}>
                  <Link to={ROUTES.POPULAR} className="text-white text-lg font-medium opacity-50">Explore all</Link>
                  </SmoothRender> }
              </div>
              <MovieSlider movies={nowPlayingMovies} />
          </div>
      </div>
  );
}

export default Movies