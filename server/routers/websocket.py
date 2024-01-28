from fastapi import APIRouter, WebSocket
import asyncio
import yfinance as yf
import numpy as np
import pandas as pd
import json
import warnings
import traceback

warnings.filterwarnings("ignore", category=FutureWarning, module="yfinance.*")

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        ticker = await websocket.receive_text()  # Receive ticker symbol from the client

        while True:
            stock = yf.Ticker(ticker)
            history = stock.history(period="1y")

            # Convert dates and prices to numpy arrays
            dates = history.index.strftime("%Y-%m-%d").to_numpy()
            prices = history["Close"].to_numpy()

            # Combine dates and prices into a list of dictionaries
            res = [{"date": date, "price": price} for date, price in zip(dates, prices)]
            await websocket.send_text(json.dumps(res))  # Send data to the client

            await asyncio.sleep(5)  # Frequency of data update
    except Exception as e:
        traceback.print_exc()  # Print full traceback for debugging
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()  # Ensure the WebSocket is closed properly
