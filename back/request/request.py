import base64
import pprint
import requests

localhost = 'http://localhost:8080'

r = requests.get(localhost+'/ping')
print(r.text)

# カレントディレクトリにあるlight.jpegを読み込む
with open('light.jpeg', 'rb') as f:
    img = f.read()
d = {'image': base64.b64encode(img).decode('utf-8')}
pprint.pprint(d)
r = requests.post(localhost+'/analyze_image', json=d, headers={'Content-Type': 'application/json'})
print(r.text)
