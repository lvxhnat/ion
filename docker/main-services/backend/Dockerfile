FROM python:3.9.16-buster

WORKDIR /app

COPY ../../data-ingestion/ ./
COPY ../../ion-clients/ /external/ion-clients

RUN pip install -e . && pip install -e /external/ion-clients
RUN rm -rf /external/ion-clients

# start app
CMD ["uvicorn", "src.data_ingestion.app.main:app", "--reload", "--port", "1236"]