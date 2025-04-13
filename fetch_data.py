import requests
import os
import json

token = os.getenv("SHEETDB_AUTH")
print("Got token?" if token else "No token found")
print("First 4 chars:", token[:4] if token else "N/A")

url = "https://sheetdb.io/api/v1/59mfw9fgs9c7x"
headers = {"Authorization": f"Bearer {token}",
           "Content-Type": "application/json"
          }

response = requests.get(url, headers=headers)
data = response.json()

with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

