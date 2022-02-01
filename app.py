from typing import List
import warnings
warnings.simplefilter('ignore')

from fastapi import FastAPI, Body
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import numpy as np

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

class Note(BaseModel):
    freqs: List[int]

# rate=44100 #サンプリングレート　適当で構わないが、CDと同じにしておく
rate=5000
num = 200

#再生秒数
time = 1 / (rate / num)

@app.post('/create_sin_wave')
def create_sin_wave(body = Body(...)):
    if type(body) is list:
        freqs = body
    else:
        freqs = eval(body.decode())
    print(f'input: {freqs}')
    sin = np.zeros(num)
    for f in freqs:
        sin += np.sin(f * 2 * np.pi * np.linspace(0, time, num))

    sin = [float(x) for x in sin]
    return {'data': sin}

@app.get('/', response_class=FileResponse)
def index():
    return FileResponse('index.html')