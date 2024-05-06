import { RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import { Home } from "../pages/Home";
import { Popular } from "../pages/Popular";
import { TopRated } from "../pages/TopRated";
import { NowPlaying } from "../pages/NowPlaying";
import { MyFavorites } from "../pages/MyFavorites";
import { Show } from "../pages/Show";
import { Movies } from "../pages/Movies";
import { Tvs } from "../pages/Tvs";
import { AiringToday } from "../pages/AiringToday";
import { OnAir } from "../pages/OnAir";
import { PopularTvs } from "../pages/PopularTvs";
import { TopRatedTvs } from "../pages/TopRatedTvs";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRouter />,
    children: [
        {
            path: ROUTES.HOME,
            element: <Home />,
        },
        {
            path: ROUTES.MOVIES,
            element: <Movies />
        },
        {
            path: ROUTES.POPULAR,
            element: <Popular />
        },
        {
            path: ROUTES.TOPRATED,
            element: <TopRated />
        },
        {
            path: ROUTES.NOWPLAYING,
            element: <NowPlaying />
        },
        {
            path: ROUTES.MYFAVORITES,
            element: <MyFavorites />
        },
        {
            path: `${ROUTES.SHOW}:id`,
            element: <Show />
        },
        {
            path: ROUTES.TVS,
            element: <Tvs />
        },
        {
            path: ROUTES.AIRINGTODAY,
            element: <AiringToday />
        },
        {
            path: ROUTES.ONAIR,
            element: <OnAir />
        },
        {
            path: ROUTES.POPULARTVS,
            element: <PopularTvs />
        },
        {
            path: ROUTES.TOPRATEDTVS,
            element: <TopRatedTvs />
        }
    ]
  },
];

export const router = createBrowserRouter(routes);