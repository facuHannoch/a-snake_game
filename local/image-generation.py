# from google import genai
# from PIL import Image

# client = genai.Client()
# prompt="cat"

# response = client.models.generate_content(
#     model="gemini-2.5-flash-image",
#     contents=prompt
# )

# for part in response.parts:
#     if part.inline_data:
#         image = part.as_image()
#         image.show()

import json
import base64
import requests
import os
import sys
import subprocess

path = '.'

doc = None
with open(f"{sys.argv[1]}", "r") as f:
    doc = f.read()

api_key = os.getenv("IMAGE_AI_API_KEY")
model = "gemini-2.5-flash-image"
prompt = f"""
Given this project, create a high quality logo that fits the application. Make it in a square design



PROJECT DOCS:

---

{doc}

---

"""

imagePath = f"{path}/og-image.png"




# Errors handling (no api key, etc)


# Generate Image

if not os.path.isfile(imagePath): # TODO check this
    response = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",
        headers={"x-goog-api-key": api_key},
        json={
            "contents": [{
                "parts": [{
                    "text": prompt
                }]
            }]
        }
    )

    data = response.json()

    with open("data.json", "w+") as f:
        f.write(str(data))

    # Extract base64 image from response
    # image_data = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
    image_parts = data["candidates"][0]["content"]["parts"]


    image_data = next((part["inlineData"]["data"] for part in image_parts if "inlineData" in part))
    image_bytes = base64.b64decode(image_data)


    # Save to file
    with open(imagePath, "wb") as f:
        f.write(image_bytes)


# Generate alternative theme image

# Generate OpenGraph image ???




# Resize images

## 1. Ensure imageMagick is there
## https://imagemagick.org/archive/binaries/magick

## 2. Resize images
outputPath = f"{path}/output"
os.makedirs(outputPath, exist_ok=True)

subprocess.run(["wsl", "./magick", imagePath, "-resize", "512x512", f"{outputPath}/icon.png"])
subprocess.run(["wsl", "./magick", imagePath, "-define", "icon:auto-resize=256,128,64,48,32,16", f"{outputPath}/favicon.ico"])
subprocess.run(["wsl", "./magick", imagePath, "-resize", "180x180", "-background", "white", "-alpha", "remove", "-alpha", "off", f"{outputPath}/apple-icon.png"])
subprocess.run(["wsl", "./magick", "-size", "1200x630", "xc:white", "(", imagePath, "-resize", "460x460", ")", "-gravity", "center", "-composite", f"{outputPath}/opengraph-image.png"])


# ./magick -size 1200x630 xc:white \( image.png -resize 460x460 \) -gravity center -composite opengraph-image.png

