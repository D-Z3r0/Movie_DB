import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import Logo from "../../assets/LogoSVG.svg";
import { ReactSVG } from "react-svg";

const Header = () => {
    return (
        // <nav className="flex items-center justify-between flex-wrap p-6 bg-gradient-to-b from-verdigris from-25% via-anti-white via-50% to-transparent to-75% ">
        <nav className="sticky top-0 flex items-center justify-between flex-wrap p-6 bg-black ">
            {/* <h1 className="text-2xl font-bold">Ñetflix</h1> */}
            <Link to={ROUTES.HOME}>
                {/* <ReactSVG src={Logo} className="h-10"/> */}
                <img src={Logo} alt="logo" className="h-10"/>
            </Link>
            <ul className="flex">
                <li className="px-4 text-sm text-white font-jost font-normal hover:text-slate-400">
                    <Link to={ROUTES.POPULAR}>POPULAR</Link>
                </li>
                <li className="px-4 text-sm text-white font-jost font-normal hover:text-slate-400">
                    <Link to={ROUTES.TOPRATED}>TOP RATED</Link>
                </li>
                <li className="px-4 text-sm text-white font-jost font-normal hover:text-slate-400">
                    <Link to={ROUTES.NOWPLAYING}>NOW PLAYING</Link>
                </li>
                <li className="px-4 text-sm text-white font-jost font-normal hover:text-slate-400">
                    <Link to={ROUTES.MYFAVORITES}>MY FAVORITES</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Header;