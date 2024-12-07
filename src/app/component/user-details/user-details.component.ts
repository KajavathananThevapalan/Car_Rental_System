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
    private router: Router
  ) {}

  ngOnInit(): void {    
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {        
        this.user = data;
        // console.log(this.user);
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error('Error loading user details');
        this.isLoading = false;
        console.error('Error fetching user details:', error);
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
