FROM python:3.9

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/data-backend

COPY ../../data-backend .
RUN pip install -e .

EXPOSE 1236
CMD ["uvicorn", "data_backend.app.main:app", "--host", "0.0.0.0", "--port", "1236"]