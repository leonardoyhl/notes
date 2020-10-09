### 安装失败
手动下载`binding.node`，`.npmrc`文件配置`SASS_BINARY_PATH={path}`

查看所需的node-sass版本：
`node -p "[process.platform, process.arch, process.versions.modules].join('-')"`
