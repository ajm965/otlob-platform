# subscriptions/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `subscriptions`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `subscriptions/application` interfaces and `subscriptions/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `subscriptions`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
