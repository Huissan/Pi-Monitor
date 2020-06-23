import tornado.web
from .base import BaseHandler

# from hardware import board_ctrl


class IndexHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('index.html') #, cpu_temperature="%s°C" % board_ctrl.get_cpu_temp())
    
    # def post(self):
    #     board_ctrl.init_gpio()
    #     arg = self.get_argument('k')
 
    #     if (arg == 'w'):
    #         print('press w')
 
    #     if (arg == 'o'):
    #         board_ctrl.open_light()
    #         self.write(arg)
 
    #     if (arg == 'c'):
    #         board_ctrl.close_light()
    #         self.write(arg)
 
    #     if (arg == 't'):
    #         board_ctrl.get_cpu_temperature()
    #         self.write(arg)
 
    #     if (arg == 'p'):
    #         self.write(str(board_ctrl.get_cpu_temp()))
 
