from flask import Flask, request, redirect, send_from_directory
from flask import render_template, jsonify
from flask_cors import CORS
import sqlite3, json
import hashlib

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def add_data():
    data = request.get_json()
    name = data["name"]
    duration = data["duration"]
    album = data["album"]
    conn = sqlite3.connect('playlist.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS songs (id varchar(100) PRIMARY KEY, song varchar(100), duration varchar(20), album varchar(100))''')
    here = name + duration + album
    hash = hashlib.sha1(here.encode('utf-8')).hexdigest()
    conn.commit()
    c.execute("SELECT * FROM songs where id = ?", (hash, ))
    x = c.fetchall()
    if(len(x) != 0):
        return "Already in playlist"
    c.execute("INSERT INTO songs (id, song, duration, album) VALUES (?, ?, ?, ?)", (hash, name, duration, album) )
    conn.commit()
    c.close()
    conn.close()
    return "Added to playlist"

# @app.route('/playlist')
# def playlist():
#     conn = sqlite3.connect('playlist.db')
#     c = conn.cursor()
#     c.execute("SELECT * FROM songs")
#     songs = c.fetchall()
#     c.close()
#     conn.close()
#     return render_template('playlist.html', songs=songs)


# @app.route('/remove', methods=['POST'])
# def remove_data():
#     id = request.form['id']
#     print("Removing song with ID:", id)
#     conn = sqlite3.connect('playlist.db')
#     c = conn.cursor()
#     c.execute("DELETE FROM songs WHERE id=?", (id,))
#     print("Deleted", c.rowcount, "rows from the database.")
#     conn.commit()
#     c.close()
#     conn.close()
#     return redirect('/playlist')

@app.route('/api')
def get_data():
    conn = sqlite3.connect('playlist.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM songs')
    data = cursor.fetchall()
    jsonlist=[]
    for i in data:
        jsondict={}
        jsondict['id']=i[0]
        jsondict['song']=i[1]
        jsondict['duration']=i[2]
        jsondict['artist']=i[3]
        jsonlist.append(jsondict)
    return jsonify(jsonlist)


@app.route('/api/delete',methods=['POST','GET'])
def del_data():
    # print(request.json)
    response = {'message': 'Song deleted successfully'}
    id=request.json.get('id')
    # print(id)
    conn = sqlite3.connect('playlist.db')
    cursor = conn.cursor()
    cursor.execute(f'DELETE FROM songs WHERE id="{id}";')
    conn.commit()
    conn.close()
    return jsonify(response),200
    

if __name__ == '__main__':
    app.run(debug=True)