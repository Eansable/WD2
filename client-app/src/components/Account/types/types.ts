export interface userInterface {
    email?: string,
    id?: string,
    refreshToken?: string,
    roles?: string[],
    sessionId?: number,
    token?: string,
    userName?: string,
}

export interface stateInterface {
    isLoading: boolean,
    registred: string,
    user: userInterface,
    roles: string[]
}