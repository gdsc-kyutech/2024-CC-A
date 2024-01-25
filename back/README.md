# back

[ogen docs](https://ogen.dev/)

```sh
ogen -target api -clean ../docs/api.yaml
```

## test

```py
import requests
requests.get('http://localhost:8080/ping').content
requests.post('http://localhost:8080/analyze_image').content
```
