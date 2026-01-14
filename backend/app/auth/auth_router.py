from fastapi import APIRouter, HTTPException
from .auth_schemas import LoginRequest, LoginResponse, RegisterRequest, RegisterResponse
from .auth_service import authenticate_user, register_user

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

@router.post("/login", response_model=LoginResponse)
def login(data: LoginRequest):
    is_valid = authenticate_user(data.email, data.password)

    if not is_valid:
        raise HTTPException(
            status_code=401,
            detail="Credenciales inválidas"
        )

    return {"message": "Login exitoso"}


@router.post("/register", response_model=RegisterResponse)
def register(data: RegisterRequest):
    is_valid = register_user(data.firstName, data.lastName, data.email, data.password)

    if not is_valid:
        raise HTTPException(
            status_code=400,
            detail="Error al registrar el usuario"
        )

    return {"message": "Registro exitoso"}
