import { API_ENDPOINTS } from "./routes";
import apiWithInterceptors from "./axiosInstance";

// Поиск клиента по телефону
const searchClients = async (phone) => {
    if (!phone) return [];
  try {
    const response = await apiWithInterceptors.get(API_ENDPOINTS.CONTRAGENTS, { params: { phone } });
    return response.data; 
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
    organizations: orgs.data,
    warehouses: warehouses.data,
    payboxes: payboxes.data,
    priceTypes: priceTypes.data,
    nomenclature: nomenclature.data,
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

export { searchClients, loadDirectories, submitOrder };