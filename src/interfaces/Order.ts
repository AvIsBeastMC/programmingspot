import { MongooseService } from './Service'

export interface Order {
    by: string,
    service: MongooseService,
    purchasedOn: Date
}