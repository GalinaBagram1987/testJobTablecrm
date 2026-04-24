import Header from '@/components/Header'
import SeachClient from "@/components/SeachClient";
import SaleParameters from "@/components/SaleParameters";
import ProductsSeach from "@/components/SeachProducts";
import Cart from '@/components/Cart';
import Comment from '@/components/CommentedFile';
import OrderSummary from '@/components/OrderSum';


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full max-w-md mx-auto space-y-8">
          <Header />
          <SeachClient />
          <SaleParameters />
          <ProductsSeach />
          <Cart />
          <Comment />
          <div className="fixed bottom-0 left-0 right-0 z-10  bg-card shadow-md border-t">
          <div className="w-full max-w-md mx-auto px-4"> {/* Контейнер для центрирования содержимого */}
            <OrderSummary />
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
