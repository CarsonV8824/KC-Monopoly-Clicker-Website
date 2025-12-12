from src.database.database import Database
import pytest
def test_add_and_get_user():
    db = Database(':memory:')  
    db.add_user('testuser', '1234567890@example.com')
    assert db.get_users() == [(1, 'testuser', '1234567890@example.com')]