export interface MatchType {
    id: number,
    home: MatchTeam,
    visitor: MatchTeam,
    date: Date,
    stadiumId: number,
    stadiumName: string
    isLive: boolean,
    isEnded: boolean,
    score?: string | null,
    matchEvents?: MatchEventType[]
    round?: number,
    isNeedSubsToProtocol: boolean,
    playerCountOnStart: number
}

export interface MatchTeam {
    teamName: string,
    teamId: number,
    teamLogo: number,
    teamPlayers: MatchPlayer[]
}

export interface MatchPlayer {
    playerName: string,
    playerId: number,
    isSquad: boolean,
    isDiscfal: boolean,
    number?: number,
    avatarId: number
}

export interface MatchEventType {
    matchEventId: number,
    name: string,
    logoId: number,
    playerId: number,
    playerName: string,
    teamId: number,
    minute: number,
}

export interface SquadListType {
    startSquad: SquadPlayer[],
    subs: SquadPlayer[],
    teamId?: number
}

export interface SquadPlayer {
    playerId: number,
    isCaptain?: boolean,
    isGoalkeaper?: boolean,
    isStartSquad?: boolean
}