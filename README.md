# Otlob Platform

**Commercial Name (Arabic):** اطلب ولا تتعنى  
**Project Codename:** Otlob Platform  
**Market:** Kingdom of Saudi Arabia  
**Primary Language:** Arabic (RTL-first)  
**Secondary Language:** English  
**Business Model:** Home Services Marketplace  

---

## Governing Baseline

**Architecture Review V2 is approved and governing.** See [`docs/ARCHITECTURE_REVIEW_V2.md`](docs/ARCHITECTURE_REVIEW_V2.md).

Do not contradict approved documentation under `docs/`.

---

## Phase Status

| Phase | Status |
|-------|--------|
| Phase 1 — System Architecture | Completed |
| Phase 1.5 — Business Engines | Completed |
| Phase 1.8 — Engineering Handbook | Completed |
| Phase 1.9 — Product Bible | Completed |
| Architecture Review V2 | Approved |
| **Phase 2.1 — Repository Skeleton** | **Active** |

---

## Phase 2.1 Scope

This phase creates the **production-ready repository skeleton only**.

| Allowed | Not allowed |
|---------|-------------|
| Folders, `.gitkeep`, README placeholders | Business logic |
| Root governance files | Firebase implementation |
| Module/package/app skeletons | REST API implementation |
| `PROJECT_TREE.md` | Flutter/UI implementation |
| | Dart/TypeScript domain classes |

---

## Repository Layout

```text
otlob-platform/
├── apps/                 # customer_app, technician_app, admin_panel
├── backend/              # modules/ + reserved functions/rules/config
├── packages/             # internal shared packages
├── docs/                 # approved enterprise documentation (do not casually change)
├── scripts/              # automation scripts (future)
├── config/               # environment, firebase placeholders, routes, security, constants
├── tools/                # codegen, scripts, templates
├── .github/              # PR templates and future workflows
└── PROJECT_TREE.md       # full skeleton tree snapshot
```

See [`PROJECT_TREE.md`](PROJECT_TREE.md) for the complete tree.

---

## Critical Boundaries

| Area | Rule |
|------|------|
| Customer Flutter UI | External ownership — do not implement product UI here unless transferred |
| Approved docs | Do not change Architecture Review V2 or completed Phase 1.x docs without formal review |
| Secrets | Never commit credentials or service accounts |
| Backend modules | Clean Architecture folders only in Phase 2.1 |

---

## Documentation

Authoritative docs remain under [`docs/`](docs/). Start with:

1. [`docs/ARCHITECTURE_REVIEW_V2.md`](docs/ARCHITECTURE_REVIEW_V2.md)
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
3. [`docs/engines/README.md`](docs/engines/README.md)
4. [`docs/engineering/README.md`](docs/engineering/README.md)
5. [`docs/product/PRODUCT_BIBLE_INDEX.md`](docs/product/PRODUCT_BIBLE_INDEX.md)

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md), [`CODEOWNERS`](CODEOWNERS), and [`docs/GIT_WORKFLOW.md`](docs/GIT_WORKFLOW.md).

---

## License

See [`LICENSE`](LICENSE).
