with open('assets/js/custom.js', 'r') as f:
    lines = f.readlines()
    for i, line in enumerate(lines):
        if 'resize' in line:
            start = max(0, i - 2)
            end = min(len(lines), i + 15)
            print(''.join(lines[start:end]))
