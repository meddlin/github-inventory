import sqlite3

conn = sqlite3.connect('inventory.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS repositories (
        id TEXT PRIMARY KEY,
        name TEXT,
        url TEXT
    )
''')

conn.commit()
conn.close()