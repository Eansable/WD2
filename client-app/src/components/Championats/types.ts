export interface ChampionatType {
    id: number,
    name: string,
    yearString?: string,
    startDate?: Date,
    endDate?: Date,
    playersCount?: number,
    championatFormat?: number,
    isActive?: boolean,
    table?: ChampionatStatsType[]
}

export interface AddChampFormType {
    name: string,
    format?: number,
    playersCount?: number,
    startDate?: Date,
    endDate?: Date
}

export default interface ChampionatStatsType {
    teamId: number,
    teamName: string,
    win: number,
    draw: number,
    lose: number,
    goals: number,
    goalsConceded: number,
    yellowCards: number,
    redCards: number,
    points: number
}