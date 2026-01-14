from fastapi import FastAPI
from app.auth.auth_router import router as auth_router
from app.config import add_cors_middleware

app = FastAPI(title="Login API")

add_cors_middleware(app)

app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "API funcionando correctamente"}

