/** Input from the OTP verify step of the registration/login journey. */
export interface VerifyOtpRequest {
  readonly phone: string;
  readonly otp: string;
}
