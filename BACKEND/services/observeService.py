from bson import ObjectId
import config
from repo.baseRepo import *
import re
import datetime


'''
Change below variables
- class name
- self.dbName =
- self.tableName =
'''

class ObserveService:
    def __init__(self):
        self.dbName = config.DB_NAME
        self.tableName = config.TABLE_OBSERVE

    def getDataOne(self, id):
        return findOne(self.dbName, self.tableName, {"_id": ObjectId(id)})

    async def searchDatas(self, data: dict):
        dataArr = []
        async for val in findDatas(self.dbName, self.tableName, data):
            dataArr.append(val)
        return dataArr

    async def addOneData(self, data: dict) -> dict:
        resultData = await insertOne(self.dbName, self.tableName, data)
        newData = await self.getDataOne(resultData.inserted_id)
        return newData

    async def searchOneData(self, id: str) -> dict:
        resultData = await self.getDataOne(id)
        if resultData:
            return resultData

    async def removeOneData(self, id: str):
        data = await self.getDataOne(id)
        if data:
            removedData = await deleteOne(self.dbName, self.tableName, {"_id": ObjectId(id)})
            if removedData:
                return True
            return False

    async def updateOneData(self, id: str, data: dict):
        resultData = await self.getDataOne(id)
        copyData = data.copy()
        for key in data.keys():
            if data[key] == None:
                copyData.pop(key)

        if resultData:
            updatedData = await updateOne(
                self.dbName, self.tableName, {"_id": ObjectId(id)}, {"$set": copyData}
            )
            if updatedData:
                updatedResult = await self.getDataOne(id)
                return updatedResult

    async def searchRangeData(self, start: int = 0, limit: int = 10) -> dict:
        dataArr = []
        foundData = findRange(self.dbName, self.tableName, start, limit)
        async for data in foundData:
            dataArr.append(data)
        return dataArr

    async def getDataCount(self, data: dict):
        count = await dataCount(self.dbName, self.tableName, data)
        return count


    async def countOperatingTime(self, id, grpNum):
        currentDate = datetime.datetime.now().strftime('%Y-%m-%d')
        dataArr = []
        searchedData = findDatas(self.dbName, self.tableName, {
            "trackerId": ObjectId(id),
            "date": currentDate,
            "groupNum": int(grpNum),
        })
        async for val in searchedData:
            dataArr.append(val)
        foundData = dataArr[0]
        startTime = foundData['observeTime']
        observeSwitch = foundData['observeSwitch']

        if observeSwitch is True:
            endTime = datetime.datetime.now()
            resultTime = endTime - startTime
            replaceResultTime = str(resultTime).replace(" ", "")
            resultList = re.split(r'days,|:', replaceResultTime)
            if len(resultList) == 4:
                result = ("{}일 {}시간 {}분").format(resultList[0], resultList[1], resultList[2])
            else:
                result = ("{}시간 {}분").format(resultList[0], resultList[1])
        else:
            result = "00시간 00분"
        return result
