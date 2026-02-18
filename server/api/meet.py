from fastapi import APIRouter
from fastapi.responses import RedirectResponse, HTMLResponse, JSONResponse
import urllib.parse
from config import settings

router = APIRouter()

TEMPLATES = {
    "schedule": (
        "Halo Tim UpRev\n"
        "Saya tertarik untuk diskusi mengenai solusi digital/AI untuk bisnis saya.\n"
        "Boleh diinfokan jadwal konsultasi yang tersedia minggu ini? Terima kasih."
    )
}

@router.get("/meet/{template_name}")
async def redirect_to_whatsapp(template_name: str):
    message = TEMPLATES.get(template_name)
    if not message:
        return HTMLResponse(
            content="""
            <html>
                <head>
                    <title>404 - Template Not Found</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        h1 { color: #333; }
                        p { color: #666; }
                    </style>
                </head>
                <body>
                    <h1>404 - Template Not Found</h1>
                    <p>The requested scheduling template does not exist.</p>
                </body>
            </html>
            """,
            status_code=404
        )
    
    p_number = settings.PHONE_NUMBER
    encoded_message = urllib.parse.quote(message)
    whatsapp_url = f"https://wa.me/{p_number}?text={encoded_message}"
    return RedirectResponse(url=whatsapp_url)
