# services/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `services`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `services/application` interfaces and `services/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `services`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
