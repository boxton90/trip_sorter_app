import { Duration } from "./duration";

export class Deal {
    transport: string;
    departure: string;
    arrival: string;
    duration: Duration;
    cost: number;
    discount: number;
    reference: string;
}