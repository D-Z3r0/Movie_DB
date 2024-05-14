import { createContext, useContext, useState } from 'react';
import { AppContextProps, Tokens, UserObject, AppState } from './types';

const AppContext = createContext<AppState | undefined>(undefined);

export const AppContextProvider = ({children}: AppContextProps) => {
    const [user, setUser] = useState<UserObject | undefined>(undefined);
    const [token, setToken] = useState<Tokens | undefined>(undefined);
    //cualquier state

    const setTokenState = (accessToken: string, refreshToken: string) => {
        setToken({accessToken, refreshToken});
    };

    const logOut = () => {
        setUser(undefined);
        setToken(undefined);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    }

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken: setTokenState,
                logOut,
                //cualquier state
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }
    return context;
}