import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { MovieSlider } from "../../components/MovieSlider";
import { IMovieResponse } from "../../services/movies/types";
import { getTrendingWeek } from "../../services/trending/getTrendingWeek";
import { getTrendingMovies } from "../../services/trending/getTrendingMoviesWeek";
import { getTrendingTvs } from "../../services/trending/getTrendingTvsWeek";
import { useAppContext } from "../../store/app-context/app-context";

const Home = () => {
    const [trendingWeek, setTrendingWeek] = useState<IMovieResponse[]>([]);
    const [trendingMoviesWeek, setTrendingMoviesWeek] = useState<IMovieResponse[]>([]);
    const [trendingTvsWeek, setTrendingTvsWeek] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorRequest, setErrorRequest] = useState<boolean>(false);
    const { user, setUser } = useAppContext();
    console.log(user, "user");

    const getTrendingThisWeek = async () => {
        await getTrendingWeek()
        .then((data) => {
            if(data && data.data){
                // console.log(data.data.results);
                setTrendingWeek(data.data.results);
            } 
        })
        .catch((err) => {
            setErrorRequest(true);
        });
    }

    const getTrendingMoviesThisWeek = async () => {
        await getTrendingMovies()
        .then((data) => {
            if(data && data.data){
                // console.log(data.data.results);
                setTrendingMoviesWeek(data.data.results);
            } 
        })
        .catch((err) => {
            setErrorRequest(true);
        });
    }

    const getTrendingTvsThisWeek = async () => {
        await getTrendingTvs()
        .then((data) => {
            if(data && data.data){
                console.log(data.data.results);
                setTrendingTvsWeek(data.data.results);
            } 
        })
        .catch((err) => {
            setErrorRequest(true);
        });
    }

    useEffect(() => {
        getTrendingThisWeek();
        getTrendingMoviesThisWeek();
        getTrendingTvsThisWeek();
    }, []);

    useEffect(() => {
        if (typeof user === "undefined") {
            const localUser = localStorage.getItem("user");
            if (localUser) {
                setUser(JSON.parse(localUser));
            }
            // entonces llamar servicio
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="px-6 py-4 w-full h-full bg-gunmetal-700">
            {user?.firstName}
            {/* <div>
                <h2 className="font-semibold text-3xl text-white py-5">Popular</h2>
                <MovieSlider movies={setTrendingWeek} />
            </div> */}
            <div>
                <h2 className="font-semibold text-3xl text-white py-5">Trending Movies This Week</h2>
                <MovieSlider movies={trendingMoviesWeek} />
            </div>
            <div>
                <h2 className="font-semibold text-3xl text-white py-5">Trending TV Shows This Week</h2>
                <MovieSlider movies={trendingTvsWeek} />
            </div>
        </div>
    );
}

export default Home;