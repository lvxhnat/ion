from typing import List

from sqlalchemy import Table
from sqlalchemy.orm import Session

def order_search(
    session: Session,
    /,
    filters: list,
    table_schema: Table,
    limit: int = 10,
    first: bool = True,
) -> dict:
    if first:
        return serialize_query(
            session.query(table_schema).filter(*filters).first()
        )
    else:
        return serialize_query(
            session.query(table_schema).filter(*filters).limit(limit).all()
        )

def serialize_query(query) -> List[dict]:
    if isinstance(query, list):
        return [
            {
                c.name: getattr(row, c.name)
                for c in row.__table__.columns
                if c.name != "uuid"
            }
            for row in query
        ]
    else:
        return {
            c.name: getattr(query, c.name)
            for c in query.__table__.columns
            if c.name != "uuid"
        }
