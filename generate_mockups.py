import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/mockups', exist_ok=True)

def create_mockup(filename, width, height, title, subtitle, bg_color=(250, 249, 246)):
    img = Image.new('RGB', (width, height), bg_color)
    draw = ImageDraw.Draw(img)

    # Header bar
    draw.rectangle([0, 0, width, 60], fill=(255, 255, 255))
    draw.line([0, 60, width, 60], fill=(220, 235, 224), width=2)
    draw.text((20, 20), "🐾 PetCare Paws & Pals", fill=(42, 47, 43))

    # Devices Badge
    draw.rounded_rectangle([20, 80, width - 20, 160], radius=16, fill=(235, 248, 238), outline=(123, 211, 137), width=2)
    draw.text((40, 95), f"SCREEN MOCKUP: {title}", fill=(42, 47, 43))
    draw.text((40, 125), f"Viewport: {width} x {height} px • {subtitle}", fill=(82, 92, 84))

    # Mock Columns / Grid depending on screen width
    if width >= 1024:
      # Desktop Side by side
      draw.rounded_rectangle([20, 180, int(width * 0.62), height - 40], radius=20, fill=(255, 255, 255), outline=(220, 235, 224), width=2)
      draw.text((40, 200), "SERVICES LIST (2/3 COLUMN GRID)", fill=(123, 211, 137))
      
      # Mock Cards inside desktop grid
      for i in range(4):
        y = 240 + i * 110
        draw.rounded_rectangle([40, y, int(width * 0.60), y + 90], radius=16, fill=(250, 249, 246), outline=(220, 235, 224))
        draw.rectangle([55, y + 15, 115, y + 75], fill=(235, 248, 238))
        draw.text((130, y + 25), f"Local Service Provider {i+1} (Vet / Groomer / Store)", fill=(42, 47, 43))
        draw.text((130, y + 50), "★ 4.9 (128 reviews) • 2.1 km away • Book — ₹499", fill=(123, 211, 137))

      # Map Column (1/3 persistent)
      draw.rounded_rectangle([int(width * 0.65), 180, width - 20, height - 40], radius=20, fill=(232, 245, 233), outline=(123, 211, 137), width=2)
      draw.text((int(width * 0.65) + 20, 200), "PERSISTENT INTERACTIVE MAP (1/3)", fill=(42, 47, 43))
      # Map Pin markers
      pins = [(0.72, 0.4), (0.85, 0.55), (0.78, 0.7)]
      for px, py in pins:
        cx, cy = int(width * px), int(height * py)
        draw.ellipse([cx-15, cy-15, cx+15, cy+15], fill=(123, 211, 137))

    elif width >= 768:
      # Tablet Split view
      draw.rounded_rectangle([20, 180, width - 20, 520], radius=20, fill=(255, 255, 255), outline=(220, 235, 224), width=2)
      draw.text((40, 200), "SERVICES GRID (2 COLUMNS TABLET)", fill=(123, 211, 137))
      
      # Map Split Box
      draw.rounded_rectangle([20, 540, width - 20, height - 40], radius=20, fill=(232, 245, 233), outline=(123, 211, 137), width=2)
      draw.text((40, 560), "MAP VIEW SPLIT PANEL", fill=(42, 47, 43))

    else:
      # Mobile View (Single Stack + Bottom Sheet indicator)
      draw.rounded_rectangle([20, 180, width - 20, height - 80], radius=20, fill=(255, 255, 255), outline=(220, 235, 224), width=2)
      draw.text((35, 195), "MOBILE SINGLE COLUMN STACK", fill=(123, 211, 137))
      for i in range(3):
        y = 230 + i * 140
        draw.rounded_rectangle([35, y, width - 35, y + 120], radius=16, fill=(250, 249, 246), outline=(220, 235, 224))
        draw.text((50, y + 15), f"Service Card {i+1}", fill=(42, 47, 43))
        draw.text((50, y + 40), "★ 4.9 • 2.1 km away", fill=(82, 92, 84))
        draw.rounded_rectangle([50, y + 70, width - 50, y + 105], radius=20, fill=(123, 211, 137))
        draw.text((70, y + 80), "Book — ₹499", fill=(255, 255, 255))

      # Mobile Bottom Sticky Nav
      draw.rectangle([0, height - 60, width, height], fill=(255, 255, 255))
      draw.line([0, height - 60, width, height - 60], fill=(220, 235, 224), width=1)
      draw.text((30, height - 40), "Home  •  Services  •  Feeding  •  Health  •  Profile", fill=(142, 152, 144))

    img.save(filename)
    print(f"Generated mockup image: {filename}")

create_mockup("public/mockups/services_mobile_375x812.png", 375, 812, "Services Page - Mobile Stack", "Single column cards + bottom map sheet")
create_mockup("public/mockups/services_tablet_768x1024.png", 768, 1024, "Services Page - Tablet Split View", "2-column grid + map panel")
create_mockup("public/mockups/services_desktop_1440x900.png", 1440, 900, "Services Page - Desktop Side-by-Side", "2/3 list grid + 1/3 persistent map column")
create_mockup("public/mockups/feeding_mobile_375x812.png", 375, 812, "Feeding Page - Mobile View", "Circular analytics 60% + portion slider modal")
