import * as React from "react";
import { render } from "react-dom";
import { App } from "./App";

declare const acquireVsCodeApi: <T = unknown>() => {
  getState: () => T;
  setState: (data: T) => void;
  postMessage: (msg: unknown) => void;
};

const elm = document.querySelector("#root");
if (elm) {
  render(<App />, elm);
}

// Webpack HMR
if ((module as any).hot) (module as any).hot.accept();