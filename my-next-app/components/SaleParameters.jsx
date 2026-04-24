'use client';

import { useDispatch, useSelector } from 'react-redux';
import { 
  setOrganization, setWarehouse, setPaybox, setPriceType 
} from '@/store/orderSlice';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SaleParameters = () => {
  const dispatch = useDispatch();
	const { organizations, warehouses, payboxes,  priceTypes, nomenclature, loading, error } = useSelector((state) => state.directories);
  const { selectedOrganization, selectedWarehouse, selectedPaybox, selectedPriceType } = useSelector(state => state.order);

	return(
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg">3. Параметры продажи</h2>
          </div>
          <p className='text-gray-500 font-normal'>Счёт, организация, склад и тип цены</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Организация */}
        <div>
          <label className="text-sm font-medium">Организация</label>
          <select
            value={selectedOrganization || ''}
            onChange={(e) => dispatch(setOrganization(Number(e.target.value)))}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Выберите организацию</option>
            {organizations?.map(org => (
              <option key={org.id} value={org.id}>
                {org.short_name || org.full_name}
              </option>
            ))}
          </select>
        </div>

				{/* Счёт / Касса */}
        <div>
          <label className="text-sm font-medium">Счёт / Касса</label>
          <select
            value={selectedPaybox || ''}
            onChange={(e) => dispatch(setPaybox(Number(e.target.value)))}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Выберите счёт</option>
            {payboxes?.map(pb => (
              <option key={pb.id} value={pb.id}>
                {pb.name}
              </option>
            ))}
          </select>
        </div>

        {/* Склад */}
        <div>
          <label className="text-sm font-medium">Склад</label>
          <select
            value={selectedWarehouse || ''}
            onChange={(e) => dispatch(setWarehouse(Number(e.target.value)))}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Выберите склад</option>
            {warehouses?.map(wh => (
              <option key={wh.id} value={wh.id}>
                {wh.name || wh.short_name}
              </option>
            ))}
          </select>
        </div>

        
        {/* Тип цены */}
        <div>
          <label className="text-sm font-medium">Тип цены</label>
          <select
            value={selectedPriceType || ''}
            onChange={(e) => dispatch(setPriceType(Number(e.target.value)))}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Выберите тип цены</option>
            {priceTypes?.map(pt => (
              <option key={pt.id} value={pt.id}>
                {pt.name}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
	)
};

export default SaleParameters