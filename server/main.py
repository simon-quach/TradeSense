# Filename: websocket_server.py
from fastapi import FastAPI
import yfinance as yf
from routers.websocket import router as websocket
from routers.openai import router as openai
from routers.scrape import router as scraper
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(websocket)
app.include_router(openai, prefix="/openai")
app.include_router(scraper, prefix="/scrape")


@app.get("/stock/{ticker}")
async def get_stock(ticker: str):
    stock = yf.Ticker(ticker)
    stock_info = stock.info
    return stock_info
