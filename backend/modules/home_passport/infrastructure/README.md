# home_passport/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `home_passport`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `home_passport/application` interfaces and `home_passport/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `home_passport`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
