import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5088/api/v1/",
});

// Add access token to request headers
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token refresh on 401 errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired access token
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (refreshToken) {
                    // Request new access token using the refresh token
                    const response = await axios.post(
                        "http://localhost:5088/api/v1/authentication/token/refresh",
                        { refreshToken }
                    );

                    const newAccessToken = response.data.accessToken;

                    // Store the new access token and retry original request
                    localStorage.setItem("accessToken", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login"; // Redirect to login page
            }
        }

        return Promise.reject(error);
    }
);

export default api;
