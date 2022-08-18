from database.mongoDB import *

__all__ = [
    "insertOne",
    "find",
    "findOne",
    "findDatas",
    "updateOne",
    "deleteOne",
    "dataCount",
    "findRange",
    "detailFindRange",
]


async def insertOne(database: str, collection: str, param: dict):
    return await getConnection()[database][collection].insert_one(param)


def find(database: str, collection: str):
    return getConnection()[database][collection].find().sort("_id", -1)


def findDatas(database: str, collection: str, param: dict):
    return getConnection()[database][collection].find(param).limit(100)


async def findOne(database: str, collection: str, param: dict):
    return await getConnection()[database][collection].find_one(param)


async def updateOne(database: str, collection: str, objectId: dict, data: dict):
    return await getConnection()[database][collection].update_one(objectId, data)


async def deleteOne(database: str, collection: str, param: dict):
    return await getConnection()[database][collection].delete_one(param)


def dataCount(database: str, collection: str, data: dict):
    return getConnection()[database][collection].count_documents(data)


def findRange(database: str, collection: str, startNum: int, limitNum: int):
    return getConnection()[database][collection].find({}).sort("_id", -1).skip(startNum).limit(limitNum)


def detailFindRange(database: str, collection: str, param: dict, startNum: int, limitNum: int):
    return getConnection()[database][collection].find(param).sort("_id", -1).skip(startNum).limit(limitNum)
