import { Component, Input } from "@angular/core";
import { CarDetails } from "../../models/CarDetails";

@Component({
  selector: 'app-rent-now',
  templateUrl: './rent-now.component.html',
  styleUrls: ['./rent-now.component.css'],
})
export class RentNowComponent {
  @Input() carDetails: CarDetails | undefined;

  rental = {
    itemName: '',
    duration: null,
    userName: '',
    email: '',
    paymentMethod: 'creditCard'
  };

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted successfully:', this.rental);
      alert('Rent form submitted successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
