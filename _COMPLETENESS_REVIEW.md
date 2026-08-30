# Completeness Review: ai-agent-governance-control-tower

**Review date:** 2026-07-20

## Assessment basis

Static inspection plus isolated PostgreSQL migration/provisioning, application startup, login, database-backed session/API acceptance, maintained tests, type checking, and a production build. Production IdP and authoritative external feeds remain deployment gates.

## Classification

**Prototype-demo**

This is a prototype/demo for governance/compliance. Generated gap/demo patterns are present: it contains 66 source files and visible routes/pages in `frontend/`, `backend/`, but those surfaces are not evidence of durable domain execution, verified integrations, or operational completion.

## Why it is not complete

- Generated gap/visualization routes describe missing capabilities or simulate recommendations; they do not implement the underlying domain operation.
- Generic LLM calls are used as product behavior without enough typed tools, grounded evidence, deterministic rules, or output evaluation.
- Mock, demo, sample, fixture, or placeholder behavior remains in executable/product paths.
- No recognizable project-owned automated tests were found for the main workflow.
- No checked-in CI workflow proves builds, tests, migrations, and security checks on every change.

## Needed features

1. Replace advisory-only AI output with versioned policies, evidence links, accountable owners, approvals, and immutable decisions.
2. Add authoritative regulatory/contract ingestion with source provenance, effective dates, jurisdiction, and change detection.
3. Implement SSO, least-privilege RBAC, segregation of duties, retention/legal holds, and exportable audit logs.
4. Build scenario-specific evaluations so citations, obligations, deadlines, and risk ratings are checked before release.
5. Add risk-based unit, integration, and end-to-end tests in CI, including migration and failure-path coverage.

## Risks or launch blockers

- Credential/configuration exposure: environment files are present in the repository tree and must be checked against Git history and rotated if real.
- Automation contains destructive process, filesystem, or database operations; do not run it on a shared machine without review.
- Startup appears coupled to seed/migration behavior, risking data mutation or non-repeatable launches.
- AI-provider availability, cost, privacy, prompt injection, and unvalidated output are launch risks until bounded and evaluated.

## Evidence inspected

- `README.md`
- `SOURCE_DATA_TABLES.md:127`
- `frontend/src/lib/sourceAIToolFields.ts:6`
- `frontend/src/app/layout.tsx`
- `backend/package.json`
- `start.sh`

## Recommended next action

Stop adding generated pages; prove one governance/compliance workflow against real services and persistent state, with tests and measurable acceptance criteria.

## Implementation progress (2026-07-18)

1. **Completed** — Added a durable tenant-scoped policy/obligation release workflow with versioned policies, accountable owners, evidence links, optimistic versions, independent approval, immutable decisions, retirement, and a hard boundary preventing generic AI output from releasing decisions.
2. **Completed at the connector boundary** — Added allow-listed regulatory/contract ingestion with stable source IDs, source versions, effective dates, jurisdiction, content hashes, freshness, deletion markers, deduplication, and change references. Authoritative feed agreements and qualified interpretation remain external gates.
3. **Completed in code; IdP onboarding remains external** — Added short-lived audience-bound HMAC assertions for an SSO gateway, explicit tenant/permission roles, least privilege, independent approval/segregation of duties, append-only audit export state, and retention/legal-hold operating guidance. Production IdP configuration and certification are not claimed.
4. **Completed** — Added deterministic scenario evaluation for citations, evidence, obligations, deadlines, policy changes, and risk ratings; unsupported or incomplete cases fail before review/release and always report interpretation uncertainty.
5. **Completed** — Added 12 unit/contract/integration-boundary tests in CI, an additive repeatable migration, failure/retry/dead-letter controls, syntax and destructive-migration checks, fail-closed environment documentation, and a non-destructive check/migrate/start runbook.

## Runtime acceptance (2026-07-20)

- Removed executable hard-coded demo users and unsigned base64 session cookies. The login route now verifies scrypt credentials from `governance_app_users`, stores only a SHA-256 hash of a random opaque token in `governance_app_sessions`, and `/api/auth/me` reloads the active, unexpired session and user from PostgreSQL. Logout deletes the server-side session.
- The additive migration owns both account and session tables. The acknowledgement-gated administrator provisioner refuses overwrite, uses scrypt parameters `N=16384, r=8, p=1`, and runs separately from nondestructive startup.
- `start.sh start` requires an explicit validated `BACKEND_PORT`, refuses an occupied port, and binds the full-stack Next.js runtime only to loopback. It never migrates, seeds, installs, deletes, or terminates another process.
- Attempt history is preserved in `_runtime_non_suite_repair_shard2k.tsv`: the first attempt is `FAILED / login_failed` because the dependency-free backend was skipped by bootstrap discovery; after declaring its PostgreSQL package and explicit migration command, the retry is `API_VERIFIED / startup_login_session_api`.
- Final acceptance used PostgreSQL `127.0.0.1:55615` and one Next.js listener at `127.0.0.1:6044`; reserved UI port `6045` remained unused. All 12 governance tests, TypeScript checking, and the Next.js 14 production build passed, and all assigned listeners were released.

## Extension (2026-08-30)

Added normalized OpenAI, Azure OpenAI and AWS Bedrock inventory discovery through the signed governed API action `discover-agents`. It deduplicates snapshots, digest-binds sources, flags risky agents, excludes credentials, and requires human registration review. Live enumeration and runtime telemetry remain open.
