import React, { useEffect, useState } from "react";
import { MovieSlider } from "../../components/MovieSlider";
import { IMovieResponse } from "../../services/movies/types";
import { getPopular } from "../../services";
import { getTopRated } from "../../services";
import { getNowPlaying } from "../../services";

const Home = () => {
    const [popularMovies, setPopularMovies] = useState<IMovieResponse[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<IMovieResponse[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorRequest, setErrorRequest] = useState<boolean>(false);

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
        <div className="px-6 py-4 w-screen h-full object-cover bg-gunmetal-700">
            <div>
                <h2 className="font-semibold text-3xl text-white py-5">Popular</h2>
                <MovieSlider movies={popularMovies} />
            </div>
            <div>
                <h2 className="font-semibold text-3xl text-white py-5">Top Rated</h2>
                <MovieSlider movies={topRatedMovies} />
            </div>
            <div>
                <h2 className="font-semibold text-3xl text-white py-5">Now Playing</h2>
                <MovieSlider movies={nowPlayingMovies} />
            </div>
        </div>
    );
}

export default Home;