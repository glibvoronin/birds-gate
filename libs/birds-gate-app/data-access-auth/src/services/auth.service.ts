import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BE_URL } from '@birds-gate/util-constants';
import { LoginResponseDto } from '@birds-gate/util-dto';
import { TokenHelper } from '@birds-gate/bg-app-util-auth';
import { tap } from 'rxjs/operators';

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

    return this.http.post<LoginResponseDto>(`${this.authUrl}/login`, body).pipe(
      tap(({ access_token, refresh_token }) => {
        TokenHelper.setAuthToken(access_token);
        TokenHelper.setRefreshToken(refresh_token);
      })
    );
  }

  refreshToken(refreshToken: string) {
    return this.http
      .post<LoginResponseDto>(
        `${this.authUrl}/refresh`,
        {},
        {
          headers: {
            authorization: `Bearer ${refreshToken}`,
          },
        }
      )
      .pipe(
        tap(({ access_token, refresh_token }) => {
          TokenHelper.setAuthToken(access_token);
          TokenHelper.setRefreshToken(refresh_token);
        })
      );
  }

  logout() {
    return this.http.post<Record<never, never>>(`${this.authUrl}/logout/`, {});
  }
}
