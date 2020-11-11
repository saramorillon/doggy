import logging
import os
from functools import wraps

from flask import Flask, redirect, render_template, request, session, url_for
from flask_session import Session

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'

sess = Session()
sess.init_app(app)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function


@app.route('/', methods=["GET"])
@login_required
def get_home():
    return render_template('home.html', user=session['user'])


@app.route('/login', methods=["GET"])
def get_login():
    return render_template('login.html')


@app.route('/login', methods=["POST"])
def post_login():
    session['user'] = {
        "username": request.form['username']
    }
    return redirect('/')
