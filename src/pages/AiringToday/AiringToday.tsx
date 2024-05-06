import React, { useState, useEffect } from 'react';
import { MovieCard } from '../../components/MovieCard';
import { getAiringTodayTvs } from '../../services/TV/getAiringTodayTvs';
import Loader from '../../assets/loading.png';
import { IMovieResponse } from '../../services/movies/types';

const AiringToday = () => {
  const [tvs, setTvs] = useState<IMovieResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorRequest, setErrorRequest] = useState<boolean>(false);

  const getAiringToday = async () => {
    await getAiringTodayTvs()
    .then((data) => {
      if(data && data.data){
        console.log(data.data.results)
        setTvs(data.data.results)
        setIsLoading(false)
      }
    })
    .catch((err) => {
      setErrorRequest(true)
    })
  };

  useEffect(() => {
    setIsLoading(true);
    getAiringToday();
  }, []);

  return (
    <div className="bg-gunmetal-700 py-4">
      <div className="py-4 px-16">
        <h1 className="text-4xl text-white font-bold">Airing Today TV Shows</h1>
      </div>
      {isLoading && <div className="relative"><img src={Loader} className="absolute inset-1/2 animate-spin h-10 w-10 justify-center"></img></div>}
      <div className="flex flex-row justify-center flex-wrap gap-4 p-4">
        {tvs?.length > 0 && 
            tvs.map((tv) => (
              <MovieCard
                key={tv.id}
                movieId={tv.id}
                posterPath={tv.poster_path}
                title={tv.title}
                voteAverage={tv.vote_average}
                genreId={tv.genre_ids[0]}
              />
        ))}
      </div>
    </div>
  );
}

export default AiringToday;