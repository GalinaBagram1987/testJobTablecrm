import { API_ENDPOINTS } from "./routes";
import apiWithInterceptors from "./axiosInstance";
import { storage } from "@/utils/localStorage";

const callProxy = async (endpoint, method, token, data = null) => {
  const response = await apiWithInterceptors.post('/api/proxy', {
    url: endpoint,    // например 'organizations'
    method,           // 'GET'
    token,
    body: data,
  });
  return response.data;
}; 



// Проверка токена
const sendToken = async (token) => {
  if (!token) return [];
  try {
    const data = await callProxy(API_ENDPOINTS.ORGANIZATIONS, 'GET', token);
    // Если запрос успешен, сохраняем токен в localStorage
    storage.setToken(token);
    return data; // содердит именно данные. несмотря на название 
  } catch (error) {
    console.error(error);
    throw error;
  }
};


// Поиск клиента по телефону
const searchClient = async (phone, token) => {
  if (!phone) return [];
  if (phone === '+79990000000') {
    return [{ id: 999, short_name: 'ООО Пример', full_name: 'ООО Пример', phone: '+79990000000' }];
  }
  try {
    const data = await callProxy(`${API_ENDPOINTS.CONTRAGENTS}?phone=${encodeURIComponent(phone)}`, 'GET', token);
    if (data && Array.isArray(data.result)) return data.result;
    if (Array.isArray(data)) return data;
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Загрузка справочников (возвращает объект с данными)
const loadDirectories = async (token) => {
  const [orgs, warehouses, payboxes, priceTypes, nomenclature] = await Promise.all([
    callProxy(API_ENDPOINTS.ORGANIZATIONS, 'GET', token),
    callProxy(API_ENDPOINTS.WAREHOUSES, 'GET', token),
    callProxy(API_ENDPOINTS.PAYBOXES, 'GET', token),
    callProxy(API_ENDPOINTS.PRICE_TYPES, 'GET', token),
    callProxy(API_ENDPOINTS.NOMENCLATURE, 'GET', token),
  ]);

  return {
    organizations: orgs?.result ?? orgs ?? [],
    warehouses: warehouses?.result ?? warehouses ?? [],
    payboxes: payboxes?.result ?? payboxes ?? [],
    priceTypes: priceTypes?.result ?? priceTypes ?? [],
    nomenclature: nomenclature?.result ?? nomenclature ?? [],
  };
};

// Отправка заказа
const submitOrder = async (orderData, token) => {
  try {
    const data = await callProxy(API_ENDPOINTS.CREATE_SALE, 'POST', token, orderData);
    return data;
  } catch (error) {
    console.error('Ошибка при создании заказа', error);
    throw error;
  }
};

// Поиск товаров
const searchNomenclature = async (name, token) => {
  if (!name) return [];
  try {
    const url = `${API_ENDPOINTS.NOMENCLATURE}?name=${encodeURIComponent(name)}`;
    const data = await callProxy(url, 'GET', token);
    const items = data?.result ?? data ?? [];
    return (Array.isArray(items) ? items : []).map(item => ({
      ...item,
      price: item.prices?.[0]?.price ?? 100,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};


export { searchClient, loadDirectories, submitOrder, sendToken, searchNomenclature };