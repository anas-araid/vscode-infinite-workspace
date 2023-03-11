import { CustomFile, GetFile } from "../types";

export const supportedTypes = (type: string): string => {
  switch (type) {
    case "css":
      return "css";
    case "json":
      return "json";
    case "html":
      return "html";
    case "ts":
    case "js":
    case "tsx":
      return "typescript";
    default:
      return "";
  }
};

export const mapFiles = (data: GetFile[]): CustomFile[] =>
  data
    .map((file) => {
      const regex = /\/([\w-]+)\.([\w]+)$/;

      const matches = regex.exec(file.path);
      if (matches) {
        const name = matches[1];
        const type = matches[2];
        return {
          name: `${name}.${type}`,
          type: supportedTypes(type),
          content: file.content,
          path: file.path,
        };
      }
      return undefined;
    })
    .filter((file): file is CustomFile => file !== undefined);

export const calcTranslate = (index: number) => {
  //{ transform: `translate(${540 * index}px, 0px)`};
  return { left: `${540 * index}px` };
};

export const fileWindowPosition = (fileWindow: HTMLElement) => {
  const left = parseInt(fileWindow.style.left, 10);
  const style = window.getComputedStyle(fileWindow);
  const translate = new WebKitCSSMatrix(style.webkitTransform);
  const translateX = Math.round(translate.m41) ?? 0;
  const translateY = Math.round(translate.m42) ?? 0;

  const x = left + translateX;
  const y = translateY;
  return {
    x,
    y,
  };
};
