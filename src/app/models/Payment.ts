import { DecimalPipe } from "@angular/common";

export interface Payment {
    paymentId: number;
    amount: DecimalPipe;
    paymentDate: Date;
    paymentMethod: string;
    paymentStatus: string;
    rentalId: number;
}