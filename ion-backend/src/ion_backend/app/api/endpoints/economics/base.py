from datetime import datetime, timedelta, time
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from ion_backend.app.services.postgres.base import get_session
from ion_backend.app.services.postgres.tables import EconomicCalendar

router = APIRouter(tags=["economics"], prefix="/economics")


@router.get("/economic-calendar")
def get_portfolio(
    session: Session = Depends(get_session),
):
    query_result = (
        session.query()
        .with_entities(
            EconomicCalendar.name,
            EconomicCalendar.date,
            EconomicCalendar.fred_release_id,
        )
        .filter(
            EconomicCalendar.date.between(
                datetime.combine(datetime.now().date(), time()),
                (datetime.today() + timedelta(days=3)),
            )
        )
        .distinct()
        .order_by(EconomicCalendar.date.asc())
        .all()
    )

    # Convert query results to list of dictionaries
    result_list = [
        {"name": name, "date": date, "fred_release_id": fred_release_id}
        for name, date, fred_release_id in query_result
    ]

    return result_list
