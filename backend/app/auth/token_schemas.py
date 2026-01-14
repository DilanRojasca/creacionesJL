from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime, timedelta
from enum import Enum

# ============ REQUEST/RESPONSE MODELS ============

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    password_confirm: str
    nombre: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: str
    nombre: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    user: UserResponse

class RefreshTokenRequest(BaseModel):
    refresh_token: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"

# ============ TOKEN MODELS ============

class TokenPayload(BaseModel):
    """Payload del JWT token"""
    sub: str  # user id o email
    exp: datetime
    iat: datetime
    type: str  # 'access' o 'refresh'

class TokenConfig(BaseModel):
    """Configuración de tokens"""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    SECRET_KEY: str  # Debe venir de variables de entorno

# ============ USER DB MODEL ============

class User(BaseModel):
    """Modelo de usuario en la base de datos"""
    id: str
    email: str
    nombre: Optional[str] = None
    password_hash: str  # bcrypt hash
    is_active: bool = True
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True
