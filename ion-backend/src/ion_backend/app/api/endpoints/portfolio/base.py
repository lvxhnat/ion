import uuid
from typing import List
from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Query, Request

from ion_backend.app.services.postgres.base import get_session
from ion_backend.app.services.postgres.tables import (
    UserPortfolios,
    PortfolioTransactions,
)
from ion_backend.app.api.endpoints.portfolio.params import (
    CreateUserPortfolioParams,
)
from ion_backend.app.api.endpoints.portfolio.models import UserPortfolio

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
        "name": portfolio_name,
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
    entry,
    session: Session = Depends(get_session),
):
    return session.add(PortfolioTransactions(**entry.dict()))


@router.put("/{portfolioId}")
def edit_transaction_entry(
    entry,
    session: Session = Depends(get_session),
):
    return (
        session.query(PortfolioTransactions)
        .filter(PortfolioTransactions.transaction_id == entry.transaction_id)
        .update(entry)
    )


@router.delete("/{portfolioId}")
async def delete_user_portfolio(
    request: Request,
    session: Session = Depends(get_session),
):
    res: str = await request.json()
    transaction_id = res["transaction_id"]
    session.delete(session.query(PortfolioTransactions).get(transaction_id))
