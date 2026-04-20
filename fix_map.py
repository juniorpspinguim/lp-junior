import re

with open('public/brazil-map.svg', 'r') as f:
    svg = f.read()

svg = re.sub(r'<style id="custom-map-styles">.*?</style>', '', svg, flags=re.DOTALL)
# clean existing animates
svg = re.sub(r'<animate[^>]*>', '', svg)
# revert from </path> to />
svg = svg.replace('</path>', '')

active_states = {
    'br-am': 0.5, 'br-ce': 0.62, 'br-pi': 0.74, 'br-pb': 0.86,
    'br-pe': 0.98, 'br-al': 1.1, 'br-se': 1.22, 'br-ba': 1.34,
    'br-go': 1.46, 'br-df': 1.58, 'br-mg': 1.7, 'br-es': 1.82,
    'br-rj': 1.94, 'br-sp': 2.06, 'br-pr': 2.18, 'br-sc': 2.3,
    'br-rs': 2.42
}

def inject_smil(content, delay):
    # in the block, replace all `/>` with `<animate attributeName="fill" values="rgba(123,63,228,0.01);rgba(180,130,255,0.8);rgba(157,100,255,0.6)" keyTimes="0;0.5;1" dur="1s" begin="{delay}s" fill="freeze" /></path>`
    # But wait, we must also ensure the path starts transparent. 
    # Change the path fill to transparent:
    c = re.sub(r'fill="[^"]+"', 'fill="rgba(123,63,228,0.01)"', content)
    c = c.replace('/>', f'>\n\t\t\t<animate attributeName="fill" values="rgba(123,63,228,0.01);rgba(180,130,255,0.8);rgba(157,100,255,0.6)" dur="1s" begin="{delay}s" fill="freeze" />\n\t\t</path>')
    return c

for state_id, delay in active_states.items():
    # find everything between <g id="state_id"... and the closing tag </g>
    # We will do a non-greedy search
    pattern = rf'(<g id="{state_id}".*?</g>)'
    
    def replacer(match):
        return inject_smil(match.group(1), delay)
        
    svg = re.sub(pattern, replacer, svg, flags=re.DOTALL)

with open('public/brazil-map.svg', 'w') as f:
    f.write(svg)
