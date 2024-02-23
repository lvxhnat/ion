# Using python:3.9 resulted in unable to start new thread issue
# https://stackoverflow.com/questions/70087344/python-in-docker-runtimeerror-cant-start-new-thread
FROM python:3.9-bullseye 

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/data-backend

COPY ../../data-backend .
RUN pip install --upgrade pip
RUN pip install -e . --no-cache-dir

EXPOSE 1236
CMD ["uvicorn", "data_backend.app.main:app", "--host", "0.0.0.0", "--port", "1236"]