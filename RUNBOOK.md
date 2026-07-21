# Governed policy release operations

The `/api/governed` workflow is authoritative for the narrow policy/obligation release journey. It requires a short-lived HMAC-signed identity assertion from an SSO gateway, tenant and permission scope, versioned policy inputs, authoritative source provenance, independent approval, and append-only decisions. Generic AI pages are advisory and cannot release a decision.

Install dependencies explicitly, configure `.env.example`, run `./start.sh check`, back up PostgreSQL, then run `ALLOW_SCHEMA_MIGRATION=1 ./start.sh migrate`. Startup never installs packages, kills ports, creates schema, seeds, or resets data. Rollback deploys prior code while retaining additive tables; restore only after reconciling accepted decisions and outbox receipts.

Source adapters must provide stable IDs, source versions, effective dates, jurisdictions, freshness, content hashes, and deletion markers. Release commands are idempotent; workers use bounded leases/retries and typed non-secret receipts. Preserve legal holds and immutable decisions. Dead letters require source/provider reconciliation before replay.

Production SSO/IdP onboarding, regulatory and contract source agreements, qualified interpretation, retention schedules, and security/legal certification remain external gates. Historical `.env` files require Git-history review and credential rotation; this repository does not assert that any value was safe or unused.
