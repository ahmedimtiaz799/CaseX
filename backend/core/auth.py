from fastapi import Header, HTTPException
from supabase import create_client, Client
from backend.core.config import settings

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)

def verify_supabase_jwt(authorization: str = Header(...)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    
    token = authorization.split(" ")[1]
    
    try:
        user_response = supabase.auth.get_user(token)
        if not user_response or not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        
        return user_response.user.model_dump()
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Authentication failed: {str(e)}")