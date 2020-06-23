
#!/usr/bin/env python
# coding=utf-8
 
import os.path
 
# import tornado.web
import tornado.httpserver
import tornado.ioloop
import tornado.options

from handlers.index import IndexHandler
from handlers.auth import LoginHandler, LogoutHandler
 
from tornado.options import define, options
define("port", default=80, help="run on the given port", type=int)



if __name__ == "__main__":
    tornado.options.parse_command_line()
    settings = {
        "login_url": "/login",
        "cookie_secret": "Huissan",
        "template_path": os.path.join(os.path.dirname(__file__), "templates"),
        "static_path": os.path.join(os.path.dirname(__file__), "static"),
        "debug": True
    }
    app = tornado.web.Application(
        handlers=[
            (r'/', IndexHandler),
            (r'/index', IndexHandler), 
            (r'/login', LoginHandler), 
            (r'/logout', LogoutHandler),
        ],
        **settings
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
