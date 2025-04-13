import requests
import os
import json

api_key = os.getenv("RESTDB_API_KEY")
url = "https://myen3rgyin7estments-3498.restdb.io/rest/stocks"

headers = {
    'content-type': "application/json",
    "x-apikey": api_key,
    'cache-control': "no-cache"
    }

response = requests.get(url, headers=headers)
data = response.json()

with open("public/data.json", "w") as f:
    json.dump(data, f, indent=2)

