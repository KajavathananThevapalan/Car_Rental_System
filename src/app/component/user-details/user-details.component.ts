import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId!: number;
  user: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {    
    this.userId = Number(this.route.snapshot.paramMap.get('id')); // Get the userId from the route    
    this.getUserDetails(); // Fetch user details on initialization
  }

  // Fetch user details by userId
  getUserDetails(): void {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {        
        this.user = data;
        console.log(this.user);
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Error loading user details');
        this.isLoading = false;
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Go back to the previous page or a specific route (e.g., user list)
  goBack(): void {
    this.router.navigate(['/admin/list-user']); // You can change this to your desired route
  }

   // Navigate to the Edit User page
   editUser(userId: number): void {
    this.router.navigate([`/admin/user/edit/${userId}`]); // Navigate to the edit page with userId
  }
}
