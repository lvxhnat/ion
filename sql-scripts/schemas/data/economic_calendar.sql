CREATE TABLE IF NOT EXISTS "economic_calendar" (
	"entry_id" CHAR(36) PRIMARY KEY,
    "fred_release_id" VARCHAR NOT NULL, 
    "name" VARCHAR(150) NOT NULL,
    "date" TIMESTAMPTZ NOT NULL,
	"last_modified" TIMESTAMPTZ NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')
);
