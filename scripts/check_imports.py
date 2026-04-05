import ast
import os
import sys
import importlib.util

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, ROOT)
ignore_dirs = {".venv", "venv", "backend/venv", ".git", "node_modules"}

modules = set()
for dirpath, dirnames, filenames in os.walk(ROOT):
    # skip ignored dirs
    parts = os.path.relpath(dirpath, ROOT).split(os.sep)
    if any(p in ignore_dirs for p in parts):
        continue
    for fname in filenames:
        if not fname.endswith('.py'):
            continue
        path = os.path.join(dirpath, fname)
        try:
            with open(path, 'r', encoding='utf-8') as f:
                src = f.read()
            tree = ast.parse(src, filename=path)
        except Exception:
            continue
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for n in node.names:
                    modules.add(n.name.split('.')[0])
            elif isinstance(node, ast.ImportFrom):
                if node.level and node.level > 0:
                    continue
                if node.module:
                    modules.add(node.module.split('.')[0])

# Filter out builtin modules by checking spec
missing = []
for m in sorted(modules):
    if m in ("__future__",):
        continue
    try:
        spec = importlib.util.find_spec(m)
    except Exception:
        spec = None
    if spec is None:
        missing.append(m)

out = os.path.join(ROOT, 'import-check.txt')
with open(out, 'w', encoding='utf-8') as f:
    if not missing:
        f.write('No missing imports detected.\n')
    else:
        f.write('Missing imports (top-level module names):\n')
        for x in missing:
            f.write(x + '\n')

print('Wrote', out)
