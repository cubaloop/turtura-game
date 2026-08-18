import urllib.request
import os

models_dir = r"C:\Users\Yo\.gemini\antigravity\scratch\turtura-game\assets\models"
os.makedirs(models_dir, exist_ok=True)

models_map = {
    "creature_2_dragon.glb": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DragonAttenuation/glTF-Binary/DragonAttenuation.glb",
    "creature_3_fox.glb": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Fox/glTF-Binary/Fox.glb",
    "creature_5_kraken.glb": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BrainStem/glTF-Binary/BrainStem.glb",
    "creature_9_phoenix.glb": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Duck/glTF-Binary/Duck.glb",
    "creature_10_behemoth.glb": "https://raw.githubusercontent.com/google/model-viewer/master/packages/shared-assets/models/Astronaut.glb",
    "creature_12_ant.glb": "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/CesiumMan/glTF-Binary/CesiumMan.glb"
}

for fname, url in models_map.items():
    out_path = os.path.join(models_dir, fname)
    print(f"Fetching organic 3D model {fname}...")
    try:
        urllib.request.urlretrieve(url, out_path)
        print(f"Successfully saved {fname} ({os.path.getsize(out_path)} bytes)!")
    except Exception as e:
        print(f"Error fetching {fname}:", e)
