import os
import pytest
import sys

from httpx import AsyncClient

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
baseUrl = "http://127.0.0.1:8000/api/temperature-humidity"


@pytest.mark.asyncio
async def test_saveTempHumidity():
    global id, createdAt, timeStamp
    async with AsyncClient(base_url=baseUrl) as client:
        response = await client.post("", json={
            "temperature": 36.5,
            "humidity": 30,
            "weatherTemp": 27.5,
            "weather": "sunny",
            "ip": "123",
        })
        id = response.json()['_id']
        createdAt = response.json()['createdAt']
        timeStamp = response.json()['timeStamp']

        assert response.status_code == 200


@pytest.mark.asyncio
async def test_getTempHumidity():
    async with AsyncClient(base_url=baseUrl) as client:
        response = await client.get("/{id}".format(id=id))
        assert response.status_code == 200
        assert response.json() == {
            "_id": id,
            "createdAt": createdAt,
            "timeStamp": timeStamp,
            "temperature": 36.5,
            "humidity": 30,
            "weatherTemp": 27.5,
            "weather": "sunny",
            "ip": "123",
        }


@pytest.mark.asyncio
async def test_modifyTempHumidity():
    async with AsyncClient(base_url=baseUrl) as client:
        response = await client.put("/{id}".format(id=id), json={
            "temperature": 36.5,
            "humidity": 35,
            "weatherTemp": 27.5,
            "weather": "sunny",
            "ip": "123"
        })
        assert response.status_code == 200
        assert response.json() == {
            "_id": id,
            "createdAt": createdAt,
            "timeStamp": timeStamp,
            "temperature": 36.5,
            "humidity": 35,
            "weatherTemp": 27.5,
            "weather": "sunny",
            "ip": "123",
        }


@pytest.mark.asyncio
async def test_deleteTempHumidity():
    async with AsyncClient(base_url=baseUrl) as client:
        response = await client.delete("/{id}".format(id=id))
        assert response.status_code == 200
        assert response.json() == True


@pytest.mark.asyncio
async def test_getRangeData():
    async with AsyncClient(base_url=baseUrl) as client:
        response = await client.get("/{start}/{limit}".format(start=0, limit=1))
        assert response.status_code == 200


@pytest.mark.asyncio
async def test_getCount():
    async with AsyncClient(base_url=baseUrl) as client:
        response = await client.get("/count/")
        assert response.status_code == 200
        assert type(response.json()) == int
