import { MatchType } from "../Matches/types"

export interface PlayerType {
    id: number,
    name: string,
    secondName?: string,
    middleName?: string,
    birthday?: Date,
    teamId?: number,
    isActive?: boolean,
    avatarId?: number,
    number?: number
}

export interface PlayerFormType {
    name: string,
    secondName?: string,
    middleName?: string,
    birthday?: Date,
    teamId?: number,
    number?: number
}

export interface OnePlayerType extends PlayerType {
    matchCount: number,
    goalCount: number,
    yellowCardCount: number,
    redCardCount: number,
    teamName?: string,
    teamLogoId?: number,
    lastMatch?: MatchType
}