import { useEffect, useRef, useState } from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import "./styles.css";
import { COMMAND } from './constants';
import { CustomFile, GetFile } from '../types';
import styled from 'styled-components';
import React = require('react');
import { Target, useGesture, useWheel } from '@use-gesture/react';
import { Window } from './components/window';
import { mapFiles, supportedTypes } from './utils';
import InfiniteViewer from 'react-infinite-viewer';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const [{ scale, translateX, translateY, originX, originY }, setTransform] = React.useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
    originX: 0,
    originY: 0,
  });
  const [cursor, setCursor] = React.useState('auto');
  const [files, setFiles] = React.useState<CustomFile[]>([]);
  const container = useRef(null);

  useEffect(() => {
    messageHandler.request<GetFile[]>(COMMAND.GET_FILES).then((data) => {
      const mappedFiles: CustomFile[] = mapFiles(data);
      setFiles(mappedFiles);
    });
  }, []);

  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());

  const bind = useGesture({
    onDrag: ({ delta: [dx, dy], event }) => {      
      if (event.currentTarget !== event.target) {
        return;
      }
      setTransform((prev) => ({
        scale: prev.scale, //Math.max(prev.scale + dy / 100, 0.1),
        translateX: prev.translateX + dx,
        translateY: prev.translateY + dy,
        originX: prev.originX,
        originY: prev.originY,
      }));
    },
    onPinch: ({ offset: [d], origin, event,  }) => {
      if (event.currentTarget !== event.target) {
        return;
      }
      console.log('origin', origin);
      
      setTransform((prev) => ({
        scale: d,//Math.max(prev.scale + dy / 100, 0.1),
        translateX: prev.translateX,
        translateY: prev.translateY,
        originX: origin[0],
        originY: origin[1]
      }));
    },
    onDragStart: ({event}) => {     
      if (event.currentTarget !== event.target) {
        return;
      }
      setCursor('grabbing');
    },
    onDragEnd: ({event}) => {
      if (event.currentTarget !== event.target) {
        return;
      }
      setCursor('auto');
    },
  }, {
    target: container,
    eventOptions: {passive: true}
  });  



  const children = files.map((file, i) => {
    return (
      <Window 
        key={String(i)} 
        title={file.name} 
        content={file.content} 
        fileType={file.type} 
      />
    );
  });

  // const children = asdf.map((window, i) => {
  //   return (
  //     <React.Fragment key={i}>
  //       {window}
  //     </React.Fragment>
  //   );
  // });
  console.log('files', files);
  
  console.log('children', children);

  if (children.length === 0) {
    return <></>;
  }
  
  return (
    <Container>
      <InfiniteViewer 
        className="viewer" 
        displayHorizontalScroll={false}
        displayVerticalScroll={false}
        useAutoZoom
      >
         {/* {
          files.length > 0 && files.map((file, i) => {
            return (
              <Window 
                key={String(i)} 
                title={file.name} 
                content={file.content} 
                fileType={file.type} 
              />
            );
          })
        } */}

        {children}
        {/* <Window 
          key={'asd'} 
          title={'asdf'} 
          content={'.'} 
          fileType={'css'} 
        /> */}
        {/* <div style={{ backgroundColor: "red", height: 200, width: 200 }}>
          AA
        </div> */}
      </InfiniteViewer>
    </Container>
    // <Container>
    //   <SottoContainer>
    //     <InfiniteViewer className="viewer" style={{height: 200}}>
    //     <div style={{ backgroundColor: "red", height: 200, width: 200 }}>
    //           AA
    //         </div>
    //       {/* <Asdf>
    //         AA
    //       </Asdf> */}
    //     </InfiniteViewer>
    //   </SottoContainer>

    // </Container>
  );

  // return ( // {...bind()} style={{ cursor }}
  //   <Container ref={container} style={{ cursor }}  >
  //     <Canvas 
  //       scale={scale} 
  //       translateX={translateX} 
  //       translateY={translateY}
  //       originX={originX}
  //       originY={originY}
  //     >
  //       {
  //         files.length > 0 && files.map((file, i) => {
  //           return (
  //             <Window 
  //               key={String(i)} 
  //               title={file.name} 
  //               content={file.content} 
  //               fileType={file.type} 
  //             />
  //           );
  //         })
  //       }
  //     </Canvas>
  //   </Container>
  // );
};

const Asdf = styled.div`
  background-color: red;
  height: 200px;
  width: 200px;
`;

const Canvas = styled(InfiniteViewer)`
  border: 2px solid red;
`;

const SottoContainer = styled.div`
  border: solid 1px red;
  height: 400px;
  width: 400px;
`;

const Container = styled.div`
  display: flex;
  background-color: white;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  border: 1px solid green;
`;

// const Container = styled.div`
//   position: fixed;
//   height: 100%;
//   width: 100%;
//   top: 0px;
//   left: 0px;
//   background-color: #1e1e1e;
//   touch-action: none;
// `;

interface CanvasProps {
  scale: number;
  translateX: number;
  translateY: number;
  originX: number;
  originY: number;
}

// const Canvas = styled.div<CanvasProps>`
//   position: absolute;
//   will-change: transform;
//   /* transform-origin: 0 0; */
//   transform: 
//     scale(${(props) => props.scale}) 
//     translate(${(props) => props.translateX}px, ${(props) => props.translateY}px);
//   transform-origin: ${(props) => `${props.originX}px ${props.originY}px`};
// `;



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