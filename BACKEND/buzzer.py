# from ctypes import cdll
#
# c_int = None
# load_dll = cdll.LoadLibrary('./uio64.dll')
# usb_io_init = load_dll['usb_io_init']
# usb_io_init.argtypes = (c_int, c_int)
# usb_io_init.restype = c_int
# selectid = 609
#
#
# usb_io_output = load_dll['usb_io_output']
# usb_io_output.argtypes = (c_int, c_int, c_int, c_int, c_int, c_int)
# usb_io_output.restype = c_int
#
#
# def init_buzzer():
#     usb_io_output(selectid, 0, -4, -3, -2, -1)
#
#
# def green_buzzer():
#     init_buzzer()
#     usb_io_output(selectid, 29, 4, 0, 0, 0)
#
#
# def yellow_buzzer():
#     init_buzzer()
#     usb_io_output(selectid, 0, 3, 0, 0, 0)
#
#
# def red_buzzer():
#     init_buzzer()
#     usb_io_output(selectid, 35, 2, 1, 0, 0)
#
#
