import { useEffect } from 'react';
import { messageHandler } from '@estruyf/vscode/dist/client';
import "./styles.css";
import { COMMAND, MENU_ITEMS } from './constants';
import { CustomFile, GetFile, MenuItem } from '../types';
import styled from 'styled-components';
import React = require('react');
import { Window } from './components/window';
import { calcTranslate, fileWindowPosition, mapFiles } from './utils';
import InfiniteViewer from 'react-infinite-viewer';
import useContextMenu from 'use-context-menu';
import { Menu } from './components/menu';

export interface IAppProps { }

export const App: React.FunctionComponent<IAppProps> = ({ }: React.PropsWithChildren<IAppProps>) => {
  const menu = React.useRef(null);
  const infiniteViewer = React.useRef<InfiniteViewer | null>(null);
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
      const postMessage = event.data;

      if (postMessage.command === COMMAND.SEARCH) {
        const file = postMessage.payload as CustomFile;
        const fileWindow = document.getElementById(file.path);
        if (fileWindow) {
          const { x, y } = fileWindowPosition(fileWindow);
          if (infiniteViewer.current) {
            infiniteViewer?.current.scrollTo(x, y, {
              duration: 350
            });
          }
        }
      }
    });
  }, []);

  const handleOnMenuClick = (item: MenuItem) => {
    switch (item.value) {
      case COMMAND.SEARCH:
        messageHandler.send(COMMAND.SEARCH, { data: files });
        return;
      case COMMAND.CREATE_FILE:
        // do things
        return;
    }
  };

  const children = files.map((file, i) => {
    return (
      <Window
        containerId={file.path}
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
        ref={infiniteViewer}
        className="viewer"
        displayHorizontalScroll={false}
        displayVerticalScroll={false}
        useAutoZoom={true}
        useWheelScroll={true}
        wheelPinchKey='ctrl'
        // dragging via mouse wheel
        useMouseDrag={true}
        preventWheelClick={false}
        onDragStart={
          (e) => {
            // only allow wheel
            if (e.inputEvent.button !== 1) {
              e.stop();
              return;
            }
            setCursor('grabbing');
          }
        }
        onDragEnd={() => setCursor('auto')}
      >
        <div className="viewport">
          {children}
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