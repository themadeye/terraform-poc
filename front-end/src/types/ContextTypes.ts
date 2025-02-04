export type AuthContextType = {
    user: User | null,
    token: string,
    login: (user: User) => Promise<void>,
    logout: () => void
}

export type User = {
    name: string,
    email: string,
}