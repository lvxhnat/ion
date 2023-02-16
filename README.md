# Ion

Ion is a web application designed to leverage OSINT and common financial application features to create a centralised information hub for investment and CA decisions.

## Documentation

---

## Quick Start

---

```
# Start base services - postgres, kafka servers. In ion/docker
docker compose -f "./docker-compose.base.yml" up

# Start ETL pipelines. In ion/data-engine
prefect orion start
prefect agent start -q "common" "treasury"
python -m deployment

# Start backend. In ion/data-ingestion
uvicorn src.data_ingestion.app.main:app --reload --port 1236

# Start frontend. In ion/ion-frontend
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

Data Provider              |  Data                       |  Repo                    |  Status                 | Pages Using
:-------------------------:|:-------------------------:|:-------------------------:|:-------------------------: | :-------------------------: 
Open Weather API | Weather | ion-clients | <div style="width:10px;height:10px;background-color:green;display:inline-block;"></div> <span> Online </span> | Home (Widget)
US Department of Treasury | Treasury Rates | ion-clients | <div style="width:10px;height:10px;background-color:green;display:inline-block;"></div> <span> Online </span> | Home (Widget)
Oanda API | Live and Historical Forex Data | ion-clients | <div style="width:10px;height:10px;background-color:green;display:inline-block;"></div> <span> Online </span> | Home (Widget)
Geonames | Geographical Names with Lat and Lon Data | ion-clients | <div style="width:10px;height:10px;background-color:green;display:inline-block;"></div> <span> Online </span> | Home (Weather Widget)
ETFDB | ETF Metadata and Database | pyETFDB-scraper | <div style="width:10px;height:10px;background-color:green;display:inline-block;"></div> <span> Online </span> | ETF List

## Contributing

---

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

---

[MIT](https://choosealicense.com/licenses/mit/)
