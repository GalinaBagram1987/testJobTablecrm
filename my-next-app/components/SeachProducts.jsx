'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/orderSlice';
import { searchNomenclature } from '@/lib/api/apiMethods';
import { Box } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProductsSeach = () => {
  const dispatch = useDispatch();
  const [ query, setQuery ] = useState('');
  const [ results, setResults ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false); // флаг загрузки результатов поиска

  const handleSearch = async () => {
     if (!query.trim()) return;
    setIsLoading(true);
    try {
      const data = await searchNomenclature(query);
      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

   const handleAdd = (item) => {
    dispatch(addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,          // или quantity: action.payload.quantity
      unit: item.unit,      // значение из справочника
      discount: 0,          // по умолчанию
    }));
  };

  return (
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="space-y-2">
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5" />
          <h2 className="text-lg font-semibold">4. Товары</h2>
        </div>
        <p className="text-gray-500 font-normal">Поиск и добавление номенклатуры</p>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Поиск товара по названию"
          className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400/50"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? 'Поиск...' : <Search className="w-5 h-5" />}
        </button>
      </div>

      <div className="w-full px-3 py-2 border rounded-md min-h-[200px]">
        {results.length === 0 && !isLoading && (
          <p className="text-gray-500">Товары не найдены</p>
        )}
        {results.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <span>{item.name} – {item.price || 100} ₽</span>
            <button
              onClick={() => handleAdd(item)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Добавить
            </button>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
}
// ищем Тестовый товар, Тест, тест, Тест0000
export default ProductsSeach

