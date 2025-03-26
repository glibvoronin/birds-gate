import { Injectable } from '@angular/core';
import { BE_URL } from '@birds-gate/util-constants';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto, UserResponseDto } from '@birds-gate/util-dto';

@Injectable({
  providedIn: 'root',
})
export class UsersDashboardService {
  private readonly usersUrl = `${BE_URL}/users`;

  constructor(private readonly http: HttpClient) {}

  fetchUsers() {
    return this.http.get<UserResponseDto[]>(`${this.usersUrl}`);
  }

  editUser(user: UserResponseDto) {
    const { id, ...updatedUser } = user;
    return this.http.patch<UserResponseDto>(
      `${this.usersUrl}/${id}`,
      updatedUser
    );
  }

  createUser(user: CreateUserDto) {
    return this.http.post<UserResponseDto>(`${this.usersUrl}`, user);
  }
}
