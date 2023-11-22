import http.server
import socketserver

PORT = 8002  # You can change the port as needed
Handler = http.server.SimpleHTTPRequestHandler

class MyHandler(Handler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()

