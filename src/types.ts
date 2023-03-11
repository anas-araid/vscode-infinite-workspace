export interface GetFile {
  path: string;
  content: string;
}

export interface CustomFile {
  name: string;
  type: string;
  content: string;
  path: string;
}

export interface MenuItem {
  label: string;
  value: string;
}
