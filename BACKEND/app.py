import os

os.system('python /home/interx/SAFETY-AI/BACKEND/controlTowerFinder.py')

import platform
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.mongoDB import *
from routers.utilRouter import router as UtilRouter
from routers.streamRouter import router as StreamRouter
from routers.authRouter import router as AuthRouter
from routers.observeRouter import router as ObserveRouter
from routers.archiveRouter import router as ArchiveRouter
from routers.trackerRouter import router as TrackerRouter
from routers.configRouter import router as ConfigRouter
from routers.controlTowerRouter import router as ContorlTowerRouter
import logging.config
import warnings
from fastapi.responses import FileResponse

warnings.filterwarnings('ignore')

# load_dotenv(dotenv_path=f".{os.getenv('DOT_ENV', 'test')}.env")
# logging.config.fileConfig("logging.conf", disable_existing_loggers=False)
logger = logging.getLogger(__name__)

print('app start')
print('platform.system: ', platform.system())
print('platform.platform: ', platform.platform())


# def speak(text):
#     tts = gTTS(text=text, lang='ko')
#     filename = 'voice.mp3'
#     tts.save(filename)
#     playsound.playsound(filename)
#
# speak("안녕하세요")

# s = gTTS("Sample Text")
# s.save('sample.mp3')
# playsound('sample.mp3')

def createApp() -> FastAPI:
    app = FastAPI()
    return app


app = createApp()
app.router.redirect_slashes = False

# origins = [
#     "http://localhost",
#     "http://127.0.0.1",
# "http://localhost:8080",
# ]

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/{saveFolder}/{dateFolder}/{areaFolder}/{camPortFolder}/{fileTypeFolder}/{file}")
async def main(saveFolder, dateFolder, areaFolder, camPortFolder, fileTypeFolder, file):
    return FileResponse(
        "/home/interx/SAFETY-AI/BACKEND/{0}/{1}/{2}/{3}/{4}/{5}".format(saveFolder, dateFolder, areaFolder,
                                                                        camPortFolder, fileTypeFolder, file))


@app.get("/")
async def greeting():
    return 'hi'


# routers
app.include_router(UtilRouter, prefix="/api/util")
app.include_router(StreamRouter, prefix="/api/stream")
app.include_router(AuthRouter, prefix="/api/auth")
app.include_router(ObserveRouter, prefix="/api/observe")
app.include_router(ArchiveRouter, prefix="/api/archive")
app.include_router(TrackerRouter, prefix="/api/tracker")
app.include_router(ConfigRouter, prefix="/api/config")
app.include_router(ContorlTowerRouter, prefix="/api/control-tower")


@app.on_event("startup")
async def onAppStart():
    print("############ SERVER START ############")
    await connectMongo()


@app.on_event("shutdown")
async def onAppShutdown():
    print("############ SERVER DOWN ############")
    await disconnectMongo()
