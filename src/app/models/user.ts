import { InsurancePolicyDto } from './insurance-policy';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserWithInsurancePoliciesDto extends User {
  insurancePolicies: InsurancePolicyDto[];
}
export interface UserWithDetails extends User {
  showDetails: boolean;
  editing:boolean;
 
}