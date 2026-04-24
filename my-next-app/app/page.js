import Image from "next/image";
import Header from '@/components/Header'
import SeachClient from "@/components/SeachClient";
import SaleParameters from "@/components/SaleParameters";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full max-w-md mx-auto space-y-8">
          <Header />
          <SeachClient />
          <SaleParameters />
        </div>
      </main>
    </div>
  );
}
