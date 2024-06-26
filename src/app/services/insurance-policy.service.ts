import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsurancePolicyDto, } from '../models/insurance-policy';
import { ResponseDto } from '../models/response-dto';
@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {
  private apiUrl = 'https://localhost:7020/api/insurancepolicies'; 

  constructor(private http: HttpClient) { }

  getInsurancePolicies(): Observable<ResponseDto<InsurancePolicyDto[]>> {
    return this.http.get<ResponseDto<InsurancePolicyDto[]>>(this.apiUrl);
  }

  getInsurancePolicyById(id: number): Observable<ResponseDto<InsurancePolicyDto>> {
    const resp=this.http.get<ResponseDto<InsurancePolicyDto>>(`${this.apiUrl}/${id}`);
    console.log(resp)
    return this.http.get<ResponseDto<InsurancePolicyDto>>(`${this.apiUrl}/${id}`);
  }

  addInsurancePolicy(policy: InsurancePolicyDto): Observable<ResponseDto<InsurancePolicyDto>> {
    return this.http.post<ResponseDto<InsurancePolicyDto>>(this.apiUrl, policy);
  }

  updateInsurancePolicy(id: number, policy: InsurancePolicyDto): Observable<ResponseDto<InsurancePolicyDto>> {
    return this.http.put<ResponseDto<InsurancePolicyDto>>(`${this.apiUrl}/${id}`, policy);
  }

  deleteInsurancePolicy(id: number): Observable<ResponseDto<boolean>> {
    return this.http.delete<ResponseDto<boolean>>(`${this.apiUrl}/${id}`);
  }
}

