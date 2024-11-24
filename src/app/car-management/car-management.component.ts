import { Component } from '@angular/core';

@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrl: './car-management.component.css'
})
export class CarManagementComponent {
  selectedComponent: string = 'brands'; // Default component to show

  showComponent(component: string): void {
    this.selectedComponent = component;
  }
}
