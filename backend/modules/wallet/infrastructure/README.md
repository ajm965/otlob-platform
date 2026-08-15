# wallet/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `wallet`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `wallet/application` interfaces and `wallet/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `wallet`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
