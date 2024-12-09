export interface Rental {
    rentalId: number;
    rentalStartDate: Date;
    rentalEndDate: Date;
    totalAmount: number;
    status: string;
    carId: number;
    userId: number;
}