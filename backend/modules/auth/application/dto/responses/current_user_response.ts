/** User profile fields documented on POST /auth/bootstrap and GET /auth/me. */
export interface CurrentUserResponse {
  readonly id: string;
  readonly fullName: string;
  readonly locale: 'ar' | 'en';
  readonly primaryRole: 'customer' | 'technician' | 'company_operator';
}
