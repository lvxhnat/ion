import uuid
from typing import List
from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Query, Request

from ion_backend.app.services.postgres.base import get_session
from ion_backend.app.services.postgres.tables import (
    UserPortfolios,
    PortfolioTickers,
)
from ion_backend.app.api.endpoints.portfolio.params import (
    CreateUserPortfolioParams,
    CreateTransactionParams,
)
from ion_backend.app.api.endpoints.portfolio.models import UserPortfolio
from ion_backend.app.api.endpoints.portfolio.statistics.functions import (
    import_data,
    calculate_position_pnls,
)


router = APIRouter(tags=["portfolio"], prefix="/portfolio")


@router.get("/portfolio")
def get_portfolio(
    portfolio_id: str = Query(None),
    session: Session = Depends(get_session),
) -> UserPortfolio:
    return (
        session.query(UserPortfolios)
        .filter(UserPortfolios.portfolio_id == portfolio_id)
        .first()
    )


@router.get("/user-portfolios")
def get_user_portfolios(
    user_id: str = Query(None),
    session: Session = Depends(get_session),
) -> List[UserPortfolio]:
    return (
        session.query(UserPortfolios)
        .filter(UserPortfolios.user_id == user_id)
        .all()
    )


@router.post("/user-portfolios")
def create_user_portfolio(
    params: CreateUserPortfolioParams,
    session: Session = Depends(get_session),
) -> UserPortfolio:
    user_id, portfolio_name = params.user_id, params.portfolio_name
    if user_id is None:
        raise ValueError("User ID cannot be null")
    portfolio_id: str = str(uuid.uuid4())
    data = {
        "portfolio_id": portfolio_id,  # Generate a new user_id
        "user_id": user_id,
        "name": portfolio_name.strip(),
        "created_at": datetime.now(),
        "last_modified": datetime.now(),
    }
    session.add(UserPortfolios(**data))
    return data


@router.delete("/user-portfolios")
async def delete_user_portfolio(
    request: Request,
    session: Session = Depends(get_session),
):
    res: str = await request.json()
    portfolio_id = res["portfolio_id"]
    session.delete(session.query(UserPortfolios).get(portfolio_id))


@router.post("/{portfolioId}")
def insert_transaction_entry(
    entry: CreateTransactionParams,
    session: Session = Depends(get_session),
):
    entry_data = PortfolioTickers(**entry.model_dump())
    transaction_id = entry_data.transaction_id
    entry_exists = (
        session.query(PortfolioTickers)
        .filter(PortfolioTickers.transaction_id == transaction_id)
        .first()
    )
    # Process the entry to make sure it conforms
    entry.ticker = entry.ticker.strip().upper()

    if entry_exists is None:
        # Insert new entry if it does not exist
        session.add(entry_data)
    else:
        # Update existing entry
        update_data = entry.model_dump()
        # Assuming model_dump() returns a dictionary that can be unpacked into the update() method
        (
            session.query(PortfolioTickers)
            .filter(PortfolioTickers.transaction_id == transaction_id)
            .update(update_data)
        )
    session.commit()
    return


@router.delete("/{portfolioId}")
async def delete_user_tickers(
    request: Request,
    session: Session = Depends(get_session),
):
    res: str = await request.json()
    transaction_id = res["transaction_id"]
    entry_exists = (
        session.query(PortfolioTickers)
        .filter(PortfolioTickers.transaction_id == transaction_id)
        .first()
    )
    if entry_exists:
        # Insert new entry if it does not exist
        session.delete(session.query(PortfolioTickers).get(transaction_id))


@router.get("/{portfolioId}")
def get_user_tickers(
    portfolioId: str,
    session: Session = Depends(get_session),
):
    return (
        session.query(PortfolioTickers)
        .filter(PortfolioTickers.portfolio_id == portfolioId)
        .limit(20)
        .all()
    )


@router.get("/{portfolioId}/statistics")
def get_portfolio_statistics(
    portfolioId: str,
    session: Session = Depends(get_session),
):
    pass
