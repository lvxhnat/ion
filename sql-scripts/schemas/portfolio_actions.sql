CREATE TABLE IF NOT EXISTS "portfolio_actions" (
	"action_id" CHAR(36) PRIMARY KEY,
	"portfolio_id" CHAR(36) REFERENCES user_portfolios("portfolio_id") ON UPDATE CASCADE ON DELETE CASCADE,
    "action_date" TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
	"action" VARCHAR(10) NOT NULL, -- Allow only Deposit or Withdrawal values, checked on insertion
    "value" NUMERIC(15, 5) NOT NULL,
    "currency" CHAR(3) NOT NULL, -- SGD, USD etc
	"last_modified" TIMESTAMPTZ NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')
);
