from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_backend.app.config.postgres import PostgresTables
from ion_backend.app.services.postgres.base import get_session

router = APIRouter(
    tags=["postgres"],
)


@router.get("/{table_name}")
def get_table(
    table_name: str,
    session: Session = Depends(get_session),
):
    items = session.query(PostgresTables[table_name]).all()
    return items


@router.delete("/{table_name}")
def delete_table_entry(
    table_name: str,
    id: str,
    session: Session = Depends(get_session),
):
    entry = session.query(PostgresTables[table_name]).get(id)
    session.delete(entry)
    return


@router.post("/{table_name}")
def insert_table_entry(
    table_name: str,
    entry,
    session: Session = Depends(get_session),
):
    session.add(PostgresTables[table_name](**entry.dict()))
    return


@router.put("/{table_name}")
def update_table_entry(
    table_name: str,
    id: str,
    entry,
    session: Session = Depends(get_session),
):
    session.query(PostgresTables[table_name]).get(id).update(entry)
