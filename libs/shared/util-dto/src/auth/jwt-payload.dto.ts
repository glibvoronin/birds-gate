export interface JwtPayloadDto {
  sub: string; // user ID
  username: string;
  role: string;
  exp: number; // expiration (UNIX timestamp)
  iat?: number;
}
