import React, { useEffect, useState } from 'react';
import { IMovieResponse } from '../../services/movies/types';
import { getNowPlaying } from '../../services';
import { MovieCard } from '../../components/MovieCard';
import Loader from '../../assets/loading.png';

const NowPlaying = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorRequest, setErrorRequest] = useState<boolean>(false);

    const getNowPlayingMovies = async () => {
        await getNowPlaying()
        .then((data) => {
            if(data && data.data){
                console.log(data.data.results);
                setMovies(data.data.results);
                setIsLoading(false);
            }
        })
        .catch((err) => {
            setErrorRequest(true);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getNowPlayingMovies();
    }, []);

    return (
        <div className="bg-gunmetal-700 py-4">
            <div className="py-4 px-16">
                <h1 className="text-4xl text-white font-bold">Now Playing Movies</h1>
            </div>
            {isLoading && <div className="relative"><img src={Loader} className="absolute inset-1/2 animate-spin h-10 w-10 justify-center"></img></div>}
            <div className="flex flex-row justify-center flex-wrap gap-4 p-4">
                {movies?.length > 0 && 
                    movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movieId={movie.id}
                        posterPath={movie.poster_path}
                        title={movie.title}
                        voteAverage={movie.vote_average}
                        genreId={movie.genre_ids[0]}
                    />
                ))}
            </div>
        </div>
    );
}

export default NowPlaying;