from pydantic import BaseSettings

class BaseConfigs(BaseSettings):
    pass

configs: BaseConfigs = BaseConfigs()
