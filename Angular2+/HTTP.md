#### HTTPClient
ng5+在subscribe时：

默认传出json对象，请求`非json接口`时需在请求前设置`responseType`，否则报错异常，可选值：`json` `text` `arrayBuffer` `blob`

默认传出响应体`body`，若需要获取其他信息可通过设置`observe`更改传出值，可选值：`body` `response` `events`

```typescript
this.http.get(url, {
     observe: "response",
     responseType: "blob",
     reportProgress: true
    });
```

在上传、下载时可通过设置`reportProgress`，获取进度
```typescript
this.http.request(new HttpRequest("GET", url, { responseType: true })).pipe(map((event: HttpEvent) => {
      switch (event.type) {
        case HttpEventType.Sent:
          // begin upload
          return "";
        case HttpEventType.UploadProgress:
          // uploading
          // event.loaded / event.total
          return "";
        case HttpEventType.Response:
          // upload done
          return "";
        default:
          return "";
      }
    }));
```

HttpClient请求JSON和非JSON数据
* 设置responseType头信息为text
```javascript
this.http.get(filename, {responseType: 'text'});
```
