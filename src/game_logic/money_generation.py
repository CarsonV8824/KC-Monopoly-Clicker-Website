import threading 
import time

class Money_Generation():
    def __init__(self, game_state):
        self.game_state = game_state
        self.running = True
        self.thread = threading.Thread(target=self._generate_money)
        self.thread.start()

    def _generate_money(self, money_per_sec=None):
        while self.running:
            time.sleep(1)
            self.game_state.game_state["money"] += self.game_state.game_state["money_per_sec"]

    def stop(self):
        self.running = False
        self.thread.join()