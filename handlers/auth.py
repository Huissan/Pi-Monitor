import os
import json
from .base import BaseHandler
from pycket.session import SessionMixin


class LoginHandler(BaseHandler):
    def get(self):
        if self.current_user:
            self.redirect('/')
        else:
            self.render('login.html')

    def post(self):
        account = {}
        with open(os.getcwd() + "/account.json", "r") as ac:
            account = json.load(ac)

        email = self.get_argument("email")
        password = self.get_argument("password")
        login = {"email": email, "password": password}

        if login == account:
            self.set_secure_cookie('user', email, expires_days=1)
            next_url = self.get_argument("next", "")
            if next_url:
                self.redirect(next_url)
            else:
                self.redirect("/")
        else:
            self.render("login.html", error="incorrect password")


class LogoutHandler(BaseHandler):
    def post(self):
        self.clear_all_cookies()
        self.redirect("/login")