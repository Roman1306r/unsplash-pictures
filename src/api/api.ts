import axios from "axios";
const CLIENT_ID = 'x4MR8cB4IFK5_9NBeOdP5MuaK3lqPI3HpOe8Tjel1dY';



export const asyncFunc = {
	
    async getImagesAPI(query: string, page: number, order: string, orientation: string, color: string) {
        if(!query) query = 'cat';
        orientation === 'any' ? orientation = '' : orientation = `&orientation=${orientation}`;
        color === 'any' ? color = '' : color = `&color=${color}`
        try {
            let responce = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=24&order_by=${order}${orientation}${color}&client_id=${CLIENT_ID}`)
            return responce.data
        } catch (err) {
            alert(err)
        } 
    },

    async getUser(username: string) {
        try {    
            let responce = await axios.get(`https://api.unsplash.com/users/${username}?client_id=${CLIENT_ID}`)
            return responce.data
        } catch (err) {
            alert(err)
        } 
    },
    async getPhoto(id: string) {
        try {
            let responce = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=${CLIENT_ID}`)
            return responce.data
        } catch (err) {
            alert(err)
        }
    },
    async getStats() {
       try {
            let responce = await axios.get(`https://api.unsplash.com/stats/month?client_id=${CLIENT_ID}`)
            return responce.data
       } catch (err) {
            alert(err)
       } 
    }
}