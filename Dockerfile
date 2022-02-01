FROM python:3.9.7-slim

WORKDIR /app
COPY . /app

RUN pip install --upgrade pip && \
    pip install pipenv && \
    pipenv install

CMD ["pipenv", "run", "app"]
