export interface MatchType {
    id: number,
    home: MatchTeam,
    visitor: MatchTeam,
    date: Date,
    stadiumId: number,
    stadiumName: string 
    isLive: boolean,
    isEnded: boolean,
    score?: string | null 
}

interface MatchTeam {
    teamName: string,
    teamId: number,
    teamLogo: number,
    teamPlayers: MatchPlayer[]
}

export interface MatchPlayer {
    playerName: string,
    playerId: number
}