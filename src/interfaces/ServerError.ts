export interface ServerError {
    type: 'server' | 'client' | 'user',
    message: string
}