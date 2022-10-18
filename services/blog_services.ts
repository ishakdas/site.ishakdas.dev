import http from "./http-common";
import PostModel from "../types/post_model";
const getAll =async  () => {
    return await  http.get<PostModel>("blog");
};

async function getBlogBySlug(params:String) {
    return await  http.get<PostModel>("blog/"+params); 
}
const BlogService = {
    getAll,
    getBlogBySlug
}

export default BlogService;