'use client';

import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

const DynamicScanner: any = dynamic(() => import('@yudiel/react-qr-scanner').then((mod: any) => mod.Scanner), {
  ssr: false,
});

const App = () => {
  const router = useRouter();

    return (
        <DynamicScanner
            onResult={(text: any, result: any) => {
              console.log(text, result)
              router.push(`${text}`)
            }}
            onError={(error: any) => console.log(error?.message)}
        />
    );
}

export default App;

