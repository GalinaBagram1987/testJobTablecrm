'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { setComment } from '@/store/orderSlice';


const Comment = () => {
  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.order);

  return (
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="space-y-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold">Комментарий</h2>
      </CardTitle>
    </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Комментарий к заказу (необязательно)"
          value={comment}
          onChange={(e) => dispatch(setComment(e.target.value))}
          className="w-full"
        />
    </CardContent>
  </Card>
);
}
export default Comment

