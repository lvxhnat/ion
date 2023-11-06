FROM prefecthq/prefect:2.7-python3.9

WORKDIR /app

COPY ../ion-ingestion .
COPY ../ion-clients /external-dependencies

RUN pip install --upgrade pip

RUN pip install -e /external-dependencies
RUN pip install -e .

RUN ion provider deploy