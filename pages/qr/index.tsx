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


import { Scanner } from '@yudiel/react-qr-scanner';

const App = () => {
    return (
        <Scanner
            onResult={(text, result) => console.log(text, result)}
            onError={(error) => console.log(error?.message)}
        />
    );
}

export default App;
