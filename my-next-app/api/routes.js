export const BASE_URL = 'https://app.tablecrm.com/api/v1/';

export const API_ENDPOINTS = {
  // Справочники (загружаются после подключения кассы)
  ORGANIZATIONS: '/organizations',       // Получить список организаций
  WAREHOUSES: '/warehouses',             // Получить список складов
  PAYBOXES: '/payboxes',                 // Получить список счетов/касс
  PRICE_TYPES: '/price_types',           // Получить список типов цен
  NOMENCLATURE: '/nomenclature',         // Получить список товаров (номенклатуру)

  // Поиск и данные по клиентам
  CONTRAGENTS: '/contragents',           // Получить список клиентов (контрагентов)

  // Создание продажи
  CREATE_SALE: '/docs_sales',            // Создать продажу (POST-за
}