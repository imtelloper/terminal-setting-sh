import logging
from bson import ObjectId
import config
from repo.baseRepo import *

logger = logging.getLogger(__name__)


class TempHumidityService:

    def getDataOne(self, id):
        return findOne(config.DB_NAME, config.TABLE_TAMPERATURE_HUMIDITY, {"_id": ObjectId(id)})

    async def addTempData(self, tempData: dict) -> dict:
        data = await insertOne(
            config.DB_NAME,
            config.TABLE_TAMPERATURE_HUMIDITY,
            tempData
        )
        newData = await self.getDataOne(data.inserted_id)
        return newData

    async def searchTempHumidities(self):
        tempHumidities = []
        async for tempHumidity in find(config.DB_NAME, config.TABLE_TAMPERATURE_HUMIDITY):
            tempHumidities.append(tempHumidity)
        return tempHumidities

    async def searchTempHumidity(self, id: str) -> dict:
        tempHumidity = await self.getDataOne(id)
        if tempHumidity:
            return tempHumidity

    async def removeTempHumidity(self, id: str):
        tempHumidity = await self.getDataOne(id)
        if tempHumidity:
            removedTempHumidity = await deleteOne(
                config.DB_NAME,
                config.TABLE_TAMPERATURE_HUMIDITY,
                {"_id": ObjectId(id)}
            )
            if removedTempHumidity:
                return True
            return False

    async def updateTempHumidity(self, id: str, data: dict):
        tempHumidity = await self.getDataOne(id)
        if tempHumidity:
            updatedTempHumidity = await updateOne(
                config.DB_NAME,
                config.TABLE_TAMPERATURE_HUMIDITY,
                {"_id": ObjectId(id)},
                {"$set": data}
            )
            if updatedTempHumidity:
                updated = await self.getDataOne(id)
                return updated

    async def searchRangeData(self, start: int, limit: int) -> dict:
        tempHumidities = []
        foundData = findRange(
            config.DB_NAME,
            config.TABLE_TAMPERATURE_HUMIDITY,
            start,
            limit
        )
        async for tempHumidity in foundData:
            tempHumidities.append(tempHumidity)
        return tempHumidities

    async def getDataCount(self):
        count = await dataCount(config.DB_NAME, config.TABLE_TAMPERATURE_HUMIDITY)
        print('getDataCount',count)
        return count
