'use client';

import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Trash2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { removeItem } from '@/store/orderSlice';

const CartProducts = () => {
  const dispatch = useDispatch();
  const { cart, totalSum } = useSelector((state) => state.order);
  
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  return (
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="space-y-2">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Корзина</h2>
        </div>
        <p className="text-gray-500 font-normal">Количество, цена и сумма по позициям</p>
      </CardTitle>
    </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full px-3 py-2 border rounded-md min-h-[200px]">
          {cart.length === 0 && (
            <p className="text-gray-500">Добавьте хотя бы один товар</p>
          )}
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <span>{item.name} – {item.price} ₽ x {item.quantity}</span>
              <button
                onClick={() => handleRemove(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
    </CardContent>
  </Card>
);
}
export default CartProducts

