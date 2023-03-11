export enum COMMAND {
  GET_FILES = "get_files",
  CREATE_FILE = "create_file",
  SEARCH = "search",
}

export const MENU_ITEMS = [
  {
    label: "Create new file",
    value: COMMAND.CREATE_FILE,
  },
  {
    label: "Search",
    value: COMMAND.SEARCH,
  },
];
