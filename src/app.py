from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/login/<username>')
def test_template(username: str):
    return render_template('login.html', username=username)
