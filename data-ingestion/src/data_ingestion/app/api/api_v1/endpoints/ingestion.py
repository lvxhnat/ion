import csv
from starlette.datastructures import FormData, UploadFile
from typing import Dict, List, Optional, Union, Tuple
from sqlalchemy.orm import Session
from fastapi import APIRouter, UploadFile, File, Depends, Request

from data_ingestion.app.api.api_v1.models.ingestion import (
    UserUploadQuery,
    UserTableQuery,
)

from ion_clients.core.utils.type_detect import detect_types, TypeDetectEntry
from ion_clients.services.postgres.mapper import initialise_dynamic_table
from ion_clients.services.postgres.schemas.infra.ingestion import (
    UserUploadTables,
)
from ion_clients.services.postgres.actions import (
    order_search,
    get_session,
    paginate_table_by_id,
)

router = APIRouter(
    prefix="/ingestion",
    tags=["ingestion"],
)


@router.post("/retrieveUserUploads")
async def retrieve_files(
    params: UserUploadQuery, session: Session = Depends(get_session)
):

    return order_search(
        TableSchema=UserUploadTables,
        session=session,
        filters=[UserUploadTables.user_id.like(params.user_id)],
        first=False,
    )


@router.post("/retrieveTable")
async def retrieve_table(
    params: UserTableQuery, session: Session = Depends(get_session)
):
    data: List[dict] = paginate_table_by_id(
        session,
        table_name=params.table_id,
        page=params.page,
        pagesize=params.pagesize,
    )

    table_entry = order_search(
        session=session,
        TableSchema=UserUploadTables,
        filters=[UserUploadTables.table_id.like(params.table_id)],
        first=True,
    )

    return {
        "file_name": table_entry["file_name"],
        "file_rows": table_entry["file_rows"],
        "content_header": [
            {"id": key, "headerName": key} for key in data[0].keys()
        ],
        "content_body": data,
    }


@router.post("/upload")
async def upload_file(
    request: Request,
    session: Session = Depends(get_session),
):

    formData: FormData = await request.form()
    file: UploadFile = formData.get("file")
    table_id: str = request.headers.get("table_id")

    if file.content_type == "text/csv":

        file_item: str = await file.read()
        file_size: int = len(file_item)  # File size in bytes
        file_item: List[str] = file_item.decode("utf-8").split("\n")

        header: List[str] = [
            i for i in file_item[0].split(",") if i.strip() != ""
        ]
        content: List[List[str]] = list(csv.reader(file_item[1:]))
        output: Tuple[
            List[List[str]], Dict[str, TypeDetectEntry]
        ] = detect_types(header, content)
        dtypes, content = output

        # Creates a table in our database

        initialise_dynamic_table(
            session, table_id, schema=dtypes, data=content
        )

        # Insert into user table
        entry = UserUploadTables(
            table_id=table_id,
            user_id="2100e95a-14fa-4716-a056-2aad204994f2",
            file_name=file.filename,
            file_size=file_size,
            file_rows=len(content),
            file_format=file.content_type,
        )

        session.add(entry)

        return {
            "file_name": file.filename,
            "file_rows": len(content),
            "content_header": list(dtypes.keys()),
            "content_body": content[:50],
            "dtypes": dtypes,
        }
