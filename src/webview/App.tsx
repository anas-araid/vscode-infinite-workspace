import { useEffect } from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import "./styles.css";
import { COMMAND, MENU_ITEMS } from './constants';
import { CustomFile, GetFile, MenuItem } from '../types';
import styled from 'styled-components';
import React = require('react');
import { Window } from './components/window';
import { calcTranslate, mapFiles } from './utils';
import InfiniteViewer from 'react-infinite-viewer';
import useContextMenu from 'use-context-menu';
import { Menu } from './components/menu';

export interface IAppProps { }

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const menu = React.useRef(null);
  const { document: doc } = useContextMenu({ menu });

  const [cursor, setCursor] = React.useState('auto');
  const [files, setFiles] = React.useState<CustomFile[]>([]);

  useEffect(() => {
    messageHandler.request<GetFile[]>(COMMAND.GET_FILES).then((data) => {
      const mappedFiles: CustomFile[] = mapFiles(data);

      setFiles(mappedFiles);
    });
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    window.addEventListener('message', event => {
      const message = event.data;

      if (message.command === COMMAND.SEARCH) {
        // do something with the data
        console.log('event', event);

      }
    });
  }, []);

  // document.addEventListener('gesturestart', (e) => e.preventDefault());
  // document.addEventListener('gesturechange', (e) => e.preventDefault());

  const handleOnMenuClick = (item: MenuItem) => {
    console.log('item', item);
    switch (item.value) {
      case COMMAND.SEARCH:
        messageHandler.send(COMMAND.SEARCH, { data: files });
        // messageHandler.request<string>(COMMAND.SEARCH).then((data) => {
        //   console.log('data', data);
        // });
        return;
      case COMMAND.CREATE_FILE:
        // do things
        return;
    }
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
    <Container style={{ cursor }}>
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
        {doc?.isOpen && (
          <Menu ref={menu} items={MENU_ITEMS} onClick={handleOnMenuClick}></Menu>
        )}

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