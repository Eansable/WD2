import axios from "axios"

axios.defaults.baseURL = 'https://localhost:44326/api'
axios.defaults.headers['Pragma'] = 'no-cache'
axios.defaults.headers['Cache-Control'] = 'no-cache, no-store'
// axios.interceptors.request.use((config) => {
// 	const language = window.localStorage.getItem('language')
// 	if (language)
// 		config.headers['Accept-Language'] = language
// 	return config
// }, (error) => {
// 	return Promise.reject(error)
// })

axios.interceptors.request.use((config) => {
    const jsonUser = window.localStorage.getItem("user")
    if (jsonUser) {
        const user = JSON.parse(jsonUser)
        config.headers.Authorization = `Bearer ${ user.token }`
    }

    return config
},
    error => Promise.reject(error)
)

axios.interceptors.response.use(undefined, (error) => {
    
    console.log(error.config);
})

export const requests = {
    get: (url) => axios.get(url).then(res => res.data),
    post: (url, params) => axios.post(url, params).then(res => res.data)
    
}