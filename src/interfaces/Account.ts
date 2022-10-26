export interface AccountService {
    expiresOn: string | null,
    boughtOn: string,
    // actual id of service of Services Collection
    servId: string,
    transactionId: string | null
}
export interface Account {
    email: string,
    password: string,
    services: AccountService[],
    createdOn: string,
    name: string,
    isAdmin: boolean
}

export interface MongooseAccount extends Account {
    _id: string
}