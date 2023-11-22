from datetime import datetime
from sqlalchemy.orm import Session
from fastapi import APIRouter, HTTPException, Depends

from finflow_algos.services.postgres.base import get_session
from finflow_algos.services.postgres.actions import order_search, create_table
from finflow_algos.services.postgres.tables.infrastructure.portfolio import Portfolio, PortfolioTransactions

from finflow_db.app.api.endpoints.portfolio.params import GetPortfolioEntriesParams, CreatePortfolioParams


router = APIRouter(
    tags=["query"],
)

@router.get("/health")
def health_check():
    return {"status": "healthy"}

# # Create a new item
@router.post("/portfolio")
def insert_portfolio(
    params: CreatePortfolioParams, 
    session: Session = Depends(get_session)
):
    portfolio = Portfolio(
        uuid=params.portfolio_id,  # Replace with your desired UUID
        name=params.name,
        description=params.description,
        currency=params.currency,
        creation_date=datetime.now(),
        last_updated=datetime.now(),
    )
    return 

# # Read all items
# @router.get("/portfolio")
# def get_portfolios(session: Session = Depends(get_session)):
#     return items[skip : skip + limit]

@router.get("/portfolio/{portfolio_id}")
def get_portfolio_entries(params: GetPortfolioEntriesParams, session: Session = Depends(get_session)):
    entries = order_search(session, filters = [
        PortfolioTransactions.uuid == params.portfolio_id
    ], table_schema=PortfolioTransactions)
    if len(entries) < 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return entries

# # Update an item
# @router.put("/items/{item_id}", response_model=Item)
# def update_item(item_id: int, item: Item):
#     if item_id < 0 or item_id >= len(items):
#         raise HTTPException(status_code=404, detail="Item not found")
#     items[item_id] = item
#     return item

# # Delete an item
# @router.delete("/items/{item_id}", response_model=Item)
# def delete_item(item_id: int):
#     if item_id < 0 or item_id >= len(items):
#         raise HTTPException(status_code=404, detail="Item not found")
#     deleted_item = items.pop(item_id)
#     return deleted_item
