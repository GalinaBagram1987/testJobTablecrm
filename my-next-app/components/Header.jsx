'use client';

import { useDispatch, useSelector } from 'react-redux';
import { storage } from '@/utils/localStorage';
import { connectCashier } from '../store/cashierSlice';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlugZap, Phone, Plus, Box, ShoppingCart } from 'lucide-react';
import * as React from "react"
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const Header = () => {
  // достаем данные из нашего сторе
  const dispatch = useDispatch();
  const { isConnected, isLoading, error } = useSelector((state) => state.cashier);

  // При загрузке страницы, если в localStorage есть токен, автоматически подключаемся
  useEffect(() => {
    const savedToken = storage.getToken(); // можно импортировать storage
    if (savedToken && !isConnected && !isLoading) {
      dispatch(connectCashier(savedToken));
    }
  }, [dispatch, isConnected, isLoading]);

  // Создаем форму
  // Валидация
  const tokenSchema = z.object({
  token: z.string().min(1, "Токен обязателен"),
  });
  //управление формой
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(tokenSchema),
  });

  const onSubmit = (data) => {
    console.log('onSubmit called with data:', data);
    const { token } = data;
    if (token && token.trim()) {
      dispatch(connectCashier(token));
    }
  };

  return (
    <div className="space-y-8">
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="font-serif text-gray-500 font-thin text-xl uppercase text-muted-foreground tracking-widest transform scale-y-[0.7]">tablecrm.com</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="font-serif text-2xl font-bold">Мобильный заказ</h1>
        <p className="font-serif text-gray-500 mt-1">WebApp для создания продажи и проведения в один клик.</p>
        <p className={`font-serif text-black mt-2 inline-flex px-2 py-1 rounded text-xs ${
          isConnected ? 'bg-green-100' : 'bg-red-100'
          }`}>Касса{isConnected ? ' подключена' : ' не подключена'}</p>
      </CardContent>
    </Card>
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="space-y-2">
          <div className="flex items-center gap-2">
            <PlugZap className="w-5 h-5" />
            <h2 className="text-lg font-semibold">1. Подключение кассы</h2>
            </div>
          <p className='text-gray-500 font-normal'>Введите токен и загрузите справочники</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <label htmlFor="token" className="text-sm font-medium">
            Token
          </label>
          <input
            {...register('token')}
            placeholder="Введите token кассы "
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-red-400/50"
          />
          {errors.token && <p className="text-red-500 text-sm">{errors.token.message}</p>}
          <button type="submit" className="w-full bg-red-500 text-white text-sm font-bold py-2 rounded-md hover:bg-red-600">
             {isLoading ? 'идет подключение' : 'подключить'}
          </button>
        </form>
      </CardContent>
    </Card>
    </div>
  ) 
}

export default Header