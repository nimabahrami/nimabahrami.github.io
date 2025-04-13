import requests
import os
import json

token = os.getenv("SHEETDB_AUTH")
url = "https://sheetdb.io/api/v1/59mfw9fgs9c7x"
headers = {"Authorization": f"Bearer {token}",
           "Content-Type": "application/json"
          }

response = requests.get(url, headers=headers)
data = response.json()

with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

