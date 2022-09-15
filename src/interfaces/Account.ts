import { Order } from "./Order";

export interface AccountService {
    expiresOn: string | null,
    boughtOn: string,
    orderedBy: string[],
    // actual id of service
    id: string
}

export interface Account {
    services: AccountService[],
    orders: Order[],
    createdOn: string,
    name: string
}