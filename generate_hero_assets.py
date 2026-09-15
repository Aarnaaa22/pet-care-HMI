import os
import json
import math
from PIL import Image, ImageDraw, ImageFont

# Ensure target directories exist in both root and public
dirs = [
    'public/lottie', 'public/svg', 'public/png', 'public/fallback',
    'lottie', 'svg', 'png', 'fallback'
]
for d in dirs:
    os.makedirs(d, exist_ok=True)

print("Creating Multi-Breed PetShop hero animation assets...")

# ==========================================
# 1. GENERATE MULTI-BREED LAYERED SVG (public/svg/petshop-animals.svg)
# ==========================================

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 420" width="100%" height="100%">
  <defs>
    <!-- Soft Ambient Ground Shadow Filter -->
    <filter id="shadowBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" />
    </filter>

    <!-- Speed Motion Blur -->
    <filter id="motionBlur" x="-30%" y="-10%" width="160%" height="120%">
      <feGaussianBlur stdDeviation="3.5 0" />
    </filter>

    <!-- Gradients for realistic breeds -->
    <linearGradient id="tabbyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9CA3AF" />
      <stop offset="50%" stop-color="#6B7280" />
      <stop offset="100%" stop-color="#4B5563" />
    </linearGradient>

    <linearGradient id="siameseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF5" />
      <stop offset="70%" stop-color="#F5EBE0" />
      <stop offset="100%" stop-color="#E3D5CA" />
    </linearGradient>

    <linearGradient id="beagleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="60%" stop-color="#B45309" />
      <stop offset="100%" stop-color="#78350F" />
    </linearGradient>

    <linearGradient id="retrieverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>

    <linearGradient id="frenchieGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E5A968" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>

  <!-- ── Ground Shadows Layer ── -->
  <g id="ground-shadows" opacity="0.4">
    <ellipse cx="160" cy="360" rx="42" ry="11" fill="#111827" filter="url(#shadowBlur)" />
    <ellipse cx="430" cy="362" rx="38" ry="10" fill="#111827" filter="url(#shadowBlur)" />
    <ellipse cx="690" cy="364" rx="44" ry="11" fill="#111827" filter="url(#shadowBlur)" />
    <ellipse cx="960" cy="365" rx="40" ry="10" fill="#111827" filter="url(#shadowBlur)" />
    <ellipse cx="1240" cy="368" rx="64" ry="14" fill="#111827" filter="url(#shadowBlur)" />
    <ellipse cx="1480" cy="366" rx="36" ry="10" fill="#111827" filter="url(#shadowBlur)" />
  </g>

  <!-- ── Dust Particles Burst Layer ── -->
  <g id="dust-particles" opacity="0.55">
    <!-- Tabby dust -->
    <circle cx="115" cy="355" r="5" fill="#E5C088" opacity="0.6" />
    <circle cx="108" cy="352" r="3" fill="#FCE2B0" opacity="0.4" />
    <!-- Siamese dust -->
    <circle cx="385" cy="358" r="4" fill="#E5C088" opacity="0.5" />
    <!-- Calico dust -->
    <circle cx="640" cy="360" r="4.5" fill="#FCE2B0" opacity="0.6" />
    <!-- Beagle dust -->
    <circle cx="915" cy="361" r="5" fill="#E5C088" opacity="0.6" />
    <!-- Retriever dust -->
    <circle cx="1170" cy="364" r="6.5" fill="#E5C088" opacity="0.7" />
    <circle cx="1158" cy="360" r="3.5" fill="#FCE2B0" opacity="0.5" />
  </g>

  <!-- 🐱 Breed 1: Grey Tabby Cat (Playful Bound Gait) -->
  <g id="cat-grey-tabby" transform="translate(100, 260)" cursor="pointer">
    <path d="M-20,40 L-5,40 M-30,25 L-8,25" stroke="#9CA3AF" stroke-width="2" opacity="0.4" filter="url(#motionBlur)" />
    <!-- Tail -->
    <path d="M10,38 Q-25,18 -35,2" fill="none" stroke="#4B5563" stroke-width="8" stroke-linecap="round" />
    <!-- Legs -->
    <path d="M22,48 Q12,68 8,82" stroke="#4B5563" stroke-width="7.5" stroke-linecap="round" />
    <path d="M32,48 Q22,72 32,86" stroke="#6B7280" stroke-width="8" stroke-linecap="round" />
    <path d="M68,50 Q58,72 72,86" stroke="#4B5563" stroke-width="7.5" stroke-linecap="round" />
    <path d="M78,48 Q88,68 92,82" stroke="#6B7280" stroke-width="8" stroke-linecap="round" />
    <!-- Body -->
    <ellipse cx="48" cy="42" rx="40" ry="22" fill="url(#tabbyGrad)" transform="rotate(-6 48 42)" />
    <ellipse cx="50" cy="49" rx="28" ry="13" fill="#F3F4F6" opacity="0.9" />
    <path d="M36,22 Q38,34 34,44 M48,20 Q50,34 46,46 M60,22 Q62,34 58,44" stroke="#374151" stroke-width="3" fill="none" />
    <!-- Neck & Head -->
    <path d="M72,32 Q82,22 88,14" stroke="url(#tabbyGrad)" stroke-width="22" stroke-linecap="round" />
    <circle cx="92" cy="13" r="18" fill="url(#tabbyGrad)" />
    <ellipse cx="100" cy="17" rx="7.5" ry="5.5" fill="#F3F4F6" />
    <polygon points="104,15 108,15 106,18" fill="#F472B6" />
    <!-- Ears -->
    <polygon points="82,5 90,-10 96,4" fill="#4B5563" />
    <polygon points="94,2 101,-12 106,2" fill="#6B7280" />
    <!-- Eye & Collar (#7BD389) -->
    <ellipse cx="97" cy="10" rx="2.5" ry="3.5" fill="#1F2937" />
    <circle cx="98" cy="9" r="0.9" fill="#FFF" />
    <path d="M78,26 Q84,30 90,24" stroke="#7BD389" stroke-width="4" fill="none" stroke-linecap="round" />
    <circle cx="86" cy="30" r="3" fill="#F59E0B" />
  </g>

  <!-- 🐱 Breed 2: Elegant Siamese Cat (Sleek High Trot, Dark Points, Sapphire Eyes) -->
  <g id="cat-siamese" transform="translate(370, 265)" cursor="pointer">
    <path d="M12,42 Q-28,30 -32,12" fill="none" stroke="#374151" stroke-width="6.5" stroke-linecap="round" />
    <path d="M25,48 L15,84" stroke="#374151" stroke-width="6" stroke-linecap="round" />
    <path d="M35,48 L42,86" stroke="#4B5563" stroke-width="6.5" stroke-linecap="round" />
    <path d="M65,48 L58,84" stroke="#374151" stroke-width="6" stroke-linecap="round" />
    <path d="M75,48 L85,86" stroke="#4B5563" stroke-width="6.5" stroke-linecap="round" />
    <!-- Sleek Cream Body -->
    <ellipse cx="48" cy="40" rx="36" ry="19" fill="url(#siameseGrad)" />
    <!-- Head with Dark Point Mask -->
    <circle cx="88" cy="16" r="16" fill="url(#siameseGrad)" />
    <ellipse cx="94" cy="19" rx="10" ry="8" fill="#374151" />
    <polygon points="98,17 103,17 100.5,20" fill="#F472B6" />
    <!-- Large Pointed Ears -->
    <polygon points="78,8 84,-12 91,5" fill="#374151" />
    <polygon points="90,5 97,-10 102,6" fill="#4B5563" />
    <!-- Sapphire Blue Eyes -->
    <ellipse cx="92" cy="14" rx="2.5" ry="3.5" fill="#3B82F6" />
    <circle cx="93" cy="13" r="0.9" fill="#FFF" />
    <path d="M75,28 Q81,32 87,26" stroke="#7BD389" stroke-width="3.5" fill="none" />
  </g>

  <!-- 🐱 Breed 3: Fluffy Calico Cat (Plumey Tail, Tri-Color Patches) -->
  <g id="cat-calico" transform="translate(630, 258)" cursor="pointer">
    <!-- Bushy Plumey Tail -->
    <path d="M10,40 Q-20,10 -30,-5" fill="none" stroke="#EA580C" stroke-width="12" stroke-linecap="round" />
    <path d="M10,40 Q-20,10 -30,-5" fill="none" stroke="#1F2937" stroke-width="12" stroke-linecap="round" stroke-dasharray="8,10" />
    <!-- Legs -->
    <path d="M22,48 L12,85" stroke="#EA580C" stroke-width="7.5" stroke-linecap="round" />
    <path d="M34,48 L40,88" stroke="#1F2937" stroke-width="8" stroke-linecap="round" />
    <path d="M66,48 L56,85" stroke="#EA580C" stroke-width="7.5" stroke-linecap="round" />
    <path d="M76,48 L86,88" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" />
    <!-- Calico White Body with Orange & Black Patches -->
    <ellipse cx="48" cy="42" rx="38" ry="22" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
    <path d="M25,26 Q40,20 48,34 Q35,45 22,38 Z" fill="#EA580C" />
    <path d="M46,24 Q60,22 66,36 Q54,44 44,32 Z" fill="#1F2937" />
    <!-- Head -->
    <circle cx="90" cy="16" r="17" fill="#FFFFFF" />
    <path d="M78,6 Q88,2 96,12 Z" fill="#EA580C" />
    <polygon points="80,6 87,-10 93,4" fill="#1F2937" />
    <polygon points="92,4 99,-8 104,5" fill="#EA580C" />
    <ellipse cx="98" cy="18" rx="2.5" ry="3.5" fill="#1F2937" />
    <path d="M78,28 Q84,32 90,26" stroke="#7BD389" stroke-width="4" fill="none" />
  </g>

  <!-- 🐕 Breed 4: Tri-Color Beagle / Terrier (Active Trot, Floppy Ears) -->
  <g id="dog-beagle" transform="translate(900, 272)" cursor="pointer">
    <path d="M5,28 Q-12,12 -16,-2" fill="none" stroke="#B45309" stroke-width="7" stroke-linecap="round" />
    <path d="M18,42 L10,78" stroke="#78350F" stroke-width="7" stroke-linecap="round" />
    <path d="M28,42 L35,82" stroke="#D97706" stroke-width="7" stroke-linecap="round" />
    <path d="M58,42 L48,78" stroke="#78350F" stroke-width="7" stroke-linecap="round" />
    <path d="M68,42 L78,82" stroke="#D97706" stroke-width="7" stroke-linecap="round" />
    <ellipse cx="42" cy="34" rx="32" ry="19" fill="url(#beagleGrad)" />
    <ellipse cx="44" cy="40" rx="22" ry="11" fill="#FFFFFF" opacity="0.9" />
    <!-- Head & Floppy Ear -->
    <circle cx="76" cy="18" r="15" fill="url(#beagleGrad)" />
    <path d="M65,10 Q60,26 72,30" fill="#78350F" stroke="#78350F" stroke-width="4" />
    <ellipse cx="84" cy="20" rx="7" ry="5" fill="#FFFFFF" />
    <circle cx="89" cy="18" r="2.5" fill="#1F2937" />
    <circle cx="78" cy="14" r="2.2" fill="#1F2937" />
    <path d="M64,26 Q69,30 74,24" stroke="#7BD389" stroke-width="4" fill="none" />
  </g>

  <!-- 🦮 Breed 5: Golden Retriever (Athletic Extended Leap, Green Bandana) -->
  <g id="dog-golden-retriever" transform="translate(1160, 240)" cursor="pointer">
    <path d="M-30,52 L-8,52 M-25,38 L-5,38" stroke="#FDE68A" stroke-width="2.5" opacity="0.5" filter="url(#motionBlur)" />
    <path d="M10,44 Q-32,32 -42,20" fill="none" stroke="#D97706" stroke-width="10" stroke-linecap="round" />
    <!-- Extended Legs -->
    <path d="M28,58 Q8,82 -8,98" stroke="#D97706" stroke-width="10" stroke-linecap="round" />
    <path d="M42,58 Q26,88 12,108" stroke="#F59E0B" stroke-width="11" stroke-linecap="round" />
    <path d="M98,58 Q118,82 134,98" stroke="#D97706" stroke-width="10" stroke-linecap="round" />
    <path d="M110,58 Q132,84 148,102" stroke="#F59E0B" stroke-width="11" stroke-linecap="round" />
    <!-- Golden Body -->
    <ellipse cx="68" cy="48" rx="58" ry="30" fill="url(#retrieverGrad)" transform="rotate(-4 68 48)" />
    <ellipse cx="70" cy="58" rx="40" ry="17" fill="#FEF3C7" opacity="0.8" />
    <!-- Neck & Head -->
    <path d="M104,40 Q118,24 128,14" stroke="url(#retrieverGrad)" stroke-width="30" stroke-linecap="round" />
    <circle cx="132" cy="14" r="23" fill="url(#retrieverGrad)" />
    <path d="M118,5 Q110,24 124,30" stroke="#D97706" stroke-width="9" stroke-linecap="round" />
    <ellipse cx="144" cy="18" rx="12" ry="8" fill="#FDE68A" />
    <ellipse cx="152" cy="15" rx="4" ry="3.2" fill="#1F2937" />
    <circle cx="135" cy="11" r="3" fill="#1F2937" />
    <circle cx="136" cy="10" r="0.9" fill="#FFF" />
    <!-- Green Bandana (#7BD389) -->
    <polygon points="116,28 130,32 122,46" fill="#7BD389" />
    <path d="M112,26 Q122,31 132,25" stroke="#7BD389" stroke-width="4.5" fill="none" />
  </g>

  <!-- 🐶 Breed 6: French Bulldog (Stocky Frame, Bat Ears, Playful Hop) -->
  <g id="dog-french-bulldog" transform="translate(1420, 278)" cursor="pointer">
    <path d="M4,24 L-8,14" fill="none" stroke="#B45309" stroke-width="6" stroke-linecap="round" />
    <path d="M16,40 L8,75" stroke="#B45309" stroke-width="7" stroke-linecap="round" />
    <path d="M26,40 L32,78" stroke="#E5A968" stroke-width="7.5" stroke-linecap="round" />
    <path d="M52,40 L44,75" stroke="#B45309" stroke-width="7" stroke-linecap="round" />
    <path d="M62,40 L70,78" stroke="#E5A968" stroke-width="7.5" stroke-linecap="round" />
    <ellipse cx="38" cy="34" rx="28" ry="18" fill="url(#frenchieGrad)" />
    <!-- Head & Bat Ears -->
    <circle cx="68" cy="18" r="16" fill="url(#frenchieGrad)" />
    <ellipse cx="74" cy="22" rx="9" ry="7" fill="#1F2937" />
    <ellipse cx="76" cy="19" rx="3" ry="2" fill="#1F2937" />
    <polygon points="56,8 60,-12 70,4" fill="#B45309" />
    <polygon points="68,4 78,-12 84,8" fill="#E5A968" />
    <circle cx="68" cy="14" r="2.2" fill="#1F2937" />
    <path d="M56,26 Q61,30 66,24" stroke="#7BD389" stroke-width="3.8" fill="none" />
  </g>
</svg>
'''

for path in ['public/svg/petshop-animals.svg', 'svg/petshop-animals.svg']:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg_content)

print("Saved multi-breed SVG sprite sheet.")


# ==========================================
# 2. GENERATE MULTI-BREED LOTTIE JSON
# ==========================================

lottie_data = {
    "v": "5.7.4",
    "fr": 60,
    "ip": 0,
    "op": 480,
    "w": 1600,
    "h": 420,
    "nm": "Multi-Breed PetShop Hero Loop",
    "ddd": 0,
    "assets": [],
    "layers": [
        {
            "ddd": 0,
            "ind": 1,
            "ty": 4,
            "nm": "Dust Particles",
            "sr": 1,
            "ks": {
                "o": {"a": 0, "k": 70},
                "r": {"a": 0, "k": 0},
                "p": {"a": 0, "k": [800, 360, 0]},
                "a": {"a": 0, "k": [0, 0, 0]},
                "s": {"a": 0, "k": [100, 100, 100]}
            },
            "shapes": [
                {
                    "ty": "gr",
                    "nm": "Dust Group",
                    "it": [
                        {"ty": "el", "s": {"a": 0, "k": [14, 10]}, "p": {"a": 0, "k": [-350, 10]}},
                        {"ty": "fl", "c": {"a": 0, "k": [0.95, 0.88, 0.69, 1]}},
                        {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}}
                    ]
                }
            ],
            "ip": 0,
            "op": 480
        },
        {
            "ddd": 0, "ind": 2, "ty": 4, "nm": "Grey Tabby Cat", "sr": 1,
            "ks": {
                "o": {"a": 0, "k": 100},
                "r": {"a": 1, "k": [{"t": 0, "s": [0], "e": [4]}, {"t": 30, "s": [4], "e": [-4]}, {"t": 60, "s": [-4], "e": [0]}]},
                "p": {"a": 1, "k": [{"t": 0, "s": [-200, 300, 0], "e": [1800, 300, 0]}]},
                "a": {"a": 0, "k": [50, 45, 0]}, "s": {"a": 0, "k": [100, 100, 100]}
            },
            "shapes": [{"ty": "gr", "nm": "Cat Body", "it": [{"ty": "el", "s": {"a": 0, "k": [84, 48]}, "p": {"a": 0, "k": [50, 45]}}, {"ty": "fl", "c": {"a": 0, "k": [0.61, 0.64, 0.69, 1]}}, {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}}]}],
            "ip": 0, "op": 480
        },
        {
            "ddd": 0, "ind": 3, "ty": 4, "nm": "Golden Retriever", "sr": 1,
            "ks": {
                "o": {"a": 0, "k": 100}, "r": {"a": 0, "k": 0},
                "p": {"a": 1, "k": [{"t": 0, "s": [-700, 280, 0], "e": [-200, 280, 0]}, {"t": 160, "s": [-200, 280, 0], "e": [1800, 280, 0]}]},
                "a": {"a": 0, "k": [68, 48, 0]}, "s": {"a": 0, "k": [115, 115, 100]}
            },
            "shapes": [{"ty": "gr", "nm": "Retriever Body", "it": [{"ty": "el", "s": {"a": 0, "k": [116, 60]}, "p": {"a": 0, "k": [68, 48]}}, {"ty": "fl", "c": {"a": 0, "k": [0.99, 0.83, 0.3, 1]}}, {"ty": "tr", "p": {"a": 0, "k": [0, 0]}, "a": {"a": 0, "k": [0, 0]}, "s": {"a": 0, "k": [100, 100]}, "r": {"a": 0, "k": 0}, "o": {"a": 0, "k": 100}}]}],
            "ip": 0, "op": 480
        }
    ]
}

lottie_str = json.dumps(lottie_data, indent=2)
for path in ['public/lottie/petshop-hero-animals.json', 'lottie/petshop-hero-animals.json']:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(lottie_str)

print("Saved multi-breed Lottie JSON animation.")


# ==========================================
# 3. GENERATE RASTER TRANSPARENT WEBP & STATIC FALLBACK PNG
# ==========================================

def render_multi_breed_scene(width, height, is_static_fallback=False):
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if is_static_fallback:
        # Sky gradient
        for y in range(int(height * 0.86)):
            ratio = y / (height * 0.86)
            r = int(0xF2 + (0xFC - 0xF2) * ratio)
            g = int(0xA6 + (0xE2 - 0xA6) * ratio)
            b = int(0x5A + (0xB0 - 0x5A) * ratio)
            draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
        
        # Ground
        ground_y = int(height * 0.86)
        draw.rectangle([0, ground_y, width, height], fill=(185, 174, 147, 255))

        # Shop Brick Wall Centered
        wall_w = min(int(width * 0.55), 700)
        wall_h = int(height * 0.58)
        wall_x = (width - wall_w) // 2
        wall_y = ground_y - wall_h
        draw.rounded_rectangle([wall_x, wall_y, wall_x + wall_w, wall_y + wall_h], radius=10, fill=(139, 90, 66, 255), outline=(110, 68, 51, 255), width=3)
        draw.rectangle([wall_x - 15, wall_y - 20, wall_x + wall_w + 15, wall_y], fill=(35, 64, 46, 255))
        draw.polygon([
            (wall_x - 10, wall_y), (wall_x + wall_w + 10, wall_y),
            (wall_x + wall_w + 20, wall_y + 50), (wall_x - 20, wall_y + 50)
        ], fill=(166, 61, 47, 255))

        door_w, door_h = 140, 210
        door_x = (width - door_w) // 2
        door_y = ground_y - door_h
        draw.rounded_rectangle([door_x - 6, door_y - 6, door_x + door_w + 6, ground_y], radius=8, fill=(124, 80, 40, 255))
        draw.rounded_rectangle([door_x, door_y, door_x + door_w, ground_y], radius=6, fill=(198, 143, 82, 255), outline=(169, 113, 59, 255), width=4)

    sf = width / 1440.0
    ground_level = int(height * 0.85)

    # Render cats and dogs in dynamic running positions
    shadow_y = ground_level - int(10 * sf)
    draw.ellipse([int(300 * sf), shadow_y, int(420 * sf), shadow_y + int(24 * sf)], fill=(20, 20, 20, 80))
    draw.ellipse([int(650 * sf), shadow_y + 4, int(750 * sf), shadow_y + int(22 * sf)], fill=(20, 20, 20, 70))
    draw.ellipse([int(1000 * sf), shadow_y, int(1160 * sf), shadow_y + int(26 * sf)], fill=(20, 20, 20, 80))

    # --- Draw Grey Tabby Cat ---
    cat_x = int(320 * sf)
    cat_y = ground_level - int(75 * sf)
    draw.ellipse([cat_x, cat_y, cat_x + int(84 * sf), cat_y + int(48 * sf)], fill=(156, 163, 175, 255), outline=(75, 85, 99, 255), width=2)
    draw.ellipse([cat_x + int(10 * sf), cat_y + int(14 * sf), cat_x + int(70 * sf), cat_y + int(42 * sf)], fill=(243, 244, 246, 230))
    for stripe_x in [cat_x + int(28 * sf), cat_x + int(42 * sf), cat_x + int(56 * sf)]:
        draw.line([(stripe_x, cat_y + int(6 * sf)), (stripe_x - int(4 * sf), cat_y + int(28 * sf))], fill=(55, 65, 81, 255), width=max(2, int(3 * sf)))

    # --- Draw Siamese Cat ---
    siam_x = int(660 * sf)
    siam_y = ground_level - int(65 * sf)
    draw.ellipse([siam_x, siam_y, siam_x + int(72 * sf), siam_y + int(38 * sf)], fill=(253, 246, 226, 255))
    draw.ellipse([siam_x + int(50 * sf), siam_y - int(15 * sf), siam_x + int(78 * sf), siam_y + int(15 * sf)], fill=(55, 65, 81, 255))

    # --- Draw Golden Retriever Dog ---
    ret_x = int(1020 * sf)
    ret_y = ground_level - int(95 * sf)
    draw.ellipse([ret_x, ret_y, ret_x + int(116 * sf), ret_y + int(60 * sf)], fill=(245, 158, 11, 255))
    draw.polygon([(ret_x + int(80 * sf), ret_y - int(10 * sf)), (ret_x + int(100 * sf), ret_y - int(25 * sf)), (ret_x + int(110 * sf), ret_y - int(10 * sf))], fill=(217, 119, 6, 255))

    return img

img_1440 = render_multi_breed_scene(1440, 900, is_static_fallback=False)
img_1440.save('public/png/hero-animals-1440x900.webp', 'WEBP')
img_1440.save('png/hero-animals-1440x900.webp', 'WEBP')

img_768 = render_multi_breed_scene(768, 1024, is_static_fallback=False)
img_768.save('public/png/hero-animals-768x1024.webp', 'WEBP')
img_768.save('png/hero-animals-768x1024.webp', 'WEBP')

img_fallback = render_multi_breed_scene(1440, 900, is_static_fallback=True)
img_fallback.save('public/fallback/hero-static-with-tabby.png', 'PNG')
img_fallback.save('fallback/hero-static-with-tabby.png', 'PNG')

print("Saved multi-breed transparent WebPs and fallback PNG.")
print("All multi-breed asset deliverables successfully created!")
