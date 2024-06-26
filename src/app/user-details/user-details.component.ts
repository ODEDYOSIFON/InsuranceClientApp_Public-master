import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { UserWithInsurancePoliciesDto } from '../models/user';
import { ResponseDto } from '../models/response-dto';
import { InsurancePolicyDto } from '../models/insurance-policy';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: UserWithInsurancePoliciesDto={
    id:0,
    email:'',
    name:'',
    insurancePolicies:[]    
  };
  userID: number=0;
  newPolicy: InsurancePolicyDto = {
    id: 0,
    policyNumber: '',
    insuranceAmount: 0,
    startDate: '',
    endDate: '',
    userID: 0
  };
  redirectUrl: string = '';
  showAddPolicyForm: boolean = false; // Flag to control Add Policy form visibility

  constructor(
    private userService: UserService,
    private policyService: InsurancePolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const uid= this.route.snapshot.paramMap.get('id');
    if(uid){
      this.userID =parseInt(uid)
      this.redirectUrl = '/users/' + this.userID; // Set the redirect URL
    }   
    this.loadUserDetails();
    this.newPolicy.userID = this.userID;
  }

  loadUserDetails(): void {
    this.userService.getUserById(this.userID).subscribe((response: ResponseDto<UserWithInsurancePoliciesDto>) => {
      if (response.isSuccess) {
        this.user = response.data;
      } else {
        this.toastr.error(response.message);
        console.error(response.message);
      }
    });
  }

  // Handle Save Event: This method handles both adding and updating policies.
  addOrUpdateInsurancePolicy(policy: InsurancePolicyDto): void {
    if (policy.id === 0) {
      this.policyService.addInsurancePolicy(policy).subscribe((response: ResponseDto<InsurancePolicyDto>) => {
          if (response.isSuccess) {
            this.loadUserDetails(); // Refresh data
            this.newPolicy = {
              id: 0,
              policyNumber: '',
              insuranceAmount: 0,
              startDate: '',
              endDate: '',
              userID: this.userID
            }; // Reset the form
            this.showAddPolicyForm = false; // Hide the form after adding
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
            console.error(response.message);
          }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message || 'An error occurred');
          console.error(error);
        }
      );
    } else {
      this.policyService.updateInsurancePolicy(policy.id, policy).subscribe(
        (response: ResponseDto<InsurancePolicyDto>) => {
          if (response.isSuccess) {
            this.loadUserDetails(); // Refresh data
            this.toastr.success(response.message);
          } else {
            this.toastr.error(response.message);
           
          }
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error.message || 'An error occurred');
          console.error(error);
        }
      );
    }
  }


  deleteInsurancePolicy(policyId: number): void {
    this.policyService.deleteInsurancePolicy(policyId).subscribe(
      (response: ResponseDto<boolean>) => {
        if (response.isSuccess) {
          this.loadUserDetails(); // Refresh data
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
          console.error(response.message);
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message || 'An error occurred');
        console.error(error);
      }
    );
  }
  cancelAddPolicy(): void {
    this.newPolicy = {
      id: 0,
      policyNumber: '',
      insuranceAmount: 0,
      startDate: '',
      endDate: '',
      userID: this.userID
    };
    this.showAddPolicyForm = false; // Hide the form on cancel
  }

  showAddPolicy(): void {
    this.showAddPolicyForm = true; // Show the form
  }
}
