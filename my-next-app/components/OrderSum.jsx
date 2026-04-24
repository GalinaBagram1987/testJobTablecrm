'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { submitOrder } from '@/store/orderSlice';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { totalSum, cart, isSubmitting, selectedOrganization, selectedWarehouse, selectedPaybox, selectedPriceType } = useSelector((state) => state.order);
  const { selectedClient } = useSelector((state) => state.client);

  const canSubmit = cart.length > 0 && selectedOrganization && selectedWarehouse && selectedPaybox && selectedPriceType && selectedClient;

  const handleSubmit = (conduct = false) => {
    if (canSubmit) dispatch(submitOrder(conduct));
  };

  return (
    <Card className="shadow-md">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Итого:</span>
          <span className="text-2xl font-bold">{totalSum} </span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pb-6">
        <Button
          onClick={() => handleSubmit(false)}
          disabled={!canSubmit || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Отправка...' : 'Создать продажу'}
        </Button>
        <Button
          onClick={() => handleSubmit(true)}
          disabled={!canSubmit || isSubmitting}
          className="w-full"
          variant="outline"
        >
          {isSubmitting ? 'Отправка...' : 'Создать и провести'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
