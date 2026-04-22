import { useDispatch, useSelector } from 'react-redux';
import { connectCashier } from '../store/cashierSlice';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from 'axios';

const Header = () => {
  const dispatch = useDispatch();
  const { isConnected, isLoading, error } = useSelector((state) => state.cashier);
  const [inputToken, setInputToken] = useState('');

  const handleConnect = () => {
    if (!inputToken.trim()) return;
    dispatch(connectCashier(inputToken));
  };

  // При загрузке страницы, если в localStorage есть токен, автоматически подключаемся
  useEffect(() => {
    const savedToken = storage.getToken(); // можно импортировать storage
    if (savedToken && !isConnected && !isLoading) {
      dispatch(connectCashier(savedToken));
    }
  }, [dispatch, isConnected, isLoading]);
  return (
    <Card className="max-w-md mx-auto my-8 shadow-md">
      <CardHeader>
        <CardTitle className="font-serif text-gray-500 font-thin text-xl uppercase text-muted-foreground tracking-widest transform scale-y-[0.7]">tablecrm.com</CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="font-serif text-2xl font-bold">Мобильный заказ</h1>
        <p className="font-serif text-gray-500 mt-1">WebApp для создания продажи и проведения в один клик.</p>
        <p className={`font-serif text-black mt-2 inline-flex px-2 py-1 rounded text-xs text-black${
          isConnected ? 'bg-red-100' : 'bg-green-100'
          }`}>Касса{isConnected ? ' подключена' : ' не подключена'}</p>
      </CardContent>
    </Card>
  ) 
}

export default Header