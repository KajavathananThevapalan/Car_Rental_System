import { Address } from "./Address";
import { Rental } from "./Rental";

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  nic: string;
  drivingLicenceNo: string;
  email: string;
  password: string;
  phone: string;
  userRole: 'customer' | 'admin';
  address: Address;
  profileImage: string;
  dirvingLicenceFront:string;
  dirvingLicenceBack:string;
  rentals: Rental[];
}
