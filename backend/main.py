from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import models
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
def submit_contact(contact: ContactRequest, db: Session = Depends(get_db)):
    db_contact = models.ContactSubmission(
        name=contact.name,
        email=contact.email,
        message=contact.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return {"message": "Contact submission successful", "id": db_contact.id}

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
