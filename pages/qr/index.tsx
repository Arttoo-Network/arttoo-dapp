'use client';

// import React, { useState } from 'react';
// import { QrReader } from 'react-qr-reader';

// const Test = (props:any) => {
//   const [data, setData] = useState('No result');

//   return (
//     <>
//       <QrReader
//         onResult={(result: any, error) => {
//           if (!!result) {
//             console.info(result);
//             setData(result?.text);
//           }

//           if (!!error) {
//             console.info(error);
//           }
//         }}
//         constraints={{}}
//       />
//       <p>{data}</p>
//     </>
//   );


// };


// export default Test;


// import { Scanner } from '@yudiel/react-qr-scanner';

import dynamic from 'next/dynamic';

const DynamicScanner: any = dynamic(() => import('@yudiel/react-qr-scanner').then((mod: any) => mod.Scanner), {
  ssr: false,
});

const App = () => {
    return (
        <DynamicScanner
            onResult={(text: any, result: any) => console.log(text, result)}
            onError={(error: any) => console.log(error?.message)}
        />
    );
}

export default App;

