# loyalty/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `loyalty`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `loyalty/application` interfaces and `loyalty/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `loyalty`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
