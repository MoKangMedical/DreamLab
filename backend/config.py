import os

# SQLite file path (relative to project root)
DB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
os.makedirs(DB_DIR, exist_ok=True)

DATABASE_URL = f"sqlite+aiosqlite:///{os.path.join(DB_DIR, 'dreamlab.db')}"
SYNC_DATABASE_URL = f"sqlite:///{os.path.join(DB_DIR, 'dreamlab.db')}"
