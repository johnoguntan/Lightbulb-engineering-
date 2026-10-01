import os
import re
from bs4 import BeautifulSoup

with open("/Users/oluwafizo/.gemini/antigravity/brain/1c1bbd89-f96d-4a80-bcc5-054532cdf357/prototype.html") as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, "html.parser")

def clean_html_to_jsx(raw_html):
    s = raw_html
    
    # 1. Convert HTML comments to JSX comments
    s = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', s, flags=re.DOTALL)

    # 2. Fix standard HTML attributes to JSX
    s = re.sub(r"\bclass=", "className=", s)
    s = re.sub(r"\bfor=", "htmlFor=", s)
    s = re.sub(r"\btabindex=", "tabIndex=", s)
    s = re.sub(r"\bautocomplete=", "autoComplete=", s)
    s = re.sub(r"\bcolspan=", "colSpan=", s)
    s = re.sub(r"\browspan=", "rowSpan=", s)
    s = re.sub(r"\bcrossorigin=", "crossOrigin=", s)
    s = re.sub(r"\bfill-rule=", "fillRule=", s)
    s = re.sub(r"\bclip-rule=", "clipRule=", s)
    s = re.sub(r"\bstroke-width=", "strokeWidth=", s)
    s = re.sub(r"\bstroke-linecap=", "strokeLinecap=", s)
    s = re.sub(r"\bstroke-linejoin=", "strokeLinejoin=", s)

    # 3. Self-close void elements
    for void_tag in ["img", "input", "br", "hr", "source", "link", "meta"]:
        s = re.sub(rf"<({void_tag}\b[^>]*?)(?<!/)>", r"<\1 />", s)
    
    return s

out_dir = "/Users/oluwafizo/Documents/Lightbulb Engineering /src/components/prototype"

mapping = {
    'home': 'home',
    'retail-shop': 'catalog',
    'product-detail': 'pdp',
    'compare-specs': 'compare',
    'b2b-wholesale-portal': 'b2b',
    'b2b-client-logistics': 'logistics',
    'showroom-booking': 'showroom',
    'workshop-craft': 'craft',
    'member-vault': 'vault',
    'search-and-filters': 'search',
    'checkout': 'checkout',
    'order-tracking': 'tracking'
}

views = [
    ("home", "HomeView"),
    ("catalog", "CatalogView"),
    ("pdp", "PdpView"),
    ("compare", "CompareView"),
    ("search", "SearchView"),
    ("b2b", "B2bView"),
    ("logistics", "LogisticsView"),
    ("showroom", "ShowroomView"),
    ("craft", "CraftView"),
    ("vault", "VaultView"),
    ("checkout", "CheckoutView"),
    ("tracking", "TrackingView"),
]

for vid, component_name in views:
    elem = soup.find(id=f"view-{vid}")
    if not elem:
        print(f"ERROR: View view-{vid} not found!")
        continue

    jsx = clean_html_to_jsx(str(elem))
    
    # 1. Replace hidden/flex logic on root view tag
    jsx = re.sub(rf'id="view-{vid}" className="route-view hidden flex-col w-full"', f'id="view-{vid}" className={{`route-view flex-col w-full ${{activeRoute === "{vid}" ? "flex" : "hidden"}}`}}', jsx)
    jsx = re.sub(rf'id="view-{vid}" className="route-view flex-col w-full flex"', f'id="view-{vid}" className={{`route-view flex-col w-full ${{activeRoute === "{vid}" ? "flex" : "hidden"}}`}}', jsx)
    
    # 2. Convert data-route-target attributes to onClick
    jsx = re.sub(r'data-route-target="([^"]+)"', r'onClick={() => onNavigate("\1")}', jsx)

    # 3. Convert data-path attributes to onClick
    for k, v in mapping.items():
        jsx = re.sub(rf'data-path="{k}"', f'onClick={{(e) => {{ e.preventDefault(); onNavigate("{v}"); }}}} href="#"', jsx)

    # 4. Convert quick-add-btn to onClick={openCart}
    jsx = re.sub(r'className="([^"]*quick-add-btn[^"]*)"', r'onClick={openCart} className="\1"', jsx)

    # 5. For PDP add to bag
    if vid == "pdp":
        jsx = re.sub(r'id="pdp-add-to-bag"', r'id="pdp-add-to-bag" onClick={openCart}', jsx)

    code = f"""'use client';

export default function {component_name}({{ activeRoute, onNavigate, openCart, onAddToCart }}) {{
  return (
    {jsx}
  );
}}
"""
    with open(os.path.join(out_dir, f"{component_name}.jsx"), "w") as out:
        out.write(code)
    print(f"Re-generated {component_name}.jsx")

