# users/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `users`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `users/application` interfaces and `users/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `users`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
