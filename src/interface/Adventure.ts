import Log from './Log';

export default interface Adventure {
    id: string,
    name: string,
    logs?: Log[],
    createTime: Date,
}