# Also re-generate HudBar, Header, Footer
hud_badge = soup.find(id="active-route-badge")
if hud_badge:
    hud_div = hud_badge.parent.parent.parent
    hud_jsx = clean_html_to_jsx(str(hud_div))
    hud_jsx = re.sub(r'data-route-target="([^"]+)"', r'onClick={() => onNavigate("\1")}', hud_jsx)
    hud_jsx = hud_jsx.replace('<span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold tracking-wide" id="active-route-badge">home</span>', '<span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold tracking-wide" id="active-route-badge">{activeRoute}</span>')
    hud_jsx = hud_jsx.replace('<span className="w-4 h-4 rounded-full bg-surface-container-lowest text-primary text-[10px] flex items-center justify-center font-bold">2</span>', '<span className="w-4 h-4 rounded-full bg-surface-container-lowest text-primary text-[10px] flex items-center justify-center font-bold">{cartCount}</span>')
    hud_jsx = hud_jsx.replace('id="cart-drawer-toggle"', 'id="cart-drawer-toggle" onClick={openCart}')
    
    code = f"""'use client';

export default function HudBar({{ activeRoute, onNavigate, openCart, cartCount }}) {{
  return (
    {hud_jsx}
  );
}}
"""
    with open(os.path.join(out_dir, "HudBar.jsx"), "w") as out:
        out.write(code)
    print("Re-generated HudBar.jsx")

header_elem = soup.find("header")
if header_elem:
    header_jsx = clean_html_to_jsx(str(header_elem))
    for k, v in mapping.items():
        header_jsx = re.sub(rf'data-path="{k}"', f'onClick={{(e) => {{ e.preventDefault(); onNavigate("{v}"); }}}} href="#"', header_jsx)
    header_jsx = re.sub(r'id="cart-drawer-toggle"', r'onClick={openCart} id="cart-drawer-toggle"', header_jsx)
    header_jsx = header_jsx.replace('<span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tertiary text-on-tertiary text-[10px] flex items-center justify-center font-bold">2</span>', '<span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tertiary text-on-tertiary text-[10px] flex items-center justify-center font-bold">{cartCount}</span>')
    
    code = f"""'use client';

export default function Header({{ activeRoute, onNavigate, openCart, cartCount }}) {{
  return (
    {header_jsx}
  );
}}
"""
    with open(os.path.join(out_dir, "Header.jsx"), "w") as out:
        out.write(code)
    print("Re-generated Header.jsx")

footer_elem = soup.find("footer")
if footer_elem:
    footer_jsx = clean_html_to_jsx(str(footer_elem))
    for k, v in mapping.items():
        footer_jsx = re.sub(rf'data-path="{k}"', f'onClick={{(e) => {{ e.preventDefault(); onNavigate("{v}"); }}}} href="#"', footer_jsx)
    
    code = f"""'use client';

export default function Footer({{ onNavigate }}) {{
  return (
    {footer_jsx}
  );
}}
"""
    with open(os.path.join(out_dir, "Footer.jsx"), "w") as out:
        out.write(code)
    print("Re-generated Footer.jsx")

