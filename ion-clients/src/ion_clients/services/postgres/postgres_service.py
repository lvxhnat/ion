import logging
from contextlib import contextmanager
from logging import Logger, getLogger

from sqlalchemy import engine, exc, orm

from ion_clients.core.configuration.storage.postgres import postgres_config

logger: Logger = getLogger(__name__)
logging.basicConfig()
logging.getLogger("sqlalchemy").setLevel(logging.ERROR)

postgres_engine = engine.create_engine(
    postgres_config.POSTGRES_URI, echo=False
)
postgres_session_maker = orm.sessionmaker(
    bind=postgres_engine, expire_on_commit=False
)


class DatabaseError(Exception):
    pass


class SQLDatabase:
    def __init__(self, session: orm.sessionmaker):
        self.session = session()

    @contextmanager
    def session_scope(
        self,
    ):
        """Provide a transactional scope around a series of operations."""
        try:
            yield self.session
            self.session.commit()
        except exc.SQLAlchemyError as err:
            logger.error(f"Session rollback because of exception: {err}")
            self.session.rollback()
            raise
        finally:
            self.session.close()

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


postgres = SQLDatabase(postgres_session_maker)
