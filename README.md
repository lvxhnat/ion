# Ion

Ion is a web application designed to leverage OSINT and common financial application features to create a centralised information hub for investment and CA decisions.

## Documentation

---

## Quick Start

---

### Start base services - postgres, kafka servers. In ```ion/docker```
```
docker compose -f "./docker-compose.base.yml" up
```

### Start ETL pipelines. In ```ion/data-engine```
```
prefect orion start
prefect agent start -q "common" "treasury"
python -m deployment
```

### Start backend. In ```ion/data-ingestion```
```
uvicorn src.data_ingestion.app.main:app --reload --port 1236
```

### Start frontend. In ```ion/ion-frontend```
```
yarn start
```

## Architecture

---

![](./assets/architecture.drawio.svg)

## Features

---

Home Page             |  Available Functions
:-------------------------:|:-------------------------:
![](./assets/home.png)  |  ![](./assets/function-explorer.png)

## Data Sources

---

Status              |     Prompt
:-------------------------:|:-------------------------:
Online | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png)
Work in Progress (WIP) | ![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png)
Bug | ![#ff0000](https://placehold.co/10x10/ff0000/ff0000.png)

Data Provider              |  Data                       |  Repo                    |  Status                 | Pages Using
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------: | :-------------------------: 
Open Weather API | Weather | ion-clients | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) | Home (Widget)
US Department of Treasury | Treasury Rates | ion-clients | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) | Home (Widget)
Oanda API | Live and Historical Forex Data | ion-clients | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) | Home (Widget)
Geonames | Geographical Names with Lat and Lon Data | ion-clients | ![#00bd11](https://placehold.co/10x10/00bd11/00bd11.png) | Home (Weather Widget)
ETFDB | ETF Metadata and Database | pyETFDB-scraper | ![#ffae00](https://placehold.co/10x10/ffae00/ffae00.png) | ETF List

## Contributing

---

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

---

[MIT](https://choosealicense.com/licenses/mit/)
