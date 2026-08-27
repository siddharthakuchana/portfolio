import os

target_dirs = [
    os.path.join("src", "app", "sk-portal-secret-994"),
    os.path.join("src", "components", "admin")
]

replaced_files = []

for target_dir in target_dirs:
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(".ts") or file.endswith(".tsx") or file.endswith(".js"):
                filepath = os.path.join(root, file)
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                
                if "/admin/" in content or '"/admin"' in content or "'/admin'" in content:
                    new_content = content.replace("/admin/", "/sk-portal-secret-994/")
                    new_content = new_content.replace('"/admin"', '"/sk-portal-secret-994"')
                    new_content = new_content.replace("'/admin'", "'/sk-portal-secret-994'")
                    
                    with open(filepath, "w", encoding="utf-8") as f:
                        f.write(new_content)
                    
                    replaced_files.append(filepath)

print(f"Successfully updated {len(replaced_files)} files:")
for rf in replaced_files:
    print(f" - {rf}")
