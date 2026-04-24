'use client';

import { useDispatch, useSelector } from 'react-redux';

import { searchClientsByPhone, selectClient } from '@/store/clientSlice';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Phone, Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const SearchClient = () => {
  const dispatch = useDispatch();
  const { searchResults, selectedClient, isLoading, error } = useSelector((state) => state.client);

  // Создаем форму
  // Валидация номера телефона
  const phoneSchema = z.object({
    tel: z.string()
      .length(12, "Номер должен содержать ровно 12 символов")
      .regex(/^\+\d{11}$/, "Номер должен быть в формате +79990000000"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = (data) => {
    const { tel } = data;
    if (tel && tel.trim()) {
      dispatch(searchClientsByPhone(tel));
    }
  };

  const handleSelectClient = (event) => {
    const client = JSON.parse(event.target.value);
    dispatch(selectClient(client));
  };

  return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <h2 className="text-lg font-semibold">2. Клиент</h2>
            </div>
            <p className='text-gray-500 font-normal'>Поиск клиента по телефону</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <label htmlFor="tel" className="text-sm font-medium">Телефон</label>
            <div className="flex gap-2">
              <input
                id="tel"
                {...register('tel')}
                placeholder="+79990000000"
                className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400/50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-md hover:bg-red-600 flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            {errors.tel && <p className="text-red-500 text-sm">{errors.tel.message}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            {/* индикатор загрузки */}
            {isLoading && <p>Поиск клиента...</p>}

            {/* Выпадающий список или отображение выбранного клиента */}
            {searchResults.length === 0 && (
              <div>
                <label className="text-sm font-medium">Найденный клиент</label>
                <input
                  type="text"
                  value="Клиент не найден"
                  disabled
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
              </div>
            )}

            {searchResults.length === 1 && (
              <div>
                <label className="text-sm font-medium">Выбранный клиент</label>
                <input
                  type="text"
                  value={`${searchResults[0].short_name || searchResults[0].full_name} (${searchResults[0].phone})`}
                  disabled
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
              </div>
            )}

            {searchResults.length > 1 && (
              <div>
                <label htmlFor="clientSelect" className="text-sm font-medium">Выберите клиента</label>
                <select
                  id="clientSelect"
                  onChange={handleSelectClient}
                  className="w-full px-3 py-2 border rounded-md"
                  defaultValue=""
                >
                  <option value="" disabled>-- Выберите --</option>
                  {searchResults.map(client => (
                    <option key={client.id} value={JSON.stringify(client)}>
                      {client.short_name || client.full_name} ({client.phone})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedClient && searchResults.length !== 1 && (
              <div>
                <label className="text-sm font-medium">Выбранный клиент</label>
                <input
                  type="text"
                  value={`${selectedClient.short_name || selectedClient.full_name} (${selectedClient.phone})`}
                  disabled
                  className="w-full px-3 py-2 border rounded-md bg-gray-100"
                />
              </div>
            )}
          </form>
        </CardContent>
      </Card>
  );
};

export default SearchClient;