import os
import sys
import time
import requests
import asyncio

start = time.time()  # 시작 시간 저장


async def ping(host):
    """
    Prints the hosts that respond to ping request
    """
    ping_process = await asyncio.create_subprocess_shell("ping -c 1 " + host + " > /dev/null 2>&1")
    await ping_process.wait()

    if ping_process.returncode == 0:
        print(host)
    return


async def ping_all():
    tasks = []

    for i in range(1, 255):
        ip = "192.168.0.{}".format(i)
        task = asyncio.ensure_future(ping(ip))
        tasks.append(task)

    await asyncio.gather(*tasks, return_exceptions=True)


def getDatabaseIp():
    print('********************* getDatabaseIp start **********************')
    ipList = []
    # for num in range(2, 256):
    for num in range(2, 5):
        # ipAddr = "192.168.0." + str(num)+":81"
        ipAddr = "192.168.0." + str(num)
        # pingCmd = "ping -c 1 " + ipAddr+" -l 1"
        # pingCmd = "ping -c 1 " + ipAddr+" -i 0.02"
        pingCmd = "ping -c 1 " + ipAddr
        #
        #     # if response == 0:
        #     #     Netstatus = "Network Active"
        #     # else:
        #     #     Netstatus = "Network Error"
        #
        #     # response = os.system("ping -n 1 " + ipAddr)
        response = os.system(pingCmd)
        if response == 0:
            print(ipAddr)

    print('********************* getDatabaseIp end **********************')
    #     ipList.append(ipAddr)
    #     print(ipList)
    # else:
    #     continue

    # for list in ipList:
    #     connection = pymongo.MongoClient(list, 27017, connectTimeoutMS=1000)
    #     try:
    #         dbList = connection.list_database_names()
    #         return list
    #     except Exception as e:
    #         continue


if __name__ == '__main__':
    # getDatabaseIp()
    # asyncio.run(ping_all())
    print("1=======================================time :", time.time() - start)

    start = time.time()  # 시작 시간 저장
    # getDatabaseIp()
    print("2=======================================time :", time.time() - start)

    start = time.time()  # 시작 시간 저장
    for num in range(1, 256):
        addr = "192.168.0." + str(num)
        try:
            response = requests.get('http://' + addr + ":81/api/util/is-control-tower", timeout=0.008)

            if response.status_code == 200:
                pass

            if response.json() == '1':
                print(addr)
                # connection = pymongo.MongoClient(config.DB_ADDRESS)
                # self.dbSafety = connection.get_database("safety")
                os.system(
                    "sed -n -i -e '/^MONGO_ADDRESS/c\MONGO_ADDRESS=mongodb://interx:interx12!@" + addr + "':27017/interx -e '1,$p' /home/interx/SAFETY-AI/BACKEND/.env")

        except Exception as e:
            pass

    print("3=======================================time :", time.time() - start)
