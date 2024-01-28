# 
FROM python:3.12

# 
WORKDIR /code

# 
COPY ./server/requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# 
COPY ./server /code/

# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]