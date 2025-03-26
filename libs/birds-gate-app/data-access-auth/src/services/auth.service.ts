import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BE_URL } from '@birds-gate/util-constants';
import { LoginResponseDto } from '@birds-gate/util-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = `${BE_URL}/auth`;

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string) {
    const body = {
      username,
      password,
    };

    return this.http.post<LoginResponseDto>(`${this.authUrl}/login`, body);
  }
}
