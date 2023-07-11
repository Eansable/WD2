export interface PlayerType {
    id: number,
    name: string,
    secondName?: string,
    middleName?: string,
    birthday?: Date,
    teamId?: number,
    isActive?: boolean
}

export interface PlayerFormType {
    name: string,
    secondName?: string,
    middleName?: string,
    birthday?: Date,
    teamId?: number,
}