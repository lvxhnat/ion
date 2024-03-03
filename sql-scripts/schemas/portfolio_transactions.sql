CREATE TABLE IF NOT EXISTS "portfolio_transactions" (
	"transaction_id" CHAR(36) PRIMARY KEY,
	"portfolio_id" CHAR(36) REFERENCES user_portfolios("portfolio_id") ON UPDATE CASCADE ON DELETE CASCADE,
	"ticker" VARCHAR(10) NOT NULL,
    "transaction_date" TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
    "units" NUMERIC(10,2) NOT NULL, 
    "fees" NUMERIC(10, 5) NOT NULL,
    "execution_price" NUMERIC(15, 5) NOT NULL,
    "type" VARCHAR(4) NOT NULL, -- Allow only Buy or Sell values, checked on insertion
    "broker" VARCHAR NULL,
    "remarks" VARCHAR NULL,
	"last_modified" TIMESTAMPTZ NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')
);
