import httpInstance from "../httpInstance";

export const getMovieRecommendations = async (id: string) => {
    let res: any;
    const endpoint = `movie/${id}/recommendations?api_key=${process.env.REACT_APP_MDB_API_KEY}&language=en-US`;
    await httpInstance.get(endpoint)
    .then((data) => {
        res = data;
    })
    .catch((err) => {
        res = err.message;
    });
    return res;
}