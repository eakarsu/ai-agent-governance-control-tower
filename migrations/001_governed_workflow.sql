BEGIN;
CREATE TABLE IF NOT EXISTS governed_sources(tenant_id TEXT NOT NULL,id TEXT NOT NULL,provider TEXT NOT NULL,source_id TEXT NOT NULL,source_version TEXT NOT NULL,effective_at TIMESTAMPTZ NOT NULL,jurisdiction TEXT NOT NULL,payload_hash CHAR(64) NOT NULL,provenance JSONB NOT NULL,freshness_at TIMESTAMPTZ NOT NULL,deleted_at_source TIMESTAMPTZ,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),PRIMARY KEY(tenant_id,id),UNIQUE(tenant_id,provider,source_id));
CREATE TABLE IF NOT EXISTS governed_work_items(tenant_id TEXT NOT NULL,id TEXT NOT NULL,workflow_type TEXT NOT NULL,owner_id TEXT NOT NULL,state TEXT NOT NULL DEFAULT 'draft',version INTEGER NOT NULL DEFAULT 1,input JSONB NOT NULL,result JSONB NOT NULL,uncertainty JSONB NOT NULL,request_hash CHAR(64) NOT NULL,idempotency_key TEXT NOT NULL,created_by TEXT NOT NULL,approved_by TEXT,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),PRIMARY KEY(tenant_id,id),UNIQUE(tenant_id,workflow_type,idempotency_key));
CREATE TABLE IF NOT EXISTS governed_decisions(seq BIGSERIAL PRIMARY KEY,tenant_id TEXT NOT NULL,work_item_id TEXT NOT NULL,actor_id TEXT NOT NULL,event_type TEXT NOT NULL,reason TEXT,details JSONB NOT NULL DEFAULT '{}'::jsonb,created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),FOREIGN KEY(tenant_id,work_item_id) REFERENCES governed_work_items(tenant_id,id) ON DELETE RESTRICT);
CREATE TABLE IF NOT EXISTS governed_outbox(id BIGSERIAL PRIMARY KEY,tenant_id TEXT NOT NULL,work_item_id TEXT NOT NULL,provider TEXT NOT NULL,operation TEXT NOT NULL,payload JSONB NOT NULL,idempotency_key TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'queued',attempts INTEGER NOT NULL DEFAULT 0,lease_token UUID,lease_expires_at TIMESTAMPTZ,next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),provider_receipt JSONB,last_error_code TEXT,FOREIGN KEY(tenant_id,work_item_id) REFERENCES governed_work_items(tenant_id,id) ON DELETE RESTRICT,UNIQUE(tenant_id,provider,idempotency_key));
CREATE INDEX IF NOT EXISTS governed_work_state_idx ON governed_work_items(tenant_id,state,updated_at);CREATE INDEX IF NOT EXISTS governed_outbox_ready_idx ON governed_outbox(status,next_attempt_at);
CREATE OR REPLACE FUNCTION governed_decisions_append_only() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN RAISE EXCEPTION 'governed decisions are append-only';END $$;DROP TRIGGER IF EXISTS governed_decisions_append_only_trigger ON governed_decisions;CREATE TRIGGER governed_decisions_append_only_trigger BEFORE UPDATE OR DELETE ON governed_decisions FOR EACH ROW EXECUTE FUNCTION governed_decisions_append_only();
CREATE TABLE IF NOT EXISTS governance_app_users(
  email TEXT PRIMARY KEY,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin','manager','analyst')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','disabled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS governance_app_sessions(
  token_hash CHAR(64) PRIMARY KEY,
  user_email TEXT NOT NULL REFERENCES governance_app_users(email) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS governance_app_sessions_expiry_idx ON governance_app_sessions(expires_at);
COMMIT;
