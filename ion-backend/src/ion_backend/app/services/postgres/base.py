import logging
from datetime import datetime
from contextlib import contextmanager
from logging import Logger, getLogger

from sqlalchemy import engine, exc, orm, inspect, Table, Column, DateTime
from sqlalchemy.ext.declarative import declarative_base

from ion_backend.app.config.postgres import postgres_config

logger: Logger = getLogger(__name__)
logging.basicConfig()
logging.getLogger("sqlalchemy").setLevel(logging.ERROR)


Base = declarative_base()


# Define a mixin with common fields
class TimeStamps:
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    last_modified = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    def to_dict(self):
        return {c.key: getattr(self, c.key) for c in self.__table__.columns}


def get_session(postgres_uri: str = None):
    postgres: SQLDatabase = SQLDatabase(_get_postgres_session(postgres_uri))
    with postgres.session_scope() as session:
        yield session


def table_exists(
    table_schema: Table,
    postgres_uri: str = None,
) -> bool:
    postgres_engine: engine.Engine = _get_postgres_engine(postgres_uri)
    return inspect(postgres_engine).has_table(table_schema.__tablename__)


def create_table(
    table_schema: Table,
    postgres_uri: str = None,
) -> None:
    postgres_engine: engine.Engine = _get_postgres_engine(postgres_uri)
    if not table_exists(table_schema):
        table_schema.__table__.create(postgres_engine)
        return
    else:
        logger.setLevel("DEBUG")
        logger.info(
            f"Table {table_schema.__tablename__} already exists. Skipping create_table action."
        )


def drop_table(
    table_schema: Table,
    postgres_uri: str = None,
) -> None:
    postgres_engine: engine.Engine = _get_postgres_engine(postgres_uri)
    if table_exists(table_schema):
        try:
            table_schema.__table__.drop()
        except exc.UnboundExecutionError:
            table_schema.__table__.drop(postgres_engine)
    else:
        logger.warning(
            f"No {table_schema.__tablename__} to drop. Skipping drop_table action."
        )


def _get_postgres_engine(postgres_uri: str = None):
    if not postgres_uri:
        postgres_uri = postgres_config.POSTGRES_URI
    return engine.create_engine(postgres_uri, echo=False)


def _get_postgres_session(postgres_uri: str = None) -> orm.sessionmaker:
    return orm.sessionmaker(
        bind=_get_postgres_engine(postgres_uri), expire_on_commit=False
    )


class DatabaseError(Exception):
    pass


class SQLDatabase:
    def __init__(self, session: orm.sessionmaker = None):
        if session:
            self.session = session()
        else:
            self.session = _get_postgres_session()()

    @contextmanager
    def session_scope(
        self,
        session: orm.sessionmaker = None,
    ):
        """Provide a transactional scope around a series of operations."""
        if not session:
            session = self.session
        try:
            yield session
            session.commit()
        except exc.SQLAlchemyError as err:
            logger.error(f"Session rollback because of exception: {err}")
            session.rollback()
            raise
        finally:
            session.close()

    def execute(self, *args, **kwargs):
        try:
            self.session.execute(*args, **kwargs)
            return self.session
        except Exception as err:
            try:
                self.session.rollback()
            except Exception as inner_err:
                ex = DatabaseError(
                    f"Execution failed on sql: {args[0]}\n{exc}\nunable to rollback"
                )
                raise ex from inner_err
            ex = DatabaseError(f"Execution failed on sql '{args[0]}': {exc}")
            raise ex from err


if __name__ == "__main__":
    import pandas as pd
    from ion_backend.app.services.postgres.models.economic_calendar import (
        EconomicCalendar,
    )

    df = pd.read_csv(
        "/Users/lohyikuang/sites/ion/_research/economic_calendar.csv"
    ).rename(columns={"id": "fred_release_id"})
    df["fred_release_id"] = df["fred_release_id"].astype(str).str.strip()
    df["name"] = df["name"].str.strip()

    rows = [EconomicCalendar(**entry) for entry in df.to_dict("records")]

    with _get_postgres_session()() as session:
        session.bulk_save_objects(rows)
        session.commit()
