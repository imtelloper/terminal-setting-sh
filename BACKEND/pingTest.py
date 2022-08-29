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

    for i in range(1,255):
        ip = "192.168.0.{}".format(i)
        task = asyncio.ensure_future(ping(ip))
        tasks.append(task)

    await asyncio.gather(*tasks, return_exceptions = True)




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

    # home_network = "192.168.0."
    # mine = []
    # for i in range(1, 5):
    #     z = home_network + str(i)
    #     result = os.system("ping -c 1 " + str(z))
    #     if result == 0:
    #         mine.append(z)
    #     for j in mine:
    #         print("host ", j, " is up")

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
            response = requests.get('http://'+addr+":81", timeout=0.008)


            if response.status_code == 200:
                print(addr)
                print(response.status_code)
                print(response.json())

        except Exception as e:
            pass

    print("3=======================================time :", time.time() - start)
