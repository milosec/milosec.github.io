import subprocess
import sys

try:
    print("Checking syntax of assets/js/custom.js...")
    subprocess.check_output(['node', '-c', 'assets/js/custom.js'])
    print("Syntax OK")
except subprocess.CalledProcessError as e:
    print(f"Syntax Error: {e}")
    sys.exit(1)
