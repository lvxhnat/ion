FROM prefecthq/prefect:2.7-python3.9

COPY . .

RUN pip install --upgrade pip
# RUN python -m pip install -e . 
RUN python -m pip install --index-url https://test.pypi.org/simple/ "ion-client"

RUN python -m deployment