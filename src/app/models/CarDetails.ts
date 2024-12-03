import { CarImage } from "./CarImage";

export interface CarDetails {
    carId: number;
    licensePlate: string;
    color: string;
    status: string;
    pricePerDay: number;
    currentMileage: number;
    registrationNumber: string;
    yearOfManufacture: number;
    tankCapacity: number;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    modelId: number;
    reviews: any[];
    reservations: any | null;
    rentals: any | null;
    frotView: string;
    backView: string;
    sideView: string;
    interior: string;
    serviceRecords: any | null;
  }