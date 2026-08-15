# analytics/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `analytics`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `analytics/application` interfaces and `analytics/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `analytics`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
