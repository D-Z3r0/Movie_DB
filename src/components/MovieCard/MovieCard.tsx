import React from 'react';
import { IMovieCard } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import genres from "../../constants/genres.json";
import { Pill } from '../Pill';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath,
}) => {
    // hooks
    const navigate = useNavigate();
    // states
    //constants
    const poster = IMAGE_SOURCE + posterPath;
    // functions
    const getGenre = (genreId: number): string => {
        const key = Object.values(genres.genres).find(genre => genre.id === genreId);
        if (key) {
            return key.name;
        }
        return "Not classified"
    };

    const navigateMovie = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, { state: { movie: movieName }}); // /show/33463
    }

    // useEffects
    //return
    return (
        <div 
            className="w-64 h-96 rounded-lg overflow-hidden shadow-lg transform cursor-pointer bg-gunmetal-700"
            onClick={() => {
                navigateMovie(movieId, title);
            }}
        >
            <div className="transition ease-in-out hover:scale-110 hover:opacity-60 duration-700 cursor-pointer">
                <img className="w-max h-max object-cover" src={poster} alt={title} />
            </div>
            <div className="absolute bottom-0 left-0 flex flex-col justify-end p-4">
                <Pill
                    title={getGenre(genreId)}
                    color="red"
                />
                <p className="font-bold text-lg text-white">{title}</p>
                <p className="text-sm text-white">{voteAverage.toFixed(1)} /10</p>
            </div>
        </div>
    )
}

export default MovieCard