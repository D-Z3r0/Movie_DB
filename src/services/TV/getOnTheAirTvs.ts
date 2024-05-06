import httpInstance from "../httpInstance";

export const getOnTheAirTvs = async () => {
    let res: any;
    const endpoint = `tv/on_the_air?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    await httpInstance
        .get(endpoint)
        .then((data) => {
        res = data;
        })
        .catch((err) => {
        res = err.message;
        });
    return res;
    }