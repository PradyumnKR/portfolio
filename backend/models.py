from sqlalchemy import Column, Integer, String, Text, DateTime
import datetime
from database import Base

class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
