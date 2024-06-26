import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, UserWithDetails } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../models/response-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserWithDetails[] = [];
  showAddUserForm: boolean = false;
  newUser: User = { id: 0, name: '', email: '' };
   

  constructor(private userService: UserService, private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((response: ResponseDto<User[]>) => {
      if (response.isSuccess) {
        this.users = response.data.map(user => ({
          id: user.id,
          email: user.email,
          name: user.name,
          showDetails: false,
          editing: false // Add editing property
        }));
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  viewUserDetails(id: number): void {
        this.router.navigateByUrl('users/'+id)
  }

  editUser(user: UserWithDetails): void {
    user.editing = true;
  }

  saveUser(user: UserWithDetails): void {
    this.userService.updateUser(user.id, user).subscribe(response => {
      if (response.isSuccess) {
        this.toastr.success(response.message);
        user.editing = false;
        this.loadUsers();
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  cancelEdit(user: UserWithDetails): void {
    user.editing = false;
    this.loadUsers();
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(response => {
      if (response.isSuccess) {
        this.toastr.success(response.message);
        this.loadUsers();
      } else {
        this.toastr.error(response.message);
      }
    });
  }

  toggleAddUserForm(): void {
    this.showAddUserForm = !this.showAddUserForm;
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe(response => {
      if (response.isSuccess) {
        this.toastr.success(response.message);
        this.loadUsers();
        this.toggleAddUserForm();
      } else {
        this.toastr.error(response.message);
      }
    });
  }
}
