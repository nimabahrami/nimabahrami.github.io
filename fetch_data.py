import requests
import os
import json

api_key = os.getenv("RESTDB_API_KEY")
url = "https://yourproject.restdb.io/rest/yourcollection"

headers = {
    "x-apikey": api_key,
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()

with open("public/data.json", "w") as f:
    json.dump(data, f, indent=2)
