export interface IStat {
    date: string;
    confirmed: number;
    deaths: number;
    recovered: number;
}

export type StatResult = {
    confirmed: number,
    recovered: number,
    deaths: number,
    code?: string,
}
