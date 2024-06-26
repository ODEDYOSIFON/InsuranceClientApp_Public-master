import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ResponseDto } from '../models/response-dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User = { id: 0, name: '', email: '' };
  isEditMode: boolean = false;
  title: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const userID = this.route.snapshot.paramMap.get('id');
    if (userID) {
      this.isEditMode = true;
      this.title = 'Edit User';
      this.loadUser(+userID);
    } else {
      this.title = 'Add User';
    }
    console.log(`Title in ngOnInit: ${this.title}`);
  }

  
  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe((response: ResponseDto<User>) => {
      if (response.isSuccess) {
        this.user = response.data;
      } else {
        console.error(response.message);
        this.toastr.error(response.message);
      }
    });
  }

  saveUser(): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.user.id, this.user).subscribe((response: ResponseDto<User>) => {
        if (response.isSuccess) {
          this.router.navigate(['/users']);
          this.toastr.success(response.message);
        } else {
          console.error(response.message);
          this.toastr.error(response.message);
        }
      });
    } else {
      this.userService.addUser(this.user).subscribe((response: ResponseDto<User>) => {
        if (response.isSuccess) {
          this.router.navigate(['/users']);
          this.toastr.success(response.message);
        } else {
          console.error(response.message);
          this.toastr.error(response.message);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
