export interface ChampionatType {
    id: number,
    name: string,
    yearString?: string,
    startDate?: Date,
    endDate?: Date,
    playersCount?: number,
    championatFormat?: number,
    isActive?: boolean,
    table?: ChampionatStatsType[],
    logoId?: number,
    minutesTime: number,
    countYellowAfterDis: number,
    maxPlayerPerMatch: number,
    isDefaultChamp: boolean,
}

export default interface ChampionatStatsType {
    teamId: number,
    teamName: string,
    teamLogoId: number,
    win: number,
    draw: number,
    lose: number,
    goals: number,
    goalsConceded: number,
    yellowCards: number,
    redCards: number,
    points: number
}