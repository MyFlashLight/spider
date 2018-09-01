FROM node:8-slim
MAINTAINER Laplace <admin@laplacetech.cn>

WORKDIR /opt/app/
ADD .next/ /opt/app/.next/
ADD static/ /opt/app/static/
ADD dist/ /opt/app/dist/
ADD config/ /opt/app/config/
ADD node_modules/ /opt/app/node_modules/
ADD package.json /opt/app/package.json

EXPOSE 3000

CMD ["yarn","run","start"]
