from database.mongoDB import *

__all__ = [
    "insertOne",
    "find",
    "findOne",
    "updateOne",
    "deleteOne",
    "dataCount",
    "findRange",
]


async def insertOne(database: str, collection: str, param: dict):
    return await getConnection()[database][collection].insert_one(param)


def find(database: str, collection: str):
    return getConnection()[database][collection].find().sort("_id", -1)


async def findOne(database: str, collection: str, param: dict):
    return await getConnection()[database][collection].find_one(param)


async def updateOne(database: str, collection: str, objectId: dict, data: dict):
    return await getConnection()[database][collection].update_one(objectId, data)


async def deleteOne(database: str, collection: str, param: dict):
    return await getConnection()[database][collection].delete_one(param)


def dataCount(database: str, collection: str):
    return getConnection()[database][collection].count_documents({})


def findRange(database: str, collection: str, startNum: int, limitNum: int):
    return getConnection()[database][collection].find({}).sort("_id", -1).skip(startNum).limit(limitNum)
