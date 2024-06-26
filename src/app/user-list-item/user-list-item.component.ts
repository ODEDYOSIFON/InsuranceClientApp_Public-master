import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserWithDetails } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../models/response-dto';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {
  @Input() user!: UserWithDetails;
  @Output() viewDetails = new EventEmitter<number>();
  @Output() editUser = new EventEmitter<UserWithDetails>();
  @Output() deleteUser = new EventEmitter<number>();
  @Output() saveUser = new EventEmitter<UserWithDetails>();
  @Output() cancelEdit = new EventEmitter<UserWithDetails>();

  constructor(private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    if (this.user && !('showDetails' in this.user)) {
      (this.user as UserWithDetails).showDetails = false;
    }
    if (this.user && !('editing' in this.user)) {
      (this.user as UserWithDetails).editing = false;
    }
  }

  toggle(): void {
    this.user.showDetails = !this.user.showDetails;
  }

  onSaveUser(): void {
    if (this.user.name.trim() === '' || this.user.email.trim() === '') {
      this.toastr.error('Name and Email fields cannot be empty.');
      return;
    }
    this.saveUser.emit(this.user);
  }

  onCancelEdit(): void {
    this.cancelEdit.emit(this.user);
  }
}
