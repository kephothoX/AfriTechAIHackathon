import os

from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path("./.env")
load_dotenv(dotenv_path=dotenv_path)


class Config:
    def __init__(self):
        self.tidb_host = os.environ.get("TIDB_HOST")
        self.tidb_port = int(os.environ.get("TIDB_PORT"))
        self.tidb_user = os.environ.get("TIDB_USER")
        self.tidb_password = os.environ.get("TIDB_PASSWORD")
        self.tidb_db_name = os.environ.get("TIDB_DB_NAME")
        self.ca_path = os.environ.get("CA_PATH")
