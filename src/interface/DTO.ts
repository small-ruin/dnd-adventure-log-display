interface ChangeOrderDTO {
  adventureId: number;
  logId: number;
  step: number;
}

interface SearchDTO {
  id?: number;
  name?: string;
  noContent?: boolean; // 是否携带内容
  key: string;
  log: string;
}

export { ChangeOrderDTO, SearchDTO };
