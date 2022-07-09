import Log from './Log';

export default interface Adventure {
  id: number;
  name: string;
  logs?: Log[];
  createTime: Date;
}

export { Adventure };
