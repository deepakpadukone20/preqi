from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from uuid import UUID, uuid4


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Output model (includes id)
class User(BaseModel):
    id: UUID
    name: str
    surname: str
    email: EmailStr
    company: Optional[str] = ""
    jobTitle: Optional[str] = ""

# Input model (no id expected from frontend)
class UserCreate(BaseModel):
    name: str
    surname: str
    email: EmailStr
    company: Optional[str] = ""
    jobTitle: Optional[str] = ""

# Mock database
mock_users: List[User] = [
    User(
        id="123e4567-e89b-12d3-a456-426614174000",
        name="John",
        surname="Doe",
        email="john.doe@example.com",
        company="BlackRock",
        jobTitle="Financial Analyst"
    ),
    User(
        id="123e4567-e89b-12d3-a456-426614174001",
        name="Jane",
        surname="Smith",
        email="jane.smith@example.com",
        company="Vanguard",
        jobTitle="Portfolio Manager"
    ),
    User(
        id="123e4567-e89b-12d3-a456-426614174002",
        name="Alice",
        surname="Johnson",
        email="alice.johnson@example.com",
        company="Morgan Stanley",
        jobTitle="Investment Strategist"
    ),
    User(
        id="123e4567-e89b-12d3-a456-426614174003",
        name="Bob",
        surname="Brown",
        email="bob.brown@example.com",
        company="J.P. Morgan",
        jobTitle="Risk Manager"
    ),
    User(
        id="123e4567-e89b-12d3-a456-426614174004",
        name="Sarah",
        surname="Wilson",
        email="sarah.wilson@example.com",
        company="Goldman Sachs",
        jobTitle="Trader"
    )
]


# Get all users
@app.get("/users", response_model=List[User])
def get_users():
    return mock_users

# Create a new user
@app.post("/users", response_model=User)
def create_user(user_data: UserCreate):
    new_user = User(id=uuid4(), **user_data.dict())
    mock_users.append(new_user)
    return new_user

# Update existing user
@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: UUID, updated_user: User):
    for idx, user in enumerate(mock_users):
        if user.id == user_id:
            mock_users[idx] = updated_user
            return updated_user
    return {"error": "User not found"}
