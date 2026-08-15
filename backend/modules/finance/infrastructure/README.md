# finance/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `finance`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `finance/application` interfaces and `finance/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `finance`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
