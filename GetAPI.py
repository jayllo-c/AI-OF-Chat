import getpass
import os
from dotenv import load_dotenv

load_dotenv()

def _set_env(var: str):
    if not os.environ.get(var):
        value = getpass.getpass(f"{var}: ")
        os.environ[var] = value
        with open('.env', 'a') as f:
            f.write(f"{var}={value}\n")


_set_env("ANTHROPIC_API_KEY")

def _get_env(var: str):
    return os.environ.get(var)

print(_get_env("ANTHROPIC_API_KEY"))