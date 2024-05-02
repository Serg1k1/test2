import { useHttp } from "../hooks/http.hook";

const useTimeService = () => {
    const { request, loadingStatus } = useHttp();

    const _requestBase = "https://cors-anywhere.herokuapp.com/https://timeapi.io/api/Time/current/coordinate";

    const getCityTime = async (ltd, lng) => {
        const res = await request({ url: `${_requestBase}?latitude=${ltd}&longitude=${lng}` });

        return res;
    }

    return { loadingStatus, getCityTime }
}

export default useTimeService;