import { storage } from "@/utils/localStorage";

export const setupInterceptors = (axiosInstance) => {
  // Добавляем токен в query-параметры каждого запроса
  axiosInstance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') { // for next, проверка что на клиенте все, не на сервере
        const token = storage.getToken();
        if (token) {
          config.params = { ...config.params, token }; // добавляем ?token=...
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Обработка ошибки 401 (неверный или просроченный токен)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        storage.removeToken(); // или storage.clearAuth()
        console.log('Token invalid, cleared');
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};