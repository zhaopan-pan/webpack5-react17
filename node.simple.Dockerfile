# 选择一个体积小的镜像 (~5MB)
FROM node:14-alpine as builder

# 设置为工作目录，以下 RUN/CMD 命令都是在工作目录中进行执行
WORKDIR /code

# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json yarn.lock /code/

# 设置国内镜像仓库地址
RUN yarn config set registry http://registry.npm.taobao.org/
# 此时，yarn 可以利用缓存，如果 yarn.lock 内容没有变化，则不会重新依赖安装
RUN yarn

# 把宿主机的代码添加到镜像中
ADD . /code

RUN npm run build

# 启动 Node Server
CMD npx serve -s build

EXPOSE 3000
