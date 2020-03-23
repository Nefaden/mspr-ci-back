FROM node:8-alpine

WORKDIR /

ADD package.json /package.json

RUN npm config set registry http://registry.npmjs.org

RUN npm install

ADD . /

RUN npm run prebuild

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]