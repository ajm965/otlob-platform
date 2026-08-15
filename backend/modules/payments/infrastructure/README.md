# payments/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `payments`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `payments/application` interfaces and `payments/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `payments`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
