import axios from 'axios';


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})
// Request interceptor
api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// response interceptor specially for  and acess token refresh
api.interceptors.response.use(
    (response) => response,

    async (error) => {

        if (
            error.response?.status === 401
        ) {

            const refreshResponse =
                await api.post(
                    "/api/auth/refresh-token"
                );

            localStorage.setItem(
                "accessToken",
                refreshResponse.data.accessToken
            );

            return api(error.config);
        }

        return Promise.reject(error);
    }
);

export async function register({ username, email, password }) {
    try {

        const response = await api.post('/api/auth/register', {
            username,
            email,
            password
        })
            localStorage.setItem("accessToken", response.data.accessToken);
        return response.data;
    } catch (error) {
        console.log('Error during registration:', error);
        throw error;
    }
}
export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password
        })
        
        localStorage.setItem("accessToken", response.data.user.accessToken);

        return response.data;
    } catch (error) {
        console.log('Error during login:', error);
        throw error;
    }

}
export async function logout() {
    try {
        const response = await api.post("/api/auth/logout")
        localStorage.removeItem("accessToken");
        return response.data;
    }
    catch (error) {
        console.log('Error during logout:', error);
        throw error;
    }
}

export async function refreshToken() {
    try {
        const response = await api.post("/api/auth/refresh-token")
        localStorage.setItem("accessToken", response.data.accessToken);
        return response.data;
    }
    catch (error) {
        console.log('Error during token refresh:', error);
        throw error;
    }
}

export async function getUser() {
    try {
        const response = await api.get("/api/auth/get-user")
        return response.data;
    } catch (error) {
        throw error;
    }
}

export default api;


