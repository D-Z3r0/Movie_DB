import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getMovieDetail } from "../../services";
import { getMovieRecommendations } from "../../services";
import { IMovieResponse } from "../../services/movies/types";
import { IMovieDetail } from "../../services/movies/types";
import { MovieSlider } from "../../components/MovieSlider";
import { Pill } from "../../components/Pill";
import Loader from "../../assets/loading.png";
import Back from "../../assets/goback.png";
import HD from "../../assets/hd.png";
import Check from "../../assets/check-mark.png";
import Add from "../../assets/add.png";
import AddHover from "../../assets/plushover.png";
import Checked from "../../assets/checked.png";
import PG from "../../assets/age-parent.png";
import R from "../../assets/age-restricted.png";

const Show: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    const [isHover, setIsHover] = useState<boolean>(false);
    const [movieRecommendations, setMovieRecommendations] = useState<IMovieResponse[]>([]);
    const [movieDetail, setMovieDetail] = useState<IMovieDetail>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const onHover = () => {
        setIsHover(true);
    };

    const onLeave = () => {
        setIsHover(false);
    };

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours} h ${remainingMinutes} min`;
    };

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
    };

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
    };

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
    };

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
                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row gap-4 place-items-center">
                                <h1 className="font-jost font-semibold text-3xl text-white">{movieDetail?.title}</h1>
                                {isFavorite ? (
                                    <div className="h-8 w-8" onClick={removeFavorites} onMouseEnter={onHover} onMouseLeave={onLeave}>
                                        {isHover ? <img src={Checked} alt="Checked" /> : <img src={Check} alt="Check" />}
                                    </div>
                                ) : (
                                    <div className="h-8 w-8" onClick={addFavorites} onMouseEnter={onHover} onMouseLeave={onLeave}>
                                        {isHover ? <img src={AddHover} alt="AddHover" /> : <img src={Add} alt="Add" />}
                                    </div>
                                )}
                            </div>
                            <button onClick={goBack} className="w-6 hover:scale-125">
                                <img src={Back} alt="Go back" />
                            </button>
                        </div>
                        <h2 className="font-jost font-medium text-lg text-white">"{movieDetail?.tagline}"</h2>
                        <div className="flex flex-row gap-12 py-2">
                            <p className="font-jost font-normal text-white text-base">{movieDetail?.runtime ? formatRuntime(movieDetail.runtime) : 'Runtime not available'}</p>
                            <p className="font-jost font-normal text-white text-base">{movieDetail?.release_date.split('-')[0]}</p>
                            <img className="w-6" src={HD}/>
                            {movieDetail?.adult ? <img className="w-6" src={R}/> : <img className="w-6" src={PG}/>}
                        </div>
                    </div>
                    <p className="font-jost font-normal text-white text-base text-justify pb-6">{movieDetail?.overview}</p>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row place-items-center">
                            <h1 className="font-jost font-medium text-xl text-white pr-4">Rating</h1>
                            <p className="font-jost text-white text-base">{movieDetail?.vote_average.toFixed(2)}/10</p>
                        </div>
                        <div className="flex flex-row">
                            <h1 className="font-jost font-medium text-xl text-white pr-4">Genres</h1>
                            <div className="flex flex-row gap-4 place-items-center">
                                {movieDetail?.genres.map((genre) => (
                                    <p className="font-jost text-white text-base">{genre.name}</p>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-row place-items-center">
                            <h1 className="font-jost font-medium text-xl text-white pr-4">Budget</h1>
                            <p className="font-jost text-white text-base">${movieDetail?.budget.toLocaleString()}</p>
                        </div>
                        <div className="flex flex-row place-items-center">
                            <h1 className="font-jost font-medium text-xl text-white pr-4">Revenue</h1>
                            <p className="font-jost text-white text-base">${movieDetail?.revenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="font-jost font-medium text-2xl text-white py-4">More Like This</h1>
                <MovieSlider movies={movieRecommendations} />
            </div>
        </div>
    );
}

export default Show;