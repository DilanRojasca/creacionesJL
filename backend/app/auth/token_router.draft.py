from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from app.auth.token_schemas import LoginRequest, LoginResponse, RegisterRequest, UserResponse
from app.auth.token_service import create_access_token, create_refresh_token, verify_token, get_user_from_token, hash_password
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

# ============ AUTENTICACIÓN CON TOKENS ============

@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Endpoint de login que retorna JWT access token
    
    TODO: Implementar búsqueda en base de datos
    """
    # Validaciones básicas
    if not request.email or not request.password:
        raise HTTPException(status_code=400, detail="Email y contraseña requeridos")
    
    # TODO: Buscar usuario en BD
    # user = db.query(User).filter(User.email == request.email).first()
    
    # Por ahora, usuario hardcodeado para testing
    if request.email == "admin@test.com" and request.password == "123456":
        user_data = {
            "id": "1",
            "email": request.email,
            "nombre": "Admin"
        }
        
        # Crear tokens
        access_token = create_access_token(data={"sub": request.email})
        # refresh_token = create_refresh_token(data={"sub": request.email})
        
        return LoginResponse(
            access_token=access_token,
            token_type="Bearer",
            user=UserResponse(**user_data, created_at=None)  # Agregar timestamp real
        )
    
    raise HTTPException(status_code=401, detail="Credenciales inválidas")

@router.post("/register", response_model=LoginResponse)
async def register(request: RegisterRequest):
    """
    Endpoint de registro que retorna JWT access token
    
    TODO: Implementar guardado en base de datos
    """
    # Validaciones
    if request.password != request.password_confirm:
        raise HTTPException(status_code=400, detail="Las contraseñas no coinciden")
    
    if len(request.password) < 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 6 caracteres")
    
    # TODO: Verificar si el email ya existe en BD
    # existing_user = db.query(User).filter(User.email == request.email).first()
    # if existing_user:
    #     raise HTTPException(status_code=400, detail="El email ya está registrado")
    
    # TODO: Crear usuario en BD
    # hashed_password = hash_password(request.password)
    # new_user = User(
    #     email=request.email,
    #     nombre=request.nombre,
    #     password_hash=hashed_password
    # )
    # db.add(new_user)
    # db.commit()
    
    # Por ahora, simular registro exitoso
    user_data = {
        "id": "2",
        "email": request.email,
        "nombre": request.nombre or "Usuario"
    }
    
    access_token = create_access_token(data={"sub": request.email})
    
    return LoginResponse(
        access_token=access_token,
        token_type="Bearer",
        user=UserResponse(**user_data, created_at=None)  # Agregar timestamp real
    )

@router.post("/logout")
async def logout(credentials: HTTPAuthCredentials = Depends(security)):
    """
    Endpoint de logout
    
    TODO: Implementar blacklist de tokens o revocar tokens en BD
    """
    token = credentials.credentials
    user_id = get_user_from_token(token)
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Token inválido")
    
    # TODO: Agregar token a blacklist o marcar como revocado en BD
    
    return {"message": "Sesión cerrada"}

@router.post("/refresh")
async def refresh_access_token(credentials: HTTPAuthCredentials = Depends(security)):
    """
    Endpoint para refrescar el access token usando refresh token
    
    TODO: Implementar cuando se use refresh tokens
    """
    pass

@router.post("/validate")
async def validate_token(credentials: HTTPAuthCredentials = Depends(security)):
    """
    Endpoint para validar un token
    """
    token = credentials.credentials
    payload = verify_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    
    return {
        "valid": True,
        "user_id": payload.get("sub"),
        "expires": payload.get("exp")
    }

# ============ DEPENDENCY: GET CURRENT USER ============

async def get_current_user(credentials: HTTPAuthCredentials = Depends(security)) -> str:
    """
    Dependency para rutas protegidas
    Retorna el user_id/email del token
    """
    token = credentials.credentials
    user_id = get_user_from_token(token)
    
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado"
        )
    
    return user_id

# ============ EJEMPLO DE RUTA PROTEGIDA ============

@router.get("/me")
async def get_current_user_info(current_user: str = Depends(get_current_user)):
    """
    Endpoint protegido que retorna info del usuario actual
    """
    # TODO: Buscar usuario en BD
    return {
        "user_id": current_user,
        "message": f"Datos del usuario {current_user}"
    }
