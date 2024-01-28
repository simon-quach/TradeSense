from fastapi import APIRouter, WebSocket
from dotenv import load_dotenv
import os
import asyncio
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

router = APIRouter()

client = OpenAI(
    organization="org-Fk56Pol0i7pW7x9Ep8lbv7e0",
)


async def call_openai_api(prompt: str):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )
    return response.choices[0].message.content


class GenerateRequest(BaseModel):
    prompt: str


@router.post("/generate")
async def generate_text(request: GenerateRequest):
    try:
        response = await call_openai_api(request.prompt)
        return response
    except Exception as e:
        print(e)
