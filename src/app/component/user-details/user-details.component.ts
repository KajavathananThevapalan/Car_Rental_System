import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../services/user.service";
import { Rental } from "../../models/Rental";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user: any;
  isLoading: boolean = true;
  rentals: Rental[] = [];
  errorMessage: string = '';
  rentalsByStatus: { [key: string]: Rental[] } = {
    pending: [],
    declined: [],
    booked: [],
    rented: [],
    returned: []
  };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {    
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.isLoading = true;
    const userId = localStorage.getItem('UserId');
    this.userService.getUserById(Number(userId)).subscribe(
      (data) => {
        this.isLoading = false;
        this.user = data;
        this.rentals = this.user.rentals || [];
        console.log(this.user.rentals);
        
        this.rentalsByStatus = {
          pending: this.rentals.filter(rental => rental.rentalStatus === 'Pending'),
          declined: this.rentals.filter(rental => rental.rentalStatus === 'Declined'),
          booked: this.rentals.filter(rental => rental.rentalStatus === 'Booked'),
          rented: this.rentals.filter(rental => rental.rentalStatus === 'Rented'),
          returned: this.rentals.filter(rental => rental.rentalStatus === 'Returned')
        };
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load user profile. Please try again later.';
        this.toastr.error(this.errorMessage);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/admin/list-user']);
  }

   editUser(userId: number): void {
    this.router.navigate([`/admin/user/edit/${userId}`]);
  }
}
