from pathlib import Path
from pydantic import BaseSettings, Field

class SecretsConfig(BaseSettings):
    FRED_API_KEY: str = Field(..., env='FRED_API_KEY') # This attribute will be filled with the value of the API_KEY environment variable

    class Config:
        root_path: str = Path(__file__).parents[4]
        # Here you can define the prefix for your environment variables (if needed) and other configurations
        env_file = root_path/'.env'  # Specifies a dotenv file to read variables from

config: SecretsConfig = SecretsConfig()

if __name__ == '__main__':
    print(config)