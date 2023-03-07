import { useEffect } from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import "./styles.css";
import { COMMAND } from './constants';
import { CustomFile, GetFile } from '../types';
import styled from 'styled-components';
import React = require('react');
import { Window } from './components/window';
import { mapFiles } from './utils';
import InfiniteViewer from 'react-infinite-viewer';
// import { Menu } from './components/menu';

export interface IAppProps {}

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const [cursor, setCursor] = React.useState('auto');
  const [files, setFiles] = React.useState<CustomFile[]>([]);

  useEffect(() => {
    messageHandler.request<GetFile[]>(COMMAND.GET_FILES).then((data) => {
      const mappedFiles: CustomFile[] = mapFiles(data);
      
      setFiles(mappedFiles);
    });
  }, []);

  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());

  const calcTranslate = (index: number) => {
    //{ transform: `translate(${540 * index}px, 0px)`};
    return {left: `${540 * index}px`};
  };

  const children = files.map((file, i) => {
    return (
      <Window 
        key={String(i)} 
        title={file.name} 
        content={file.content} 
        fileType={file.type}
        style={calcTranslate(i)}
        onDragStart={() => setCursor('grabbing')}
        onDragEnd={() => setCursor('auto')}
      />
    );
  });

  if (children.length === 0) {
    return <></>;
  }
  
  return (
    <Container style={{cursor}}>
      <InfiniteViewer 
        className="viewer" 
        displayHorizontalScroll={false}
        displayVerticalScroll={false}
        useAutoZoom={true}
        useWheelScroll={true}
        wheelPinchKey='ctrl'
        // disable this if you want select text in editor
        useMouseDrag={true}
      >
        <div className="viewport">
          {children}
          {/* <Menu /> */}
        </div>
      </InfiniteViewer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: white;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
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