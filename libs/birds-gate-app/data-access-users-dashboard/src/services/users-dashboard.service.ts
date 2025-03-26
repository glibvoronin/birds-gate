import { Injectable } from '@angular/core';
import { BE_URL } from '@birds-gate/util-constants';
import { HttpClient } from '@angular/common/http';
import { LoginResponseDto, UserResponseDto } from '@birds-gate/util-dto';

@Injectable({
  providedIn: 'root',
})
export class UsersDashboardService {
  private readonly usersUrl = `${BE_URL}/users`;

  constructor(private readonly http: HttpClient) {}

  fetchUsers() {
    return this.http.get<UserResponseDto[]>(`${this.usersUrl}`);
  }
}
