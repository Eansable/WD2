export interface ChampionatType {
    id: number,
    name: string,
    yearString?: string,
    startDate?: Date,
    endDate?: Date,
    playersCount?: number,
    championatFormat?: number,
    isActive?: boolean
}

export interface AddChampFormType {
    name: string,
    format?: number,
    playersCount?: number,
    startDate?: Date,
    endDate?: Date
}