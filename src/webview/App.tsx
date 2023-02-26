import { useEffect, useRef, useState } from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import "./styles.css";
import { COMMAND } from './constants';
import { GetFile } from '../types';
import styled from 'styled-components';
import React = require('react');
import { Target, useGesture, useWheel } from '@use-gesture/react';
import { Window } from './components/window';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const [{ scale, translateX, translateY }, setTransform] = React.useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });
  const [cursor, setCursor] = React.useState('auto');

  // const ref = useRef<any>();
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());
  // useWheel(
  //   ({ delta: [dx, dy], event, target: ref })  => {
  //     event.preventDefault();
  //     if (event.type === 'wheel') {
  //       // console.log('dx', dx);
  //       // console.log('dy', dy);
        
  //       setTransform((prev) => ({
  //         scale: Math.max(prev.scale + dy / 100, 0.1),
  //         translateX: prev.translateX + (dx * -1),
  //         translateY: prev.translateY + (dy * -1),
  //       }));
  //     }
  //   },
  //   // we need to use a ref to be able to get non passive events and be able
  //   // to trigger event.preventDefault()
  //   { target: ref, eventOptions: { passive: false } }
  // );
  
  const bind = useGesture({
    // onWheel: ({ delta: [dx, dy], event }) => {
    //   event.preventDefault();
    //   if (event.type === 'wheel') {
    //     // console.log('dx', dx);
    //     // console.log('dy', dy);
    
    //     setTransform((prev) => ({
    //       scale: Math.max(prev.scale + dy / 100, 0.1),
    //       translateX: prev.translateX ,
    //       translateY: prev.translateY,
    //     }));
    //   }
    // },
    onDrag: ({ delta: [dx, dy] }) => {
      setTransform((prev) => ({
        scale: prev.scale, //Math.max(prev.scale + dy / 100, 0.1),
        translateX: prev.translateX + dx,
        translateY: prev.translateY + dy,
      }));
    },
    onPinch: ({ offset: [d] }) => {
      // if (event.type !== 'touchstart' && event.type !== 'wheel') {
      //   console.log('movement', movement);

      // }
      setTransform((prev) => ({
        scale: d,//Math.max(prev.scale + dy / 100, 0.1),
        translateX: prev.translateX,
        translateY: prev.translateY,
      }));
    },
    onDragStart: () => {
      setCursor('grabbing');
    },
    onDragEnd: () => {
      setCursor('auto');
    },
      
    //   // setscale((prevscale) => prevscale + offsetScale);
  });

  // const bind = useGesture({
  //   onWheel: ({  }) => {

  //   }
    // onPinch: ({ offset: [d] }) => {
    //   console.log('d', d);
      
    //   set(({ scale }) => ({ scale: scale * d }));
    // },
    // onPinchEnd: () => {
    //   set({ scale: 1});
    // },
  // });

  return ( // {...bind()} style={{ cursor }}
    <Container style={{ cursor }} {...bind()} >
      <Canvas scale={scale} translateX={translateX} translateY={translateY}>
        <Window title='index.ts'></Window>
      </Canvas>
    </Container>
  );
};


const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  background-color: #1e1e1e;
`;

interface CanvasProps {
  scale: number;
  translateX: number;
  translateY: number;
}

const Canvas = styled.div<CanvasProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform-origin: 0 0;
  transform: scale(${(props) => props.scale}) translate(${(props) => props.translateX}px, ${(props) => props.translateY}px);
`;




 // const [message, setMessage] = React.useState<string>("");
  // const [error, setError] = React.useState<string>("");

  // const sendMessage = () => {
  //   messageHandler.send('POST_DATA', { msg: 'Hello from the webview' });
  // };

  // const requestData = () => {
  //   messageHandler.request<string>('GET_DATA').then((msg) => {
  //     setMessage(msg);
  //   });
  // };

  // const requestWithErrorData = () => {
  //   messageHandler.request<string>('GET_DATA_ERROR')
  //   .then((msg) => {
  //     setMessage(msg);
  //   })
  //   .catch((err) => {
  //     setError(err);
  //   });
  // };



{/* <h1>Hello from the React Webview Starter</h1>

<div className='app__actions'>
  <button onClick={sendMessage}>
    Send message to extension
  </button>

  <button onClick={requestData}>
    Get data from extension
  </button>

  <button onClick={requestWithErrorData}>
    Get data with error
  </button>
</div>

{message && <p><strong>Message from the extension</strong>: {message}</p>}

{error && <p className='app__error'><strong>ERROR</strong>: {error}</p>} */}