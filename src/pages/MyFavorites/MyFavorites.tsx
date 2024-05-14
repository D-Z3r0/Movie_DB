import React, { useState, useEffect } from "react";
import { IMovieDetail } from "../../services/movies/types";
import Loader from "../../assets/loading.png";
import { MovieCard } from "../../components/MovieCard";
import { getMovieDetail } from "../../services";
import { useAppContext } from "../../store/app-context/app-context";

const MyFavorites = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [shows, setShows] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";
    const { setUser } = useAppContext();

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

    useEffect(() => {
        setTimeout(() => {
            const user = {
                id: 1,
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@tec.mx"
            };
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            console.log("respondio el servicio y se asigno el usuario");
        }, 2000);
    }, []);
    
    return (
        <div className="bg-gunmetal-700 py-4">
            {!isLoading ? (
                <div>
                    <div className="py-4 px-16">
                        <h1 className="text-4xl text-white font-bold">My Favorites</h1>
                    </div>
                    {favorites && favorites.length > 0 ? (
                        <div className="flex flex-row justify-center flex-wrap gap-4 p-4">
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