export const tokens = {
  config: Symbol('AppConfig'),
  logger: Symbol('Logger'),
  firebaseApp: Symbol('FirebaseApp'),
  listCategoriesUseCase: Symbol('ListCategoriesUseCase'),
  listServicesUseCase: Symbol('ListServicesUseCase'),
  getServiceUseCase: Symbol('GetServiceUseCase'),
  createRequestUseCase: Symbol('CreateRequestUseCase'),
  getRequestUseCase: Symbol('GetRequestUseCase'),
  listRequestsUseCase: Symbol('ListRequestsUseCase'),
} as const;
