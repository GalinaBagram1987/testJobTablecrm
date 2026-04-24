import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/orderSlice';
import { searchNomenclature } from '@/lib/api/apiMethods';
import { Plus, Box } from 'lucide-react'
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
  const [ isLoading, setLoading ] = useState(false); // флаг загрузки результатов поиска

  const handleSeach = async () => {
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
            <Plus className="w-5 h-5" />
            <h2 className="text-lg font-semibold">4. Товары</h2>
            </div>
            <p className='text-gray-500 font-normal'>Поиск и добавление номенклатуры</p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск товара по названию"
                className="w-full px-3 py-2 border rounded-md"
              />
            <button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Поиск...' : 'Найти'}
            </button>

          {results.length === 0 && !isLoading && <p>Товары не найдены</p>}
          {results.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
            <span>{item.name} – {item.price} ₽</span>
            <button onClick={() => handleAdd(item)} className="bg-blue-500 text-white px-2 py-1 rounded">
              Добавить
            </button>
          </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductsSeach

