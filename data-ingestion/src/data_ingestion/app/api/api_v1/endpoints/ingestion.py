import csv
from typing import Dict, List
from sqlalchemy.orm import Session
from fastapi import APIRouter, UploadFile, File, Depends

from data_ingestion.app.api.api_v1.models.ingestion import (
    UserUploadQuery, 
    UserUploadFile,
)

from ion_clients.core.utils.type_detect import detect_types, TypeDetectEntry
from ion_clients.services.postgres.mapper import initialise_dynamic_table
from ion_clients.services.postgres.schemas.infra.ingestion import (
    UserUploadTables,
)
from ion_clients.services.postgres.actions import order_search, get_session

router = APIRouter(
    prefix="/ingestion",
    tags=["ingestion"],
)


@router.post("/retrieveUserUploads")
async def retrieve_files(
    params: UserUploadQuery, session: Session = Depends(get_session)
):

    return order_search(
        UserUploadTables,
        session,
        [UserUploadTables.user_id.like(params.user_id)],
        first=False,
    )


@router.post("/upload")
async def upload_file(
    params: UserUploadFile, file: UploadFile = File(...), session: Session = Depends(get_session)
):
    if file.content_type == "text/csv":

        file_item: str = file.file.read()
        file_size: int = len(file_item)  # File size in bytes
        file_item: List[str] = file_item.decode("utf-8").split("\n")

        header: List[str] = [
            i for i in file_item[0].split(",") if i.strip() != ""
        ]
        content: List[List[str]] = list(csv.reader(file_item[1:]))

        dtypes: Dict[str, TypeDetectEntry] = detect_types(header, content)

        # Creates a table in our database
        initialise_dynamic_table(
            session, params.table_id, schema=dtypes, data=content
        )

        # Insert into user table
        entry = UserUploadTables(
            table_id=params.table_id,
            user_id="2100e95a-14fa-4716-a056-2aad204994f2",
            file_name=file.filename,
            file_size=file_size,
            file_format=file.content_type,
        )

        session.add(entry)

        return {
            "file_name": file.filename,
            "content_header": list(dtypes.keys()),
            "content_body": content,
            "dtypes": dtypes,
        }
