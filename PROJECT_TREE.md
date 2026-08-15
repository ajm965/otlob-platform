# PROJECT_TREE

**Phase:** 2.1 — Repository Skeleton

Complete repository tree after Phase 2.1 scaffolding. Approved documentation under `docs/` is retained unchanged in content (tree listing only).

```text
otlob-platform/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── .gitkeep
│   ├── workflows/
│   │   └── .gitkeep
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── README.md
├── apps/
│   ├── admin_panel/
│   │   ├── assets/
│   │   │   └── .gitkeep
│   │   ├── lib/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   ├── web/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── customer_app/
│   │   ├── assets/
│   │   │   └── .gitkeep
│   │   ├── integration_test/
│   │   │   └── .gitkeep
│   │   ├── lib/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── technician_app/
│   │   ├── assets/
│   │   │   └── .gitkeep
│   │   ├── integration_test/
│   │   │   └── .gitkeep
│   │   ├── lib/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   └── README.md
├── backend/
│   ├── config/
│   │   └── README.md
│   ├── functions/
│   │   └── README.md
│   ├── modules/
│   │   ├── analytics/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── audit/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── auth/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── bookings/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── categories/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── chat/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── companies/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── disputes/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── files/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── finance/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── home_passport/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── location/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── loyalty/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── matching/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── notifications/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── offers/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── payments/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── requests/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── reviews/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── search/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── services/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── subscriptions/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── technicians/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── users/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── wallet/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   ├── warranty/
│   │   │   ├── application/
│   │   │   │   ├── dto/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── interfaces/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── services/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── use_cases/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── validators/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── enums/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── events/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── failures/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── value_objects/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── infrastructure/
│   │   │   │   ├── cache/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── datasources/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── mappers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── models/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── repositories/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── presentation/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── middleware/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── requests/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── responses/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   ├── tests/
│   │   │   │   ├── integration/
│   │   │   │   │   └── .gitkeep
│   │   │   │   ├── unit/
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── README.md
│   │   │   └── README.md
│   │   └── README.md
│   ├── rules/
│   │   └── README.md
│   └── README.md
├── config/
│   ├── constants/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── environment/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── firebase/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── routes/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── security/
│   │   ├── .gitkeep
│   │   └── README.md
│   └── README.md
├── docs/
│   ├── engineering/
│   │   ├── API_STANDARDS.md
│   │   ├── ARCHITECTURE_DECISIONS.md
│   │   ├── CODE_REVIEW_GUIDE.md
│   │   ├── CODING_STANDARDS.md
│   │   ├── DATABASE_STANDARDS.md
│   │   ├── ENGINEERING_GUIDE.md
│   │   ├── ENGINEERING_PRINCIPLES.md
│   │   ├── ERROR_HANDLING_GUIDE.md
│   │   ├── GIT_WORKFLOW.md
│   │   ├── LOGGING_GUIDE.md
│   │   ├── MODULE_TEMPLATE.md
│   │   ├── PULL_REQUEST_GUIDE.md
│   │   ├── README.md
│   │   ├── SECURITY_STANDARDS.md
│   │   └── TESTING_GUIDE.md
│   ├── engines/
│   │   ├── COMPANY_ENGINE.md
│   │   ├── DISPUTE_ENGINE.md
│   │   ├── HOME_PASSPORT_ENGINE.md
│   │   ├── LOYALTY_ENGINE.md
│   │   ├── MATCHING_ENGINE.md
│   │   ├── NOTIFICATION_ENGINE.md
│   │   ├── OFFERS_ENGINE.md
│   │   ├── PRICING_ENGINE.md
│   │   ├── README.md
│   │   ├── SUBSCRIPTION_ENGINE.md
│   │   ├── TECHNICIAN_RANKING_ENGINE.md
│   │   └── WARRANTY_ENGINE.md
│   ├── product/
│   │   ├── ACCEPTANCE_CRITERIA.md
│   │   ├── ADMIN_JOURNEY.md
│   │   ├── BUSINESS_SCENARIOS.md
│   │   ├── COMPANY_JOURNEY.md
│   │   ├── EDGE_CASES.md
│   │   ├── ERROR_SCENARIOS.md
│   │   ├── FEATURE_DEPENDENCIES.md
│   │   ├── MVP_SCOPE.md
│   │   ├── PERMISSIONS_MATRIX.md
│   │   ├── PRODUCT_BIBLE_INDEX.md
│   │   ├── PRODUCT_PRINCIPLES.md
│   │   ├── RELEASE_PLAN.md
│   │   ├── STATE_MACHINE.md
│   │   ├── TECHNICIAN_JOURNEY.md
│   │   ├── USER_JOURNEYS.md
│   │   ├── USER_STORIES.md
│   │   └── UX_RULES.md
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── ARCHITECTURE_REVIEW.md
│   ├── ARCHITECTURE_REVIEW_V2.md
│   ├── ASYNC_WORKFLOWS.md
│   ├── AUTHORIZATION_AND_DATA_ACCESS.md
│   ├── BUSINESS_RULES.md
│   ├── CODING_STANDARDS.md
│   ├── COMPLIANCE_AND_RETENTION.md
│   ├── DATABASE.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── FINANCE_AND_SETTLEMENT.md
│   ├── FIRESTORE_STRUCTURE.md
│   ├── GIT_WORKFLOW.md
│   ├── LIFECYCLE_RECONCILIATION.md
│   ├── PROJECT_STRUCTURE.md
│   ├── README.md
│   ├── ROADMAP.md
│   ├── SCHEDULING.md
│   ├── SECURITY.md
│   └── TECH_STACK.md
├── future_flutter_apps/
│   ├── future_admin/
│   │   └── README.md
│   ├── future_customer/
│   │   └── README.md
│   ├── future_technician/
│   │   └── README.md
│   └── README.md
├── packages/
│   ├── common/
│   │   ├── src/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── core/
│   │   ├── src/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── design_system/
│   │   ├── src/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── logging/
│   │   ├── src/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── network/
│   │   ├── src/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── permissions/
│   │   ├── src/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   ├── storage/
│   │   ├── src/
│   │   │   └── .gitkeep
│   │   ├── test/
│   │   │   └── .gitkeep
│   │   └── README.md
│   └── README.md
├── scripts/
│   └── README.md
├── shared/
│   ├── constants/
│   ├── contracts/
│   ├── types/
│   └── README.md
├── tools/
│   ├── codegen/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── scripts/
│   │   ├── .gitkeep
│   │   └── README.md
│   ├── templates/
│   │   ├── .gitkeep
│   │   └── README.md
│   └── README.md
├── .analysis_options.yaml
├── .editorconfig
├── .gitignore
├── .prettierrc
├── CHANGELOG.md
├── CODEOWNERS
├── CONTRIBUTING.md
├── LICENSE
├── melos.yaml
└── README.md
```

## Notes

- `.gitkeep` files keep empty directories versioned.
- `docs/` contains the approved Phase 1–1.9 and Architecture Review V2 baseline (not modified by Phase 2.1).
- `future_flutter_apps/` and `shared/` remain as historical Phase 1 placeholders; new skeleton work uses `apps/` and `packages/`.
- No business logic, Firebase, API, or Flutter implementation is included.

