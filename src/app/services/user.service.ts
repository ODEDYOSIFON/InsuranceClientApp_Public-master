import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User ,UserWithInsurancePoliciesDto} from '../models/user';
import { ResponseDto } from '../models/response-dto';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7020/api/users';  

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ResponseDto<User[]>> {
    return this.http.get<ResponseDto<User[]>>(this.apiUrl);
  }

  getUserById(id: number): Observable<ResponseDto<UserWithInsurancePoliciesDto>> {
    console.log('getUserById')
    return this.http.get<ResponseDto<UserWithInsurancePoliciesDto>>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<ResponseDto<User>> {
    return this.http.post<ResponseDto<User>>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<ResponseDto<User>> {
    return this.http.put<ResponseDto<User>>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<ResponseDto<boolean>> {
    return this.http.delete<ResponseDto<boolean>>(`${this.apiUrl}/${id}`);
  }
}
