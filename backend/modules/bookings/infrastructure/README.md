# bookings/infrastructure

## Purpose

Adapters for persistence, external APIs, and cache for `bookings`.

## Responsibilities

- Repository implementations, datasources, models, mappers, cache

## Dependencies

- `bookings/application` interfaces and `bookings/domain` ports
- Firebase/PSP/SMS SDKs only when implementation is authorized later

## Ownership

Backend infrastructure owners for `bookings`

## Future Implementation Notes

- No Firebase configuration or SDK wiring in Phase 2.1
