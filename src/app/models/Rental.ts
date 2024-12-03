export interface Rental {
    rentalId: number;
    rentalStartDate: Date;
    rentalEndDate: Date;
    amount: number;
    status: string;
    carId: number;
    userId: number;
}