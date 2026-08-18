import os
import math
import trimesh
import numpy as np

def create_creature_mesh(creature_id, name, element, rarity):
    # Base shapes according to creature traits
    if "Tortuga" in name or "Armadillo" in name:
        # Sphere shell + cylinder body
        shell = trimesh.creation.icosphere(subdivisions=3, radius=1.2)
        shell.vertices[:, 1] *= 0.6 # flatten height
        head = trimesh.creation.icosphere(subdivisions=2, radius=0.45)
        head.apply_translation([0, 0.3, 1.2])
        mesh = trimesh.util.concatenate([shell, head])
    elif "Dragón" in name or "Fénix" in name or "Águila" in name:
        # Winged creature mesh
        body = trimesh.creation.capsule(height=2.0, radius=0.6)
        wing_l = trimesh.creation.box(extents=[2.2, 0.1, 0.8])
        wing_l.apply_translation([1.2, 0.4, 0])
        wing_r = trimesh.creation.box(extents=[2.2, 0.1, 0.8])
        wing_r.apply_translation([-1.2, 0.4, 0])
        mesh = trimesh.util.concatenate([body, wing_l, wing_r])
    elif "Kraken" in name or "Tiburón" in name or "Polpo" in name:
        # Aquatic creature mesh
        body = trimesh.creation.capsule(height=2.5, radius=0.7)
        fin = trimesh.creation.cone(radius=0.8, height=1.2)
        fin.apply_translation([0, 0.8, -0.5])
        mesh = trimesh.util.concatenate([body, fin])
    elif "Behemoth" in name or "Tigre" in name:
        # Heavy quadrupeds
        body = trimesh.creation.box(extents=[1.6, 1.2, 2.2])
        head = trimesh.creation.icosphere(subdivisions=2, radius=0.6)
        head.apply_translation([0, 0.5, 1.3])
        mesh = trimesh.util.concatenate([body, head])
    else:
        # Insectoid / Elemental creature
        core = trimesh.creation.icosphere(subdivisions=3, radius=1.0)
        ring = trimesh.creation.torus(major_radius=1.5, minor_radius=0.15)
        mesh = trimesh.util.concatenate([core, ring])

    # Element color mapping for PBR material
    color_map = {
        "Fuego": [239, 68, 68, 255],     # Crimson Red
        "Agua": [59, 130, 246, 255],     # Deep Blue
        "Planta": [34, 197, 94, 255],    # Emerald Green
        "Tierra": [234, 179, 8, 255]     # Golden Amber
    }
    base_color = color_map.get(element, [251, 191, 36, 255])
    
    # Rarity metallic/glow boost
    if rarity == "Legendario":
        base_color = [255, 215, 0, 255] # Pure Gold

    # Apply visual vertex color
    colors = np.tile(base_color, (len(mesh.vertices), 1))
    mesh.visual.vertex_colors = colors
    return mesh

def build_all_3d_models():
    models_dir = r"C:\Users\Yo\.gemini\antigravity\scratch\turtura-game\assets\models"
    os.makedirs(models_dir, exist_ok=True)

    creatures = [
        (1, "Tortuga Cristalina", "Agua", "Épico"),
        (2, "Dragón de Obsidiana", "Fuego", "Legendario"),
        (3, "Tigre de Bengala", "Tierra", "Raro"),
        (4, "Águila Harpía", "Planta", "Raro"),
        (5, "Kraken Colosal", "Agua", "Legendario"),
        (6, "Escarabajo Escarlata", "Fuego", "Común"),
        (7, "Tiburón Martillo", "Agua", "Épico"),
        (8, "Polpo Místico", "Agua", "Raro"),
        (9, "Fénix Celestial", "Fuego", "Legendario"),
        (10, "Behemoth de Roca", "Tierra", "Épico"),
        (11, "Simbionte Alfa", "Planta", "Épico"),
        (12, "Hormiga Guerrera", "Tierra", "Común")
    ]

    for cid, name, elem, rarity in creatures:
        filename = f"creature_{cid}.glb"
        out_path = os.path.join(models_dir, filename)
        mesh = create_creature_mesh(cid, name, elem, rarity)
        mesh.export(out_path)
        print(f"Generated 3D GLB Model: {filename} ({elem} - {rarity})")

if __name__ == "__main__":
    build_all_3d_models()
