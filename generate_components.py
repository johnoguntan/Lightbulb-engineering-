import os
import re
from bs4 import BeautifulSoup

with open("/Users/oluwafizo/.gemini/antigravity/brain/1c1bbd89-f96d-4a80-bcc5-054532cdf357/prototype.html") as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, "html.parser")

def clean_html_to_jsx(raw_html):
    s = raw_html
    # Fix standard HTML attributes to JSX
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

    # Self-close void elements
    for void_tag in ["img", "input", "br", "hr", "source", "link", "meta"]:
        s = re.sub(rf"<({void_tag}\b[^>]*?)(?<!/)>", r"<\1 />", s)
    
    return s

out_dir = "/Users/oluwafizo/Documents/Lightbulb Engineering /src/components/prototype"
os.makedirs(out_dir, exist_ok=True)

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

# 1. HUD BAR
hud_badge = soup.find(id="active-route-badge")
if hud_badge:
    hud_div = hud_badge.parent.parent.parent
    hud_jsx = clean_html_to_jsx(str(hud_div))
    
    # Replace data-route-target button handlers
    hud_jsx = re.sub(r'data-route-target="([^"]+)"', r'onClick={() => onNavigate("\1")}', hud_jsx)
    # Replace route badge text
    hud_jsx = hud_jsx.replace('<span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold tracking-wide" id="active-route-badge">home</span>', '<span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-primary text-on-primary font-bold tracking-wide" id="active-route-badge">{activeRoute}</span>')
    # Replace cart count badge
    hud_jsx = hud_jsx.replace('<span className="w-4 h-4 rounded-full bg-surface-container-lowest text-primary text-[10px] flex items-center justify-center font-bold">2</span>', '<span className="w-4 h-4 rounded-full bg-surface-container-lowest text-primary text-[10px] flex items-center justify-center font-bold">{cartCount}</span>')
    # Replace cart drawer toggle onClick
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
    print("Generated HudBar.jsx")

# 2. HEADER
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
    print("Generated Header.jsx")

# 3. FOOTER
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
    print("Generated Footer.jsx")

# 4. CART DRAWER
cart_code = """'use client';

export default function CartDrawer({ isCartOpen, closeCart, onNavigate, cartItems = [], onUpdateQuantity, onRemoveItem, cartSubtotal = 83500 }) {
  const progressPercent = Math.min(100, (cartSubtotal / 50000) * 100);
  const remainingForFree = Math.max(0, 50000 - cartSubtotal);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm transition-opacity ${isCartOpen ? 'block' : 'hidden'}`} 
        id="drawer-backdrop"
        onClick={closeCart}
      />

      {/* Cart Container */}
      <div 
        id="slideout-cart"
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-surface shadow-2xl border-l border-outline-variant flex flex-col transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="p-gutter border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shopping_bag</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">WORKSPACE BAG</h2>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm">
              {cartItems.length > 0 ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 2} items
            </span>
          </div>
          <button 
            id="cart-drawer-close" 
            onClick={closeCart}
            className="p-1.5 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant" 
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="p-space-md bg-surface-container-lowest border-b border-outline-variant">
          <div className="flex justify-between text-label-sm font-label-sm mb-1">
            <span className="text-on-surface-variant">Lagos Courier Delivery</span>
            <span className="text-primary font-bold">
              {remainingForFree === 0 ? 'Unlocked Free Shipping!' : `Add ₦${remainingForFree.toLocaleString()} for Free Delivery`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-gutter space-y-space-md">
          {/* Default items */}
          <div className="flex gap-space-md p-space-md rounded-lg border border-outline-variant bg-surface-container-lowest">
            <div className="w-20 h-20 bg-surface-container-high rounded flex items-center justify-center font-label-sm text-outline">
              LAPDESK
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-label-lg text-label-lg text-on-surface">Modular Lapdesk Pro M4</h3>
                <button className="text-on-surface-variant hover:text-error transition-colors" type="button">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Material: Moso Bamboo / Slate</p>
              <div className="flex justify-between items-center mt-space-sm">
                <div className="flex items-center border border-outline-variant rounded">
                  <button className="px-2 py-0.5 text-on-surface-variant hover:bg-surface-container" type="button">-</button>
                  <span className="px-2 font-label-sm text-label-sm text-on-surface">1</span>
                  <button className="px-2 py-0.5 text-on-surface-variant hover:bg-surface-container" type="button">+</button>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface">₦38,500</span>
              </div>
            </div>
          </div>

          <div className="flex gap-space-md p-space-md rounded-lg border border-outline-variant bg-surface-container-lowest">
            <div className="w-20 h-20 bg-surface-container-high rounded flex items-center justify-center font-label-sm text-outline">
              BAG
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-label-lg text-label-lg text-on-surface">Structured Field Messenger</h3>
                <button className="text-on-surface-variant hover:text-error transition-colors" type="button">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Material: 1000D Cordura Nylon</p>
              <div className="flex justify-between items-center mt-space-sm">
                <div className="flex items-center border border-outline-variant rounded">
                  <button className="px-2 py-0.5 text-on-surface-variant hover:bg-surface-container" type="button">-</button>
                  <span className="px-2 font-label-sm text-label-sm text-on-surface">1</span>
                  <button className="px-2 py-0.5 text-on-surface-variant hover:bg-surface-container" type="button">+</button>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface">₦45,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Summary */}
        <div className="p-gutter border-t border-outline-variant bg-surface-container-low space-y-space-md">
          <div className="space-y-space-xs text-body-sm">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span className="text-on-surface font-semibold">₦83,500</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Est. Lagos Logistics</span>
              <span className="text-primary font-bold">FREE</span>
            </div>
          </div>

          <button 
            id="cart-to-checkout"
            onClick={() => { closeCart(); onNavigate("checkout"); }}
            className="w-full py-3 bg-primary text-on-primary rounded font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-md" 
            type="button"
          >
            <span>PROCEED TO CHECKOUT</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </>
  );
}
"""
with open(os.path.join(out_dir, "CartDrawer.jsx"), "w") as out:
    out.write(cart_code)
print("Generated CartDrawer.jsx")

