export enum PaymentStatus {
  Pending = 'pending',
  Authorized = 'authorized',
  Captured = 'captured',
  Voided = 'voided',
  AuthorizationExpired = 'authorization_expired',
  Failed = 'failed',
  Refunded = 'refunded',
  PartiallyRefunded = 'partially_refunded',
}
