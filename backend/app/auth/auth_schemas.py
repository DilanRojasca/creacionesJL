from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    message: str
class RegisterRequest(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str

class RegisterResponse(BaseModel):
    message: str