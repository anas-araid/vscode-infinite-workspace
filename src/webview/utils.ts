import { CustomFile, GetFile } from "../types";

export const supportedTypes = (type: string): string => {
  switch (type) {
    case 'css':
      return 'css';
    case 'json':
      return 'json';
    case 'html':
      return 'html';
    case 'ts':
    case 'js':
    case 'tsx':
      return 'typescript';
    default:
      return '';
  }
};

export const mapFiles = (data: GetFile[]): CustomFile[] => (
  data.map((file) => {
    const regex = /\/([\w-]+)\.([\w]+)$/;

    const matches = regex.exec(file.path);
    if (matches) {
      const name = matches[1];
      const type = matches[2];
      return {
        name: `${name}.${type}`,
        type: supportedTypes(type),
        content: file.content,
        path: file.path
      };
    }
    return undefined;
  })
  .filter((file): file is CustomFile => file !== undefined)
);