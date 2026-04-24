import { API_ENDPOINTS } from "./routes";
import apiWithInterceptors from "./axiosInstance";
import { storage } from "@/utils/localStorage";

// Проверка токена
const sendToken = async (token) => {
  if (!token) return [];
  try {
    const response = await apiWithInterceptors.get(API_ENDPOINTS.ORGANIZATIONS, { params: { token } });
    // Если запрос успешен, сохраняем токен в localStorage
    storage.setToken(token);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Поиск клиента по телефону
const searchClient = async (phone) => {
  if (!phone) return [];
  try {
    const response = await apiWithInterceptors.get(API_ENDPOINTS.CONTRAGENTS, { params: { phone } });
    // Проверяем структуру ответа. Допустим, массив находится в response.data.result
    if (response.data && Array.isArray(response.data.result)) {
      return response.data.result;
    }
    // Если сразу массив, вернём response.data
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return []; // fallback
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Загрузка справочников (возвращает объект с данными)
const loadDirectories = async () => {
  const [orgs, warehouses, payboxes, priceTypes, nomenclature] = await Promise.all([
    apiWithInterceptors.get(API_ENDPOINTS.ORGANIZATIONS),
    apiWithInterceptors.get(API_ENDPOINTS.WAREHOUSES),
    apiWithInterceptors.get(API_ENDPOINTS.PAYBOXES),
    apiWithInterceptors.get(API_ENDPOINTS.PRICE_TYPES),
    apiWithInterceptors.get(API_ENDPOINTS.NOMENCLATURE),
  ]);
  return {
    organizations: orgs.data?.result ?? [],
    warehouses: warehouses.data?.result ?? [],
    payboxes: payboxes.data?.result ?? [],
    priceTypes: priceTypes.data?.result ?? [],
    nomenclature: nomenclature.data?.result ?? [],
  };
};

// Отправка заказа
const submitOrder = async (orderData) => {
  try {
    const response = await apiWithInterceptors.post(API_ENDPOINTS.CREATE_SALE, orderData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании заказа', error);
    throw error;
  }
};

export { searchClient, loadDirectories, submitOrder, sendToken };