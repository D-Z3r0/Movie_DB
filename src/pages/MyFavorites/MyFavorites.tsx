import React, { useState, useEffect } from "react";
import { IMovieDetail } from "../../services/movies/types";
import Loader from "../../assets/loading.png";
import { MovieCard } from "../../components/MovieCard";
import { getMovieDetail } from "../../services";

const MyFavorites = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shows, setShows] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";

    const runGetFavorites = async () => {
        if (favorites.length) { //es lo mismo que favorites.length > 0
            const favoritesArray = JSON.parse(favorites); // ya es un array
            const newShows = await Promise.all(
                favoritesArray.map(async (favorite: string) => {
                    return getMovieDetail(favorite)
                    .then((res) => {
                        if (res && res.data) {
                            return res.data;
                        }
                    })
                    .catch((err) => {
                        console.log(err, "error");
                    });
                })
            );
            setShows(newShows);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        runGetFavorites();
    }
    , []);

    return (
        <div>
            {!isLoading ? (
                <div>
                    <h1>My Favorites</h1>
                    {favorites && favorites.length > 0 ? (
                        <div>
                            {shows && 
                                shows.map((show: IMovieDetail) => (
                                    <MovieCard
                                    key={show.id}
                                    movieId={show.id}
                                    posterPath={show.poster_path}
                                    title={show.title}
                                    voteAverage={show.vote_average}
                                    genreId={show.genres[0].id}
                                    />
                            ))}
                        </div>
                    ) : 
                    (
                        <div>
                            <h1>No Favorites</h1>
                        </div>
                    )}
                </div>
            ) : 
            (
                <div className="relative"><img src={Loader} className="absolute inset-1/2 animate-spin h-10 w-10 justify-center"></img></div>
            )}
        </div>
    );
}

export default MyFavorites;