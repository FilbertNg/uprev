"""
WhatsApp meet/redirect endpoint with dynamic template support.

Templates can contain {placeholders} that are safely substituted from
query parameters. Unknown template names redirect to the frontend 404 page.
"""

from __future__ import annotations

import urllib.parse

from fastapi import APIRouter, Query
from fastapi.responses import RedirectResponse

from core.config import settings

router = APIRouter()

# ── Template Registry ────────────────────────────────────────────────────────
# Each template string may contain {placeholder} variables.
# Corresponding query parameters are used for substitution.

TEMPLATES: dict[str, str] = {
    "schedule": (
        "Halo Tim UpRev\n"
        "Saya tertarik untuk diskusi mengenai solusi digital/AI untuk bisnis saya.\n"
        "Boleh diinfokan jadwal konsultasi yang tersedia minggu ini? Terima kasih."
    ),
    "success_payment": (
        "Halo Tim UpRev\n"
        "Pesanan saya:\n"
        "- ID: {tx_id}\n"
        "- Paket: {pkg_name}\n"
        "- Atas nama: {cust_name}\n"
        "Saya sudah lakukan pembayaran. Apakah boleh di proses?"
    ),
    "failed_payment": (
        "Halo Tim UpRev\n"
        "Pesanan saya:\n"
        "- Paket: {pkg_name}\n"
        "- Atas nama: {cust_name}\n"
        "Saya mengalami kesulitan dengan pembayarannya. "
        "Bolehkah tim UpRev bantu saya?"
    ),
}


@router.get("/meet/{template_name}")
async def redirect_to_whatsapp(
    template_name: str,
    tx_id: str = Query("", description="Transaction ID"),
    pkg_name: str = Query("", description="Package name"),
    cust_name: str = Query("", description="Customer name"),
):
    """Redirect to WhatsApp with a pre-filled message from a named template.

    Dynamic placeholders ({tx_id}, {pkg_name}, {cust_name}) are safely
    substituted from query parameters. Missing values default to empty string.

    Unknown template names redirect to the frontend 404 page.
    """
    template = TEMPLATES.get(template_name)

    if not template:
        # Redirect to the frontend's 404 page for unknown templates
        frontend_url = settings.APP_URL.rstrip("/")
        return RedirectResponse(url=f"{frontend_url}/404", status_code=302)

    # Safe substitution — only replace known placeholders, ignore extras
    message = template.format_map({
        "tx_id": tx_id,
        "pkg_name": pkg_name,
        "cust_name": cust_name,
    })

    phone = settings.PHONE_NUMBER
    encoded_message = urllib.parse.quote(message)
    whatsapp_url = f"https://wa.me/{phone}?text={encoded_message}"
    return RedirectResponse(url=whatsapp_url, status_code=302)
