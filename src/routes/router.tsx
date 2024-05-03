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
        }
    ]
  },
];

export const router = createBrowserRouter(routes);