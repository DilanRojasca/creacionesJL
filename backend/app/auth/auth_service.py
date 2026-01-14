def authenticate_user(email: str, password: str) -> bool:
    """
    Simulación de autenticación.
    En el futuro aquí irá la base de datos.
    """

    fake_user = {
        "email": "admin@test.com",
        "password": "123456"
    }

    return email == fake_user["email"] and password == fake_user["password"]

def register_user(firstName: str, lastName: str, email: str, password: str) -> bool:
    """
    Simulación de registro.
    En el futuro aquí irá la base de datos.
    """
    # Por ahora solo validamos que no esté vacío
    if email and password and firstName and lastName:
        # En producción, aquí guardarías en la base de datos
        return True
    return False