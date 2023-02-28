import React = require("react");
import styled from "styled-components";
import { Close } from "../close";
import MonacoEditor from "@monaco-editor/react";

interface WindowProps {
  key: string;
  title: string;
  content: string;
  fileType: string;
}

const Window = ({ key, title, content, fileType }: WindowProps) => {

  return (
    <Container id={key} onMouseDown={e => e.stopPropagation()}>
      <Header>
        <Tab>
          <Title>{ title }</Title>
          <CloseIcon>
            <Close />
          </CloseIcon>
        </Tab>
      </Header>
      <Editor
        theme="vs-dark"
        defaultLanguage={fileType}
        defaultValue={content}
        options={
         { 
          minimap: {
            enabled: false
          }
        }
        }
      />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-color: #333333;
  height: 580px;
  width: 480px;
  border-radius: 4px;
  margin: 20px;
  z-index: 100px;
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
  height: 100%;
`;

export default Window;