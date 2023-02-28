export interface GetFile {
  path: string;
  content: string;
};

export interface CustomFile {
  name: string;
  type: string;
  content: string;
  path: string;
}