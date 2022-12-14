# Ion

Ion is a web application designed to leverage OSINT and common financial application features to create a centralised information hub for investment and CA decisions.

## Documentation

## Quick Start

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

![](./assets/architecture.drawio.png)

---

## Features

---

![Alt Text](./assets/demo.gif)

docker-compose to be updated.

## Contributing

---

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

---

[MIT](https://choosealicense.com/licenses/mit/)
