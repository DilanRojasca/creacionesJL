from fastapi.middleware.cors import CORSMiddleware

CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://dilanrojasca.github.io",
]

def add_cors_middleware(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )