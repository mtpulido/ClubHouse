import axios from "axios"
const getToken = () => {
  //create promise
  return new Promise(resolve => {
    //grabs JWT from localStorage if it exists, if not it gives null
    //use Bearer with local storage for http standard.
    resolve(`Bearer ${localStorage.getItem('token') || null}`)
  })
}
//setting our production / local api path. use 2 tabs in terminal to operate on the local-host for backend.
//need to insert our deployed heroku api once it's done.
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://songsplayu.herokuapp.com/api' : 'http://localhost:3000/api'
})
//this is for injecting properties into our axios request before they are sent out
api.interceptors.request.use(async function (options) {
  // we're going to inject the bearer token from the getToken promsie we created.
  options.headers['Authorization'] = await getToken()
  return options
}, function (error) {
  console.log('request error:', error)
  return Promise.reject(error)
})

export default api