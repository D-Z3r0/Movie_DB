import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getMovieDetail } from "../../services";
import { getMovieRecommendations } from "../../services";
import { IMovieResponse } from "../../services/movies/types";
import { IMovieDetail } from "../../services/movies/types";
import { MovieSlider } from "../../components/MovieSlider";
import { Pill } from "../../components/Pill";
import Loader from "../../assets/loading.png";
import Add from "../../assets/heart.png";
import Back from "../../assets/goback.png";

const Show: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movieRecommendations, setMovieRecommendations] = useState<IMovieResponse[]>([]);
    const [movieDetail, setMovieDetail] = useState<IMovieDetail>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const goBack = () => {
        navigate(-1);
    };

    const addFavorites = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : []; //{"12345","67890"}
        const newFavorites = [...favs, id];
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const removeFavorites = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const getMovie = async () => {
        const movieID = String(id);
        await getMovieDetail(movieID)
        .then((data) => {
            console.log(data.data);
            setMovieDetail(data.data);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getRecommendations = async () => {
        const movieID = String(id);
        await getMovieRecommendations(movieID)
        .then((data) => {
            console.log(data.data.results);
            setMovieRecommendations(data.data.results);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        const favs = localStorage.getItem("favorites") || "";
        setFavorites(favs);
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        //aqui llamar el endpoint de las detalles de la pelicula con el id
        getMovie();
        //lamar el endpoint de las recomendaciones de la pelicula con el id
        getRecommendations();
    }, []);

    return (
        
        <div className="bg-gunmetal-700 p-6">
            {isLoading && <div className="relative"><img src={Loader} className="absolute inset-1/2 animate-spin h-10 w-10 justify-center"></img></div>}
            <div className="flex flex-row gap-4 h-1/6">
                <img className="rounded-lg" src={`https://image.tmdb.org/t/p/w500/${movieDetail?.poster_path}`} alt={movieDetail?.title} />
                <div className="space-y-4">
                    <button onClick={goBack} className="w-6">
                        <img src={Back} alt="Go back" />
                    </button>
                    <h1 className="font-jost font-semibold text-3xl text-white">{movieDetail?.title}</h1>
                    <p className="font-jost font-normal text-white text-base">{movieDetail?.overview}</p>
                    <div className="flex flex-row">
                        <div className="grow">
                            <h1 className="font-jost font-medium text-2xl text-white pb-4">Genre</h1>
                            <div className="flex flex-row gap-4">
                                {movieDetail?.genres.map((genre) => (
                                    <Pill key={genre.id} title={genre.name} color="green" />
                                ))}
                            </div>
                        </div>
                        <div className="grow">
                            <h1 className="font-jost font-medium text-2xl text-white pb-4">Favorite</h1>
                            {isFavorite ? (
                                <button onClick={removeFavorites} className="flex flex-row gap-1 p-1.5 text-white text-sm bg-verdigris rounded-lg hover:bg-martyc-green ">
                                <img className="h-5 w-5" src={Add} alt="Add"/>Remove from favorites
                                </button>
                            ) : (
                                <button onClick={addFavorites} className="flex flex-row gap-1 p-1.5 text-white text-sm bg-verdigris rounded-lg hover:bg-martyc-green ">
                                <img className="h-5 w-5" src={Add} alt="Add"/>Add to favorites
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-jost font-medium text-2xl text-white py-4">Recomendaciones</h1>
                <MovieSlider movies={movieRecommendations} />
            </div>
        </div>
    );
}

export default Show;