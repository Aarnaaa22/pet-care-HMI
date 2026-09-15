import os
import glob
import math
from PIL import Image, ImageDraw, ImageFilter

artifacts_dir = r"C:\Users\nevaa\.gemini\antigravity-ide\brain\2ef0137a-62f6-48fc-8027-1a2c132d6fcd"
output_dir_public = "public/png/real_pets"
output_dir_root = "png/real_pets"
fallback_dir_public = "public/fallback"
fallback_dir_root = "fallback"

for d in [output_dir_public, output_dir_root, fallback_dir_public, fallback_dir_root]:
    os.makedirs(d, exist_ok=True)

print("Processing Multi-Frame Quadruped Animated Pet Assets...")

def make_transparent_cutout(img_path, threshold=235):
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        r, g, b, a = item
        if r > threshold and g > threshold and b > threshold:
            new_data.append((255, 255, 255, 0))
        else:
            avg = (r + g + b) / 3.0
            if avg > 200:
                alpha = int(255 * (1.0 - (avg - 200) / 45.0))
                new_data.append((r, g, b, max(0, min(255, alpha))))
            else:
                new_data.append((r, g, b, 255))

    img.putdata(new_data)
    return img

pet_files = {
    'tabby_cat': glob.glob(os.path.join(artifacts_dir, 'real_tabby_cat_run_*.png'))[0],
    'golden_retriever': glob.glob(os.path.join(artifacts_dir, 'real_golden_retriever_run_*.png'))[0],
    'beagle': glob.glob(os.path.join(artifacts_dir, 'real_beagle_run_*.png'))[0],
    'siamese_cat': glob.glob(os.path.join(artifacts_dir, 'real_siamese_cat_run_*.png'))[0],
    'corgi': glob.glob(os.path.join(artifacts_dir, 'real_corgi_run_*.png'))[0]
}

base_cutouts = {}
for pet_key, file_path in pet_files.items():
    cutout = make_transparent_cutout(file_path)
    target_h = 150 if 'cat' in pet_key or 'corgi' in pet_key else 180
    aspect = cutout.width / float(cutout.height)
    target_w = int(target_h * aspect)
    base_cutouts[pet_key] = cutout.resize((target_w, target_h), Image.Resampling.LANCZOS)

# ==========================================
# GENERATE 4 QUADRUPED GAIT ANIMATION FRAMES PER BREED
# Frame 0: Extension / Reach (legs spread, body elongated)
# Frame 1: Touchdown / Impact (front legs down, slight dip)
# Frame 2: Compression / Drive (hind legs coiled preparing to leap)
# Frame 3: Flight / Push-Off (airborne leap, high elevation)
# ==========================================

for pet_key, base_img in base_cutouts.items():
    w, h = base_img.size
    print(f"Generating 4 quadruped gait frames for {pet_key}...")

    for frame_idx in range(4):
        # Create blank canvas for frame
        frame_canvas = Image.new("RGBA", (w + 40, h + 30), (0, 0, 0, 0))
        
        # Calculate limb & body stride deformations per frame phase
        if frame_idx == 0:
            # Extension: Slight horizontal stretch (1.05x W, 0.96x H), zero tilt
            pw, ph = int(w * 1.05), int(h * 0.96)
            scaled = base_img.resize((pw, ph), Image.Resampling.LANCZOS)
            rot = scaled.rotate(3, expand=True, resample=Image.Resampling.BICUBIC)
            frame_canvas.paste(rot, (15, 15), rot)
            
        elif frame_idx == 1:
            # Touchdown: Dip down, slight forward tilt (+4 deg)
            pw, ph = int(w * 0.98), int(h * 1.02)
            scaled = base_img.resize((pw, ph), Image.Resampling.LANCZOS)
            rot = scaled.rotate(5, expand=True, resample=Image.Resampling.BICUBIC)
            frame_canvas.paste(rot, (20, 20), rot)
            
        elif frame_idx == 2:
            # Compression: Compact coil (0.95x W, 1.05x H), slight backward tilt (-3 deg)
            pw, ph = int(w * 0.95), int(h * 1.05)
            scaled = base_img.resize((pw, ph), Image.Resampling.LANCZOS)
            rot = scaled.rotate(-4, expand=True, resample=Image.Resampling.BICUBIC)
            frame_canvas.paste(rot, (10, 8), rot)
            
        else: # frame_idx == 3
            # Flight/Leap: Elevated, extended bound (-5 deg tilt, 1.04x W)
            pw, ph = int(w * 1.04), int(h * 0.98)
            scaled = base_img.resize((pw, ph), Image.Resampling.LANCZOS)
            rot = scaled.rotate(-6, expand=True, resample=Image.Resampling.BICUBIC)
            frame_canvas.paste(rot, (15, 2), rot)

        # Save frame to public and root directories
        f_pub = os.path.join(output_dir_public, f"{pet_key}_frame_{frame_idx}.png")
        f_root = os.path.join(output_dir_root, f"{pet_key}_frame_{frame_idx}.png")
        frame_canvas.save(f_pub, "PNG")
        frame_canvas.save(f_root, "PNG")

print("Saved all 20 quadruped gait animation frames.")

# Static Fallback PNG
scene = Image.new('RGBA', (1440, 900), (0, 0, 0, 255))
draw = ImageDraw.Draw(scene)
for y in range(int(900 * 0.85)):
    ratio = y / (900 * 0.85)
    scene.paste((int(242 + 10 * ratio), int(166 + 60 * ratio), int(90 + 30 * ratio), 255), [0, y, 1440, y + 1])

ground_y = int(900 * 0.85)
draw.rectangle([0, ground_y, 1440, 900], fill=(185, 174, 147, 255))
wall_w, wall_h = 740, 520
wall_x, wall_y = (1440 - wall_w) // 2, ground_y - 520
draw.rounded_rectangle([wall_x, wall_y, wall_x + wall_w, wall_y + wall_h], radius=12, fill=(139, 90, 66, 255), outline=(110, 68, 51, 255), width=3)

# Paste mid-bound frames
tabby_f3 = Image.open(os.path.join(output_dir_public, "tabby_cat_frame_3.png"))
draw.ellipse([420, ground_y - 8, 570, ground_y + 14], fill=(20, 20, 20, 90))
scene.paste(tabby_f3, (400, ground_y - 130), tabby_f3)

retriever_f3 = Image.open(os.path.join(output_dir_public, "golden_retriever_frame_3.png"))
draw.ellipse([880, ground_y - 6, 1070, ground_y + 18], fill=(20, 20, 20, 90))
scene.paste(retriever_f3, (860, ground_y - 160), retriever_f3)

scene.save(os.path.join(fallback_dir_public, "hero-static-with-tabby.png"), "PNG")
scene.save(os.path.join(fallback_dir_root, "hero-static-with-tabby.png"), "PNG")
print("Saved static fallback scene PNG.")
