# PLAN DE IMPLEMENTACIÓN: GESTIÓN DE SESIONES Y TOKENS

## 📋 ARQUITECTURA DE TOKENS

### 1. TIPOS DE TOKENS
- **Access Token**: JWT de corta duración (30 min)
  - Usado en cada petición a endpoints protegidos
  - Se envía en header: `Authorization: Bearer <token>`
  - Contiene: user_id, email, expiration
  
- **Refresh Token**: JWT de larga duración (7 días)
  - Se guarda en HttpOnly cookie (más seguro)
  - Solo se usa para obtener nuevo access token
  - No se envía automáticamente en peticiones

- **Session ID** (opcional): Para tracking server-side
  - Alternativa a tokens puros
  - Requiere base de datos de sesiones

## 🔄 FLUJO DE AUTENTICACIÓN

```
REGISTRO/LOGIN
    ↓
Backend crea Access Token + Refresh Token
    ↓
Frontend recibe Access Token en response
    ↓
Frontend guarda en localStorage (o sessionStorage)
    ↓
Cada petición: Authorization: Bearer <access_token>
    ↓
Backend valida token en middleware
    ↓
Si token expirado y hay refresh token:
  - Frontend usa refresh token para obtener nuevo access token
  - Guarda nuevo token
  - Reintenta petición original
```

## 📁 ESTRUCTURA DE CARPETAS PROPUESTA

```
frontend/
  src/
    auth/
      ├── context/
      │   └── AuthContext.tsx         ✅ CREADO
      ├── hooks/
      │   └── useAuth.ts              (exportar de AuthContext)
      ├── components/
      │   ├── ProtectedRoute.tsx      ✅ CREADO
      │   ├── LoginForm.tsx           (actualizar)
      │   └── RegisterForm.tsx        (actualizar)
      ├── services/
      │   └── authService.ts          ✅ CREADO (con interceptores)
      └── types/
          └── auth.ts                 (tipos/interfaces)
    
backend/
  app/
    auth/
      ├── token_schemas.py            ✅ CREADO
      ├── token_service.py            ✅ CREADO
      ├── token_router.draft.py       ✅ CREADO (revisar)
      ├── auth_router.py              (actualizar con tokens)
      ├── auth_service.py             (actualizar)
      └── models/
          └── user.py                 (SQLAlchemy models)
    middleware/
      └── auth_middleware.py          (validar tokens)
```

## ⚙️ PASOS PARA IMPLEMENTACIÓN

### BACKEND - FASE 1: ESTRUCTURA BASE
1. ✅ Crear modelos de schemas (token_schemas.py)
2. ✅ Crear servicio de tokens (token_service.py)
3. ⏳ Actualizar auth_router.py para usar tokens
4. ⏳ Crear middleware de validación
5. ⏳ Actualizar auth_service.py con hash de contraseñas

### FRONTEND - FASE 1: CONTEXT Y SERVICES
1. ✅ Crear AuthContext (AuthContext.tsx)
2. ✅ Crear authService con interceptores (authService.ts)
3. ✅ Crear componente ProtectedRoute
4. ⏳ Actualizar LoginForm para usar AuthContext
5. ⏳ Actualizar RegisterForm para usar AuthContext
6. ⏳ Envolver App con AuthProvider

### FASE 2: INTEGRACIÓN CON BD
1. Crear modelo User en SQLAlchemy
2. Migraciones de BD
3. Actualizar auth_service.py para consultar BD
4. Hash de contraseñas con bcrypt

### FASE 3: MEJORAS DE SEGURIDAD
1. Refresh token rotation
2. Token blacklist para logout
3. Rate limiting en login
4. HTTPS en producción
5. Secure HttpOnly cookies

## 🔑 DEPENDENCIAS A INSTALAR

### Backend
```bash
pip install PyJWT
pip install passlib[bcrypt]
pip install python-jose[cryptography]
```

### Frontend
```bash
npm install axios
# (ya está instalado)
```

## 💡 CONSIDERACIONES IMPORTANTES

### Seguridad
- ❌ NO guardar token en localStorage (vulnerable a XSS)
  → ✅ Usar HttpOnly cookies (más seguro)
- ❌ NO enviar contraseña en plain text
  → ✅ Usar bcrypt/argon2 para hashear
- ❌ NO dejar SECRET_KEY en el código
  → ✅ Usar variables de entorno

### UX
- Mostrar loading mientras se valida token al iniciar app
- Redirigir a login automáticamente si token expirado
- Mantener sesión activa con refresh tokens
- Limpiar localStorage en logout

## 📌 PRÓXIMOS PASOS INMEDIATOS

1. Revisar los archivos creados (.draft)
2. Decidir: ¿Usar localStorage o HttpOnly cookies?
3. Instalar dependencias (PyJWT, passlib)
4. Crear modelo User en BD
5. Migrar auth_router.py al nuevo sistema
