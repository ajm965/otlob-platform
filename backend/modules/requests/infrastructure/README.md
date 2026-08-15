# requests/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `requests`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `requests/application` interfaces and `requests/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `requests`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
