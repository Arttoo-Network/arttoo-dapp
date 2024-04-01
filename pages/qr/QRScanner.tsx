import React, { useEffect } from 'react';
import Quagga from 'quagga'; // 引入QuaggaJS库

function QRScanner(props) {
  useEffect(() => {
    // 初始化QuaggaJS
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#camera') // 获取视频流的DOM元素
      },
      decoder: {
        readers: ['ean_reader'] // 设置识别的二维码格式，这里使用ean_reader，也可以使用其他的格式
      }
    }, (err) => {
      if (err) {
        console.error('QuaggaJS init error', err);
        return;
      }
      Quagga.start(); // 开始扫描二维码
    });

    // 监听Quagga扫描到二维码的事件
    Quagga.onDetected(data => {
      props.onScan(data.codeResult.code); // 将扫描结果传递给父组件
    });

    // 在组件卸载时停止QuaggaJS
    return () => {
      Quagga.stop();
    }
  }, []);

  return (
    <div id="camera" style={{ width: '100%', height: '100%' }}></div> // 显示视频流的DOM元素
  );
}

export default QRScanner;
