import csv
from typing import Union, List
from fastapi import APIRouter, UploadFile

router = APIRouter(
    prefix="/ingestion",
    tags=["ingestion"],
)


@router.post("/upload")
async def upload_file(file: Union[UploadFile, None] = None):
    if file.content_type == "text/csv":
        file_item: List[str] = file.file.read().decode("utf-8").split("\n")
        header: List[str] = [
            i for i in file_item[0].split(",") if i.strip() != ""
        ]
        content: List[List[str]] = list(csv.reader(file_item[1:]))
        return {
            "file_name": file.filename,
            "content_header": header,
            "content_body": content,
        }