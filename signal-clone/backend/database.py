# database.py
# This file sets up the connection to our SQLite database.
# SQLAlchemy is the library that lets Python talk to the database.

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Get the database URL from .env
# Example: sqlite:///./signal.db
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./signal.db")

# Create the database engine
# connect_args is needed only for SQLite to allow multiple threads
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Each request to the API will get its own database session
# autocommit=False means we control when to save changes
# autoflush=False means changes won't auto-save before a query
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class that all our database models will inherit from
Base = declarative_base()


# This function gives each API endpoint its own database session
# It automatically closes the session when the request is done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()