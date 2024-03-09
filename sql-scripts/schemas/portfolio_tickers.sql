CREATE TABLE IF NOT EXISTS "portfolio_tickers" (
	"transaction_id" CHAR(36) PRIMARY KEY,
	"portfolio_id" CHAR(36) REFERENCES user_portfolios("portfolio_id") ON UPDATE CASCADE ON DELETE CASCADE,
	"ticker" VARCHAR(25) NOT NULL,
    "units" NUMERIC(10,2) NOT NULL, 
    "type" VARCHAR(8) NOT NULL, -- Allow only Buy, Sell, Split, Dividend values, checked on insertion
    "remarks" VARCHAR NULL,
	"last_modified" TIMESTAMPTZ NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')
);
