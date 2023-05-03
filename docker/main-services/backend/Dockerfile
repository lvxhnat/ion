FROM python:3.9.16-buster

ENV APP_PATH="/data-ingestion"
RUN mkdir ${APP_PATH}
WORKDIR ${APP_PATH}

COPY ../../ion-clients/ /ion-clients
RUN pip install -e /ion-clients

COPY ../../data-ingestion/ ${APP_PATH}
RUN pip install --upgrade pip
RUN pip install -e .

# start app
CMD ["uvicorn", "src.data_ingestion.app.main:app", "--reload", "--port", "1236"]