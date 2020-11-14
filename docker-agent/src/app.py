import docker
from flask import Flask, jsonify

app = Flask(__name__)


client = docker.from_env()


def parsePorts(ports: dict):
    result = []
    for key, values in ports.items():
        for value in values:
            hostIp = value['HostIp'] if value['HostIp'] else '0.0.0.0'
            hostPort = value['HostPort']
            result.append(hostIp + ':' + hostPort + '->' + key)
    return result


def parseState(state: dict):
    return {
        'status': state['Status'],
        'startDate': state['StartedAt'],
        'endDate': state['FinishedAt']
    }


def getContainers():
    containers = client.containers.list(True)
    result = []
    for container in containers:
        result.append({
            'id': container.id,
            'name': container.name,
            'image': container.attrs['Config']['Image'],
            'state': parseState(container.attrs['State']),
            'port': parsePorts(container.attrs['HostConfig']['PortBindings'])
        })
    return result


@app.route('/containers')
def get_containers():
    return jsonify(getContainers())
