import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InsurancePolicyDto } from '../models/insurance-policy';

@Component({
  selector: 'app-insurance-policy-form',
  templateUrl: './insurance-policy-form.component.html',
  styleUrls: ['./insurance-policy-form.component.scss']
})
export class InsurancePolicyFormComponent implements OnInit, OnChanges {
  @Input() policy: InsurancePolicyDto = {
    id: 0,
    policyNumber: '',
    insuranceAmount: 0,
    startDate: '',
    endDate: '',
    userID: 0
  };
  @Input() isEditMode: boolean = false;
  @Input() redirectAfterAction: string = '';
  @Output() save = new EventEmitter<InsurancePolicyDto>();
  @Output() cancel = new EventEmitter<void>();
  @Output() policyAddedOrUpdated = new EventEmitter<void>(); 
  @Output() delete = new EventEmitter<number>(); 

  public editable: boolean = false;
  public dateError: string = '';
  private originalPolicy!: InsurancePolicyDto;

  constructor() { }

  ngOnInit(): void {
    // Save the original state of the policy
    this.originalPolicy = { ...this.policy };
  }

  ngOnChanges(changes: SimpleChanges): void {
   
    if (changes['policy']) {
      
      this.policy.startDate = this.formatDateForInput(this.policy.startDate);
      this.policy.endDate = this.formatDateForInput(this.policy.endDate);
    }
  }

  onSubmit(): void {
    if (new Date(this.policy.startDate) > new Date(this.policy.endDate)) {
      this.dateError = 'Start date must be earlier than or equal to end date.';
      return;
    }
    this.dateError = '';
    this.save.emit(this.policy);
    this.policyAddedOrUpdated.emit();
    this.editable = false; // Set editable to false after saving
  }

  onCancel(): void {
     // Revert to the original state of the policy
     this.policy = { ...this.originalPolicy };
     this.policy.startDate = this.formatDateForInput(this.policy.startDate);
     this.policy.endDate = this.formatDateForInput(this.policy.endDate);
    this.cancel.emit();
    this.editable = false; // Set editable to false after canceling
  }

  toggleEdit(): void {
    if (!this.editable && this.isEditMode) {
      // Backing up the original policy
      this.originalPolicy = { ...this.policy };
      this.policy.startDate = this.formatDateForInput(this.policy.startDate);
      this.policy.endDate = this.formatDateForInput(this.policy.endDate);
      this.editable = true;
    } else {
      this.policy = { ...this.originalPolicy };
      this.policy.startDate = this.formatDateForInput(this.policy.startDate);
      this.policy.endDate = this.formatDateForInput(this.policy.endDate);
      this.editable = false;
    }
  }

  deletePolicy(): void {
    this.delete.emit(this.policy.id); // Emit delete event
  }
  resetDateError(): void {
    this.dateError = '';
  }
  private formatDateForInput(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
