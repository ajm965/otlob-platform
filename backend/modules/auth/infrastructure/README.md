# auth/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `auth`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `auth/application` interfaces and `auth/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `auth`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
