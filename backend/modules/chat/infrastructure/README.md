# chat/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `chat`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `chat/application` interfaces and `chat/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `chat`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
