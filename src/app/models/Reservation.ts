export interface Reservation {
    reservationId: number;
    reservationDate: Date;
    endDdate: Date;
    status: string;
    carId: number;
    userId: number;
}