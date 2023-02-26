import React = require("react");
import styled from "styled-components";
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import { Close } from "../close";

interface WindowProps {
  title: string;
}

const Window = ({ title }: WindowProps) => {

  return (
    <Container>
      <Header>
        <Tab>
          <Title>{ title }</Title>
          <CloseIcon>
            <Close />
          </CloseIcon>
        </Tab>
      </Header>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  background-color: #333333;
  height: 520px;
  width: 390px;
  border-radius: 4px;
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

export default Window;