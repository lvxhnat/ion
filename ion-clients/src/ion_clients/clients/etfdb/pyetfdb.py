import re
import time
import json
import warnings
import requests
from itertools import cycle
from typing import Union
from bs4 import BeautifulSoup, Tag
from urllib3.exceptions import NewConnectionError


class ETFScraper(object):
    def __init__(self):

        self.base_url: str = "https://etfdb.com/etf"
        self.api_url: str = "https://etfdb.com/api/screener/"

        self.h4_regex = re.compile("h4")
        self.vitals_regex_header = re.compile("Vitals")
        self.dbtheme_regex_header = re.compile("ETF Database Themes")
        self.factset_regex_header = re.compile("FactSet Classifications")
        self.tradedata_regex_header = re.compile("Trading Data")
        self.histdata_regex_header = re.compile("Historical Trading Data")
        self.altetfs_regex_header = re.compile("Alternative ETFs in the ETF")
        self.altetfs2_regex_header = re.compile(
            "Alternative ETFs in the FactSet"
        )
        self.etfdividend_regex_header = re.compile("ETF Dividend")
        self.taxanalysis_regex_header = re.compile("Tax Analysis")
        self.holdingscomparison_regex_header = re.compile("Holding Comparison")
        self.sizecomparison_regex_header = re.compile("Size Comparison")
        self.ratings_regex_header = re.compile("RealTime Ratings")
        self.volatility_regex_header = re.compile("Volatility Analysis")

        self.user_agents = cycle(
            [
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.3",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.3",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6,2 Safari/605.1.1",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.3",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.5",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/113.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42",
                "Mozilla/5.0 (Windows NT 6.1; rv:109.0) Gecko/20100101 Firefox/113.",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.3",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.3",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.58",
                "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.4",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.3",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.84",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0",
                "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/113.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 OPR/98.0.0.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.48",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.3",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.3",
                "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Geck",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.10",
                "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 OPR/95.0.0.",
                "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Geck",
                "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.3",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.6",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0 (Edition beta",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36 Edg/84.0.522.52",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 YaBrowser/23.5.0.2256 Yowser/2.5 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.68",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.4.603 Yowser/2.5 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64; rv:99.0) Gecko/20100101 Firefox/99.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.69",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.76",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.63",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.39",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.34",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134",
                "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36  SberBrowser/3.1.0.0",
                "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.2; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET4.0E; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C)",
                "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54",
                "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
                "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:35.0) Gecko/20100101 Firefox/35.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Whale/3.20.182.14 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 YaBrowser/23.5.0.2199 Yowser/2.5 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 OPR/99.0.0.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.5050.0 Iron Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; ; NCLIENT50_AAP24E8CE9B271) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Whale/3.20.182.14 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0",
                "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36",
                "Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
                "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0",
                "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:109.0) Gecko/20100101 Firefox/113.0",
                "Mozilla/5.0 (X11; CrOS armv7l 13597.84.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36",
                "Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0",
                "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.71",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.81 Safari/537.36 Edg/104.0.1293.54",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 Edg/100.0.1185.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36 Edg/102.0.1245.39",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 Edg/103.0.1264.49",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.134 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.80 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.41",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.35",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.41",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.49",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36 Edg/110.0.1587.50",
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 YaBrowser/23.3.3.719 Yowser/2.5 Safari/537.36",
            ]
        )

    def get_ticker_list(self):
        data = requests.post(
            self.api_url,
            json={
                "tab": "returns",
                "page": 1,
                "per_page": 5000,
                "only": ["meta", "data", None],
            },
            headers={
                "User-Agent": next(self.user_agents),
            },
        ).json()
        return [
            *map(
                lambda entry: {
                    "symbol": entry["symbol"]["text"],
                    "name": entry["name"]["text"],
                },
                data["data"],
            )
        ]

    def get_ticker(self, ticker: str):
        soup = self.__request_ticker(ticker)
        etf_ticker_body_soup = soup.find("div", {"id": "etf-ticker-body"})
        return {
            "etf_name": " ".join(
                etf_ticker_body_soup.find("h2").contents
            ).replace("\n", ""),
            "description": self._get_analyst_report(etf_ticker_body_soup),
            **self._scrape_div_class_ticker_assets(
                etf_ticker_body_soup, self.vitals_regex_header
            ),
            **self._scrape_div_class_ticker_assets(
                etf_ticker_body_soup, self.dbtheme_regex_header
            ),
            **self._scrape_table(
                etf_ticker_body_soup, text=self.factset_regex_header
            ),
            **self._scrape_table(
                etf_ticker_body_soup, text=self.altetfs_regex_header, columns=6
            ),
            **self._scrape_table(
                etf_ticker_body_soup,
                text=self.altetfs2_regex_header,
                columns=6,
            ),
            **self._scrape_table(
                etf_ticker_body_soup,
                tag=etf_ticker_body_soup.find(
                    "div", {"id": "expense_tab"}
                ).find("table"),
                text=self.taxanalysis_regex_header,
            ),
            "expense_ratio": [
                {"".join(entry[0].contents): "".join(entry[3].contents)}
                for entry in [
                    [*filter(lambda s: isinstance(s, Tag), tag.contents)]
                    for tag in etf_ticker_body_soup.find(
                        "div", {"id": "expense_tab"}
                    )
                    .find_all("div", class_="row")[3]
                    .find_all("div", {"class": "col-md-4 col-sm-4 col-xs-4"})
                ]
            ],
            "top_holdings": self._get_top_holdings(etf_ticker_body_soup),
            "holding_comparison": self._scrape_table(
                etf_ticker_body_soup,
                text=self.holdingscomparison_regex_header,
                tag=etf_ticker_body_soup.find(
                    "table", {"id": "holdings-table"}
                ),
                columns=4,
            ),
            "size_comparison": self._scrape_table(
                etf_ticker_body_soup,
                text=self.sizecomparison_regex_header,
                tag=etf_ticker_body_soup.find("table", {"id": "size-table"}),
                columns=4,
            ),
            "holding_analyis": self._get_holdings_analysis(
                etf_ticker_body_soup
            ),
        }

    def _get_holdings_analysis(self, ticker_profile_soup):

        charts_data = ticker_profile_soup.find_all(
            "table", class_="chart base-table"
        )

        parse_data = []
        chart_series = [x.get("data-chart-series") for x in charts_data]
        chart_series_dicts = [json.loads(series) for series in chart_series]
        for chart_dict in chart_series_dicts:
            parse_data.append({x["name"]: x["data"][0] for x in chart_dict})

        return parse_data

    def _get_top_holdings(self, ticker_profile_soup):
        results = []
        try:
            tbody = ticker_profile_soup.find(
                "div", {"id": "holding_section"}
            ).find("tbody")
            holdings = [x for x in tbody.find_all("tr")]
            for record in holdings:
                record_texts = record.find_all("td")
                try:
                    holding_url = (
                        "https://etfdb.com" + record.find("a")["href"]
                    )
                except TypeError as e:
                    holding_url = ""
                texts = dict(
                    zip(
                        ["Symbol", "Holding", "Share"],
                        [x.text for x in record_texts],
                    )
                )
                texts.update({"Url": holding_url})
                results.append(texts)
        except AttributeError:
            results = []

        return results

    def _get_analyst_report(self, ticker_profile_soup) -> str:
        """Get the text description of the ETF based on Analyst Report

        Example Return
        ===============
        'This fund offers exposure to one of the world’s most famous metals, gold.....'
        """
        for entry in ticker_profile_soup.find("div", class_="row").find_all(
            "p"
        ):
            # Make sure the tags arent empty. since tags like <p></p> exists.
            if entry.contents:
                # Remove tags like <caps> in our description string
                cleaned_desc = "".join(
                    [
                        *map(
                            lambda s: self._unpack_tag_contents(s)
                            if not isinstance(s, str)
                            else s,
                            entry.contents,
                        )
                    ]
                )
        return cleaned_desc

    def __request_ticker(self, ticker: str, retries: int = 3) -> BeautifulSoup:
        scrape_url: str = f"{self.base_url}/{ticker}"
        try:
            response: requests.Response = requests.get(
                scrape_url,
                headers={
                    "User-Agent": next(self.user_agents),
                },
            )
            if response.status_code == 200:
                soup = BeautifulSoup(response.text)
                return soup
            elif response.status_code == 429:
                warnings.warn(
                    "Too many requests. Sleeping for 60 seconds and retrying..."
                )
                time.sleep(60)
                response: requests.Response = requests.get(
                    scrape_url,
                    headers={
                        "User-Agent": next(self.user_agents),
                    },
                )
                soup = BeautifulSoup(response.text)
                return soup
            else:
                raise Exception(
                    f"Request failed for {scrape_url}. Response code {str(response.status_code)}. Error string {response.text}"
                )
        except OSError as oex:
            if retries:
                self.__request_ticker(ticker, retries=retries - 1)
            else:
                raise
        except NewConnectionError as nex:
            warnings.warn(f"{str(nex)}. Rotating to next ip address.")
            if retries:
                self.__request_ticker(ticker, retries=retries - 1)
            else:
                raise
        except Exception:
            raise

    def _scrape_div_class_ticker_assets(
        self,
        soup,
        text: re.Pattern,
    ):
        """General scraper function to extract text with class tag of 'ticker-assets'"""
        g_tag: Tag = self._jump_siblings(
            soup.find("h3", class_=self.h4_regex, text=text), 2
        )
        g_dict = {}
        for entry in g_tag.find_all("div", class_="row"):
            span_content = entry.find_all("span")
            row_text: str = self._unpack_tag_contents(span_content[1])
            row_key: str = span_content[0].contents[0]

            g_dict[row_key] = row_text

        return g_dict

    def _scrape_table(
        self,
        ticker_profile_soup,
        text: re.Pattern,
        tag: Tag = None,
        columns: int = 2,
    ):

        if not tag:
            header_tag: Tag = ticker_profile_soup.find(
                "h3", class_=self.h4_regex, text=text
            )
            if header_tag:
                table_rows = self._jump_siblings(header_tag, 2)
            else:
                return None
        if tag:
            if isinstance(tag, Tag):
                table_rows = tag
            else:
                raise ValueError(
                    f"Tag provided if of type {str(type(tag))} which is not allowed."
                )

        table_dict = {}
        table_content = []

        table_rows = table_rows.find_all("td")

        for i in range(0, len(table_rows), columns):
            # print(table_rows[i])
            if table_rows[i + 1].has_attr("data-th"):
                entry = {}
                for inc in range(columns):
                    # Remove new line if it is a string, otherwise get the contents of the inner tag
                    cleaned_content = [
                        *map(
                            self._unpack_tag_contents,
                            table_rows[i + inc].contents,
                        )
                    ]
                    entry_contents = [item for item in cleaned_content if item]
                    entry[table_rows[i + inc]["data-th"]] = (
                        entry_contents[0].replace("\n", "")
                        if entry_contents
                        else ""
                    )
                table_content.append(entry)
            else:
                table_dict[table_rows[i].contents[0].replace("\n", "")] = [
                    table_rows[i + inc].contents[0].replace("\n", "")
                    for inc in range(1, columns)
                ]

        if table_rows[i + 1].has_attr("data-th"):
            return {text.pattern: table_content}
        else:
            return table_dict

    def _jump_siblings(self, root_tag: Tag, jumps: int) -> Union[Tag, str]:
        """Jump to the next ```jump``` sibling (The number of element tag after the current one stated)"""
        if jumps == 0:
            return root_tag
        else:
            return self._jump_siblings(root_tag.next_sibling, jumps - 1)

    def _unpack_tag_contents(self, tag: Tag) -> str:
        """There are instances where tag contents might contain nested tags. This function unpacks those tags and joins them to form one coherent content. E.g.
        <td><strong><italic> sssss </italic></strong></td> --> ssss
        """
        if isinstance(tag, str):
            return tag.replace("\n", "")
        else:
            return "".join([*map(self._unpack_tag_contents, tag.contents)])


if __name__ == "__main__":
    etf_scraper = ETFScraper()
    # test = etf_scraper.get_ticker_list()
    print(etf_scraper.get_ticker("SPY"))
