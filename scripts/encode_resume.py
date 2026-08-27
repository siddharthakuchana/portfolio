import base64
import os

pdf_path = os.path.join("public", "resume.pdf")
out_path = os.path.join("src", "lib", "resumeBase64.ts")

if os.path.exists(pdf_path):
    with open(pdf_path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")
    
    with open(out_path, "w") as f:
        f.write(f'export const resumePdfBase64 = "{encoded}";\n')
    
    print(f"Successfully generated {out_path} ({len(encoded)} chars)")
else:
    print("Error: public/resume.pdf does not exist")
