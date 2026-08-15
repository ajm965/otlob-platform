# disputes/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `disputes`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `disputes/application` interfaces and `disputes/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `disputes`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
