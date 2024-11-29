import { Address } from "./Address";
import { UserImages } from "./UserImage";

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  nic: string;
  drivingLicenceNo: string;
  email: string;
  password: string;
  phone: string;
  role: 'Customer' | 'Admin'; // Consistent capitalization
  address: Address;
  images: UserImages[]; // Multiple images as array, as you have a FormArray for images
}
