import http from "./http-common";
import HomeModel from "../types/home_model";
const getAll =async  () => {
    return await  http.get<HomeModel>("home");
};

const HomeService = {
    getAll,
}

export default HomeService;