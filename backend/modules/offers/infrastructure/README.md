# offers/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `offers`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `offers/application` interfaces and `offers/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `offers`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
