import csv
from typing import Dict, List
from fastapi import APIRouter, UploadFile, File

from ion_clients.core.utils.type_detect import detect_types, TypeDetectEntry

router = APIRouter(
    prefix="/ingestion",
    tags=["ingestion"],
)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type == "text/csv":

        file_item: str = file.file.read()
        file_size: int = len(file_item) # File size in bytes
        file_item: List[str] = file_item.decode("utf-8").split("\n")
        
        header: List[str] = [
            i for i in file_item[0].split(",") if i.strip() != ""
        ]
        content: List[List[str]] = list(csv.reader(file_item[1:]))

        dtypes: Dict[str, TypeDetectEntry] = detect_types(header, content)

        return {
            "file_name": file.filename,
            "content_header": header,
            "content_body": content,
            "dtypes": dtypes,
        }
