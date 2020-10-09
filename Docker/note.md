
H5+rtsp+flv.js
* https://www.### 教程：https://yeasy.gitbooks.io/docker_practice/
#### 清理Docker占用的磁盘空间
* http://dockone.io/article/3056
#### Docker空间使用分析与清理
* https://www.jianshu.com/p/54e7bcc9f147
#### Docker容器日志占用空间过大解决办法
* https://blog.csdn.net/gdsfga/article/details/90599131

------

查看镜像详细信息
`docker inspect imageID` 包含创建者、各层数字摘要

查看镜像历史/各层内容
`docker history imageID`

删除容器
`docker rm -f -v container`
* -f 强制删除运行中的
* -v 同时删除volume


可视化管理界面
* portainer
`docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock --restart=always --name prtainer portainer/portainer`jb51.net/html5/685312.html
* https://github.com/WhuRS-FGis/html5-rtsp

video.js

rtsp+rtmp+video.js

EasyPlayer-RTSP

利用ffmpeg从RTSP服务器拉流并保存各种格式文件：
* https://www.jianshu.com/p/c8488537501b


SRS
* https://www.cnblogs.com/yjmyzz/p/srs_study_1_install_push_and_pull_stream.html


rtsp拉流简单封装库，支持多路请求ps流封装：
* https://download.csdn.net/detail/encoder1234/10860708

最全最常用的RTMP、RTSP、HTTP协议流常用直播流地址：
* https://blog.csdn.net/u014162133/article/details/81188410
