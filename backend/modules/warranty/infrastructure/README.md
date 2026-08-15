# warranty/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `warranty`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `warranty/application` interfaces and `warranty/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `warranty`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
