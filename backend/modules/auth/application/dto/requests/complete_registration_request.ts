/** Body fields documented on POST /auth/bootstrap. */
export interface CompleteRegistrationRequest {
  readonly fullName: string;
  readonly locale: 'ar' | 'en';
  readonly primaryRole: 'customer' | 'technician' | 'company_operator';
}
