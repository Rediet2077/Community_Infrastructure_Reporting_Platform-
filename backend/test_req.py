import urllib.request, json, urllib.error
req = urllib.request.Request(
    'http://localhost:8000/api/v1/reports/', 
    data=json.dumps({'title':'test2','description':'test','category_id':'d5029881-2d3a-4add-817d-1c48614d39ee','latitude':9.0,'longitude':38.0,'priority':'MEDIUM', 'media_images': ['base64_fake']}).encode('utf-8'), 
    headers={'Content-Type': 'application/json'}
)
try:
    resp = urllib.request.urlopen(req)
    print('Success:', resp.status)
except urllib.error.HTTPError as e:
    print('Error:', e.code, e.read().decode('utf-8'))
