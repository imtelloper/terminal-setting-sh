from fastapi import APIRouter, Body
import warnings
from starlette.responses import StreamingResponse
from services.streamService import StreamService
warnings.filterwarnings( 'ignore' )

router = APIRouter(
    tags=['stream'],
    responses={404: {"description": "not found"}, 200: {"description": "ok"}},
)

service = StreamService()

@router.get("/", response_description="")
async def streamVideo():
    return StreamingResponse(service.video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")


@router.get("/area/{coordinate}", response_description="")
async def streamVideoAreaSet(coordinate):
    data = coordinate.split(',')
    coordinates = [[]]
    coordiList = []
    for val in data:
        coordiList.append(int(val))
        if (len(coordiList) > 1):
            coordinates[0].append(tuple(coordiList))
            coordiList = []

    print('streamVideoAreaSet 2data :', coordinates)
    return StreamingResponse(service.video_streaming(coordinates), media_type="multipart/x-mixed-replace; boundary=frame")



