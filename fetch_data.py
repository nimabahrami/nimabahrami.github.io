import requests
import os
import json

SHEETDB_AUTH = os.getenv("SHEETDB_AUTH")
url = "https://sheetdb.io/api/v1/59mfw9fgs9c7x"

        headers = {
            "Authorization": f"Bearer {SHEETDB_AUTH}",
            "Content-Type": "application/json"
        }

response = requests.get(url, headers=headers)
data = response.json()

with open("public/data.json", "w") as f:
    json.dump(data, f, indent=2)

