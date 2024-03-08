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
    CreateTransactionParams,
)
from ion_backend.app.api.endpoints.portfolio.models import UserPortfolio

router = APIRouter(tags=["portfolio"], prefix="/portfolio")


@router.get("/{portfolioId}")
def get_portfolio_statistics(
    portfolioId: str,
    session: Session = Depends(get_session),
):
    pass
