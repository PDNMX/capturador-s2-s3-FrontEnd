FROM node:18-alpine

MAINTAINER Sergio Rodríguez <sergio.rdzsg@gmail.com>

ADD . /capturador
WORKDIR /capturador

RUN npm install --loglevel error \
&& npm -g install serve \
&& npm run build

EXPOSE 5173

CMD ["serve", "-n", "-s", "dist", "-l", "5173"]
