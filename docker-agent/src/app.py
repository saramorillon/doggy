import docker
from flask import Flask, jsonify

app = Flask(__name__)


client = docker.from_env()


@app.route('/containers')
def get_containers():
    containers = [c.attrs for c in client.containers.list(True)]
    return jsonify(containers)
