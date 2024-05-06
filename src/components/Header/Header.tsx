import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import Logo from "../../assets/LogoSVG.svg";
import { ReactSVG } from "react-svg";

const Header = () => {

    return (
        <nav className="sticky top-0 z-10 flex items-center justify-between flex-wrap p-6 bg-gradient-to-b from-black from-70% via-rich-black via-85% to-gunmetal-700 to-100%">
            <NavLink to={ROUTES.HOME}>
                <img src={Logo} className="h-10" alt="logo"/>
            </NavLink>
            <ul className="flex gap-6">
                <li>
                    <NavLink to={ROUTES.MOVIES} className={({ isActive }) => 
                        "text-white font-jost text-base hover:opacity-50 " + (isActive ? "font-medium" : "font-normal")
                    }>
                        Movies
                    </NavLink>
                </li>
                <li className="text-base font-jost hover:opacity-50">
                    <NavLink to={ROUTES.TVS} className={({ isActive }) => 
                        "text-white font-jost text-base hover:opacity-50 " + (isActive ? "font-medium" : "font-normal")
                    }>
                        TV Shows
                    </NavLink>
                </li>
                <li className="text-base font-jost hover:opacity-50">
                    <NavLink to={ROUTES.MYFAVORITES} className={({ isActive }) => 
                        "text-white font-jost text-base hover:opacity-50 " + (isActive ? "font-medium" : "font-normal")
                    }>
                        My List
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Header;