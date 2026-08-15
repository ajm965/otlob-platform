# notifications/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `notifications`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `notifications/application` interfaces and `notifications/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `notifications`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
