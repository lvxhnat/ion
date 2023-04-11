import re
import certifi
import requests
from datetime import datetime
from ion_clients.clients.usdept.types.treasury import (
    TreasuryTypes,
    TreasuryInfoDTO,
)

base_url = (
    lambda year, treasury_type: f"https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/{year}/all?type={treasury_type}&field_tdr_date_value={year}&page&_format=csv"
)

treasury_types = {
    "YIELD_CURVE": "daily_treasury_yield_curve",
    "BILL_RATES": "daily_treasury_bill_rates",
    "LONG_TERM_RATE": "daily_treasury_long_term_rate",
    "REAL_YIELD_CURVE": "daily_treasury_real_yield_curve",
    "REAL_LONG_TERM": "daily_treasury_real_long_term",
}


def treasury_info(year: str, treasury_type: TreasuryTypes) -> TreasuryInfoDTO:

    data = requests.get(
        base_url(year, treasury_types[treasury_type]), verify=certifi.where()
    ).text.split("\n")

    cast = (
        lambda x, index: datetime.strptime(x, "%m/%d/%Y")
        if index == 0
        else (float(x) if x != "" else None)
    )
    cols = [
        *map(
            lambda x: "_{}".format(
                re.sub(" |-", "_", re.sub('"|\(|\>|\)', "", x))
            ).lower(),
            data[0].split(","),
        )
    ]

    d: TreasuryInfoDTO = []
    for row in data[1:]:
        d_item = {
            k: cast(v, i) for i, (k, v) in enumerate(zip(cols, row.split(",")))
        }
        # Get the current date extracted
        d_item["_last_updated"] = datetime.today()
        d.append(d_item)

    return d


if __name__ == "__main__":
    print(treasury_info(2000, "LONG_TERM_RATE"))
