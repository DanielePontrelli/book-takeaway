import axios from "axios";

const firebase = axios.create({
    baseURL: "https://booktakeaway-5c7b3-default-rtdb.firebaseio.com"
})

const googleBooks = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes"
})

export {
    firebase,
    googleBooks
}