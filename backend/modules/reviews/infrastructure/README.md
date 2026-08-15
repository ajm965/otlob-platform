# reviews/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `reviews`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `reviews/application` interfaces and `reviews/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `reviews`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
