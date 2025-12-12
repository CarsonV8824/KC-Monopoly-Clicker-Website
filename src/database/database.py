import sqlite3

class Database:
    def __init__(self, db_name='src/database/KC_Clicker.db'):
        self.connection = sqlite3.connect(db_name)
        self.cursor = self.connection.cursor()
        self.create_tables()

    def create_tables(self):
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                email TEXT NOT NULL
            )
        ''')
        self.connection.commit()

    def add_user(self, username, email):
        self.cursor.execute('''
            INSERT INTO users (username, email) VALUES (?, ?)
        ''', (username, email))
        self.connection.commit()

    def get_users(self):
        self.cursor.execute('SELECT * FROM users')
        return self.cursor.fetchall()

    def close(self):
        self.connection.close()