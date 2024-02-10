FROM python:3.9

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/data-ingestion

COPY ../../data-ingestion .
RUN pip install -e .

EXPOSE 1236
CMD ["uvicorn", "data_ingestion.app.main:app", "--host", "0.0.0.0", "--port", "1236"]