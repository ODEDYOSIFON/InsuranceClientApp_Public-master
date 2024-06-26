import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { InsurancePolicyDto } from '../models/insurance-policy';
import { ResponseDto } from '../models/response-dto';

@Component({
  selector: 'app-insurance-policy-form-container',
  template: `
    <app-insurance-policy-form
      [policy]="policy"
      [isEditMode]="isEditMode"
      [redirectAfterAction]="redirectAfterAction"
      (save)="savePolicy($event)"
      (cancel)="cancel()">
    </app-insurance-policy-form>
  `
})
export class InsurancePolicyFormContainerComponent implements OnInit {
  policy: InsurancePolicyDto = {
    id: 0,
    policyNumber: '',
    insuranceAmount: 0,
    startDate: '',
    endDate: '',
    userID: 0
  };
  isEditMode: boolean = false;
  title: string = 'Add Policy';
  redirectAfterAction: string = '';
  @Output() policyAddedOrUpdated = new EventEmitter<void>(); // Add this line

  constructor(
    private policyService: InsurancePolicyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const policyId = this.route.snapshot.paramMap.get('id');
    this.redirectAfterAction = this.route.snapshot.queryParamMap.get('redirectAfterAction') || ''; // Add this line
    if (policyId) {
      this.isEditMode = true;
      this.title = 'Edit Policy';
      this.loadPolicy(+policyId);
    }
  }

  loadPolicy(id: number): void {
    this.policyService.getInsurancePolicyById(id).subscribe((response: ResponseDto<InsurancePolicyDto>) => {
      if (response.isSuccess) {
        this.policy = response.data;
        this.policy.startDate = this.formatDate(this.policy.startDate);
        this.policy.endDate = this.formatDate(this.policy.endDate);
      } else {
        console.error(response.message);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
  }

  savePolicy(policy: InsurancePolicyDto): void {
    if (this.isEditMode) {
      this.policyService.updateInsurancePolicy(policy.id, policy).subscribe((response: ResponseDto<InsurancePolicyDto>) => {
        if (response.isSuccess) {
          this.policyAddedOrUpdated.emit(); // Emit event
          if (this.redirectAfterAction) {
            this.router.navigate([this.redirectAfterAction]);
          } else {
            this.router.navigate(['/users', policy.userID]);
          }
        } else {
          console.error(response.message);
        }
      });
    } else {
      this.policyService.addInsurancePolicy(policy).subscribe((response: ResponseDto<InsurancePolicyDto>) => {
        if (response.isSuccess) {
          this.policyAddedOrUpdated.emit(); // Emit event
          if (this.redirectAfterAction) {
            this.router.navigate([this.redirectAfterAction]);
          } else {
            this.router.navigate(['/users', policy.userID]);
          }
        } else {
          console.error(response.message);
        }
      });
    }
  }

  cancel(): void {
    if (this.redirectAfterAction) {
      this.router.navigate([this.redirectAfterAction]);
    } else {
      this.router.navigate(['/users', this.policy.userID]);
    }
  }
}