import React = require("react");
import styled from "styled-components";
import { Close } from "../close";
import MonacoEditor from "@monaco-editor/react";
import MoveableHelper from "moveable-helper";
import {
  makeMoveable,
  DraggableProps,
  ScalableProps,
  RotatableProps,
  Draggable,
  Scalable
} from "react-moveable";
import { editor } from "monaco-editor";

interface WindowProps {
  containerId: string;
  title: string;
  content: string;
  fileType: string;
  style?: React.CSSProperties;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const Moveable = makeMoveable<DraggableProps & ScalableProps & RotatableProps>([
  Draggable,
  Scalable,
]);


const Window = ({ containerId, title, content, fileType, style, onDragStart, onDragEnd }: WindowProps) => {
  const [helper] = React.useState(() => {
    return new MoveableHelper();
  });
  const [focused, setFocused] = React.useState(false);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const editorRef = React.useRef<any>(null);
  const headerRef = React.useRef<any>(null);

  const didMount = (editor: editor.IStandaloneCodeEditor) => {
    setFocused(true);
    editor.focus();
    editorRef.current = editor;
  };

  return (
    <Wrapper
      onMouseOut={() => setFocused(false)}
      onMouseDown={() => setFocused(true)}
      onDragEnd={() => setFocused(false)}
      onClick={() => {
        setFocused(true);
        editorRef.current?.focus();
      }}
      onDrag={(e) => {
        setFocused(true);
        e.stopPropagation();
      }}
    >
      <Container
        id={containerId}
        ref={targetRef}
        className="viewport"
        style={{ ...style, zIndex: focused ? '999' : '1' }}

      >
        <Header ref={headerRef}>
          <Tab>
            <Title>{title}</Title>
            <CloseIcon>
              <Close />
            </CloseIcon>
          </Tab>
        </Header>
        <Editor
          theme="vs-dark"
          onMount={(editor) => didMount(editor)}
          defaultLanguage={fileType}
          defaultValue={content}
          height={580}
          width={480}
          options={
            {
              minimap: {
                enabled: false
              },
              tabFocusMode: true,
              readOnly: false,
              peekWidgetDefaultFocus: 'editor',
            }
          }
        />
      </Container>
      <Moveable
        target={targetRef}
        draggable={true}
        scalable={true}
        keepRatio={true}
        onDragStart={
          (e) => {
            onDragStart();
            helper.onDragStart(e);
          }
        }
        onDrag={(e) => {
          setFocused(true);
          helper.onDrag(e);
        }}
        onDragEnd={() => onDragEnd()}
        onScaleStart={helper.onScaleStart}
        onScale={(e) => {
          setFocused(true);
          helper.onScale(e);
        }}
        hideChildMoveableDefaultLines={true}
        hideDefaultLines={true}
        dragTarget={headerRef.current}
        stopPropagation={true}
        preventClickDefault={true}
        preventClickEventOnDrag={true}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  position: absolute;
  /* border: 1px solid red; */
  background-color: #333333;
  border-radius: 4px;
  margin: 20px;
`;

const Header = styled.div`
  background-color: #20202177;
  width: 100%;
  /* border: 1px solid red; */
  height: 7%;
`;

const Tab = styled.div`
  background-color: #333333;
  width: 45%;
  height: 100%;
  /* border: 1px solid wheat; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const CloseIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  padding-right: 4px;
  &:hover{
    cursor: pointer;
  }
`;

const Title = styled.span`
  padding-left: 8px;
`;

const Editor = styled(MonacoEditor)`
  background-color: #333333;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
  /* border: 1px solid yellow; */
`;

export default Window;