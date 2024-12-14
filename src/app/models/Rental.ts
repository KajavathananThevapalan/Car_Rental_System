import { Payment } from "./Payment";

export interface Rental {
    rentalId: number;
    createdAt: Date;
    rentalStartDate: Date;
    rentalEndDate: Date;
    totalAmount: number;
    rentalStatus: string;
    carId: number;
    userId: number;
    payments: Payment[];
    userName: string;
}