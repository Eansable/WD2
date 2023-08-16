export interface PlayerType {
    id: number,
    name: string,
    secondName?: string,
    middleName?: string,
    birthday?: Date,
    teamId?: number,
    isActive?: boolean,
    avatarId?: number,

}

export interface PlayerFormType {
    name: string,
    secondName?: string,
    middleName?: string,
    birthday?: Date,
    teamId?: number,
}

export interface OnePlayerType extends PlayerType {
    matchCount: number,
    goalCount: number,
    yellowCount: number,
    redCount: number,
}