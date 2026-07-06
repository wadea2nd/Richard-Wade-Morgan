"""Minimal static file server for local preview (avoids os.getcwd())."""
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
Handler = partial(SimpleHTTPRequestHandler, directory=ROOT)

if __name__ == "__main__":
    with ThreadingHTTPServer(("127.0.0.1", 4173), Handler) as httpd:
        print("Serving %s at http://127.0.0.1:4173" % ROOT, flush=True)
        httpd.serve_forever()
