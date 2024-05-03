import React from 'react';
import { MovieCard } from '../MovieCard';
import { IMovieSlide } from './types';
import { IMovieCard } from '../MovieCard/types';
import { IMovieResponse } from '../../services/movies/types';

const MovieSlider: React.FC<IMovieSlide> = ({ movies }) => {
  return (
    <div className="flex flex-row flex-nowrap overflow-x-scroll space-x-4 no-scrollbar snap-x snap-mandatory">
      {movies.map((movie: IMovieResponse) => (
        <div className="w-max h-ma snap-always snap-center">
          <MovieCard
          movieId={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          voteAverage={movie.vote_average}
          genreId={movie.genre_ids[0]}
          />
        </div>
      ))}
    </div>
  );
}

export default MovieSlider;