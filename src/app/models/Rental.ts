export interface Rental {
    rentalId: number;
    rentalStartDate: Date;
    rentalEndDate: Date;
    totalAmount: number;
    rentalStatus: string;
    carId: number;
    userId: number;
}