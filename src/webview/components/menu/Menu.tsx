import React = require("react");
import styled from "styled-components";
import { MenuItem } from "../../../types";

interface MenuProps {
  items: MenuItem[];
  onClick: (item: MenuItem) => void;
}

const Menu = React.forwardRef(({ items, onClick }: MenuProps, ref) => (
  <Container ref={ref as React.RefObject<HTMLUListElement>}>
    {items.map(({ label, value }) => (
      <li key={value} onClick={() => onClick({ label, value })}>
        {label}
      </li>
    ))}
  </Container>
));

export default Menu;


export const Container = styled.ul`
  position: fixed;
  border: none;
  background: #333333;
  border-radius: 3px;
  padding: 0;
  margin: 0;
  list-style-type: none;
  z-index: 9999;
  cursor: pointer;
  li {
    color: #fff;
    padding: 10px 18px;
    text-align: left;
    font-size: 13px;
    &:hover {
      background: #4e4e4e;
    }
  }
`;