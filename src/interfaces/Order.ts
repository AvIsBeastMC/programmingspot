import { Service } from "./Service";

export interface Order {
    service: Service,
    boughtOn: string,
}