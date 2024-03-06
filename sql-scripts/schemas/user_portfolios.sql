CREATE TABLE IF NOT EXISTS "user_portfolios" (
	"portfolio_id" CHAR(36) PRIMARY KEY,
	"user_id" CHAR(36) REFERENCES users("user_id") ON UPDATE CASCADE ON DELETE CASCADE,
    "name" VARCHAR(100) NOT NULL,
	"description" VARCHAR NULL,
	"last_modified" TIMESTAMPTZ NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')
);
