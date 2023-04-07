FROM python:3.9.16-buster

COPY ../../ion-clients/ /external/ion-clients
RUN pip install -e /external/ion-clients

COPY ../../data-ingestion/ /app
RUN pip install -e /app

WORKDIR /app

RUN rm -rf /external/ion-clients

# start app
CMD ["uvicorn", "src.data_ingestion.app.main:app", "--reload", "--port", "1236"]