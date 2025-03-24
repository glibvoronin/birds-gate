export interface AuthenticatedJwtRequest extends Request {
  user: {
    userId: string;
    username: string;
    role: string;
  };
}
