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
    round?: number
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
    isDiscfal: boolean
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