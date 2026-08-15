# matching/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `matching`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `matching/application` interfaces and `matching/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `matching`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
