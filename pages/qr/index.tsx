


import React, { useState } from 'react';
// import QRScanner from './QRScanner';

function App() {
  const [result, setResult] = useState('');

  const handleScan = (code: string) => {
    setResult(code);
  };

  return (
    <div>
      {/* <QRScanner onScan={handleScan} /> */}
      {result && <div>扫描结果：{result}</div>}
    </div>
  );
}

export default App;
