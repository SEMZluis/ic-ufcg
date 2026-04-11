from flask import Flask, render_template

app = Flask(__name__)

#rotas 
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/conversor-de-bases')
def conversor():
    return render_template('conversor.html')