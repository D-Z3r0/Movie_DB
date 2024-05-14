import React from "react";

export type AppContextProps = {
    children : React.ReactNode;
};

export interface UserObject {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

export interface Tokens {
    accessToken: string;
    refreshToken: string;
};

export type AppState = {
    user: UserObject | undefined;
    setUser: (user: UserObject) => void;
    token: Tokens | undefined;
    setToken: (accessToken: string, refreshToken: string) => void;
    logOut: () => void;
};