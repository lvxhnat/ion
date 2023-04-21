# Ion

Ion is a web application designed to leverage OSINT and APIs to create a centralised information hub for data driven trading/market intelligence. It is powered by powerful charting systems (d3 charting written in a plugin architecture to allow customisability) and comes with its own ETL Prefect pipeline that schedules data extraction for larger data sources.

![](./assets/pages/main-page-preview.gif)

## Features

---

|          Home Page           |            Available Functions            |
| :--------------------------: | :---------------------------------------: |
| ![](./assets/pages/home.png) | ![](./assets/pages/function-explorer.png) |

|           ETF Explorer           |             Chart Explorer             |
| :------------------------------: | :------------------------------------: |
| ![](./assets/pages/etf-list.png) | ![](./assets/pages/chart-explorer.png) |

|             Grid Explorer             |             More Coming..             |
| :-----------------------------------: | :-----------------------------------: |
| ![](./assets/pages/grid-explorer.png) | ![](./assets/pages/grid-explorer.png) |

## Documentation

---

## Quick Start

---

#### Start base services - postgres, kafka servers. In `ion/docker`

```
docker compose -f "./docker-compose.base.yml" up
```

#### Start ETL pipelines. In `ion/data-engine`

```
prefect orion start
prefect agent start -q "common" "treasury"
python -m deployment
```

#### Start backend. In `ion/data-ingestion`

```
brew services start rabbitmq
uvicorn src.data_ingestion.app.main:app --reload --port 1236
```

#### Start frontend. In `ion/ion-frontend`

```
yarn start
```

## Architecture

---

<img align="left" src="./assets/architecture.drawio.svg" width="400" style="padding-right: 25px">

- `polar-frontend` aims to separate the general data marketplace from the main UI/UX of Ion, which is based around trading/financial/alternative data.

- `ion-frontend` handles the UI/UX of Ion, including the dashboard and the features seen below.

- `ion-user` handles the user authentication and storage of user details, which has its own database.

- `data-ingestion` handles the extraction of data from the database that `data-engine` writes to.

- `data-engine` handles the scraping of data that otherwise takes a long time to extract. E.g. Treasury data. This service writes to both MongoDB and PostgresSQL databases.

- `ion-clients` provides a unified package service that contains all of the code used by `data-ingestion` and `data-engine` services, including database schemas.

<br clear="left"/>

## Data Sources

---

|         Status         |                          Prompt                          |
| :--------------------: | :------------------------------------------------------: |
|         Online         | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) |
| Work in Progress (WIP) | ![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) |
|          Bug           | ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png) |

|       Data Provider       |                   Data                   |      Repo       |                          Status                          |      Pages Using      |       Retrieval       |
| :-----------------------: | :--------------------------------------: | :-------------: | :------------------------------------------------------: | :-------------------: | :-------------------: |
|     Open Weather API      |                 Weather                  |   ion-clients   | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) |     Home (Widget)     |       On-Demand       |
| US Department of Treasury |              Treasury Rates              |   ion-clients   | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) |     Home (Widget)     |       Scheduled       |
|         Oanda API         |      Live and Historical Forex Data      |   ion-clients   | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) |     Home (Widget)     |       On-Demand       |
|         Geonames          | Geographical Names with Lat and Lon Data |   ion-clients   | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) | Home (Weather Widget) |       Scheduled       |
|           ETFDB           |        ETF Metadata and Database         | pyETFDB-scraper | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) |       ETF List        | Scheduled + On-Demand |
|        Finnhub API        |      Daily Historical Ticker Prices      |   ion-clients   | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) |       ETF List        |       On-Demand       |

## Contributing

---

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

---

[MIT](https://choosealicense.com/licenses/mit/)

