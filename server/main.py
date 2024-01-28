# Filename: websocket_server.py
from fastapi import FastAPI
import yfinance as yf
from routers.websocket import router as websocket
from routers.openai import router as openai
from routers.scrape import router as scraper

app = FastAPI()

app.include_router(websocket, prefix="/ws")
app.include_router(openai, prefix="/openai")
app.include_router(scraper, prefix="/scrape")


@app.get("/stock/{ticker}")
async def get_stock(ticker: str):
    stock = yf.Ticker(ticker)
    stock_info = stock.info
    return stock_info
