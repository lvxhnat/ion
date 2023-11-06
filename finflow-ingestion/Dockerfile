FROM python:3.9

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/finflow-ingestion

# Install the project in editable mode
COPY . .

RUN pip install -e .

EXPOSE 8000