import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { InsurancePolicyDto } from '../models/insurance-policy';

@Component({
  selector: 'app-insurance-policy-list',
  templateUrl: './insurance-policy-list.component.html',
  styleUrls: ['./insurance-policy-list.component.scss']
})
export class InsurancePolicyListComponent implements OnChanges {
  @Input() policies: InsurancePolicyDto[] = [];
  @Output() save = new EventEmitter<InsurancePolicyDto>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();
  @Output() policyAddedOrUpdated = new EventEmitter<void>();

  filteredPolicies: InsurancePolicyDto[] = [];

  fromDate: string = '';
  toDate: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['policies']) {
      this.filteredPolicies = this.policies;
      this.filterPolicies();
    }
  }

  filterPolicies(): void {
    let from = this.fromDate ? new Date(this.fromDate) : null;
    let to = this.toDate ? new Date(this.toDate) : null;
    
    if (from && to) {
        // Swap the dates if from date is greater than to date
        if (from.getTime() > to.getTime()) {
            const temp = from;
            from = to;
            to = temp;
        }
        // Subtract one day from the from date
        from.setDate(from.getDate() - 1);
    } else if (from) {
        // Subtract one day from the from date if only from date is provided
        from.setDate(from.getDate() - 1);
    }

    this.filteredPolicies = this.policies.filter(policy => {
        const startDate = new Date(policy.startDate);
        const isAfterFromDate = from ? startDate.getTime() >= from.getTime() : true;
        const isBeforeToDate = to ? startDate.getTime() <= to.getTime() : true;
        return isAfterFromDate && isBeforeToDate;
    });
    console.log('Filtered policies:', this.filteredPolicies);
}

  addOrUpdateInsurancePolicy(policy: InsurancePolicyDto): void {
    this.save.emit(policy);
  }

  cancelAddPolicy(): void {
    this.cancel.emit();
  }

  deleteInsurancePolicy(policyId: number): void {
    this.delete.emit(policyId);
  }
}
