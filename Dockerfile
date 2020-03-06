FROM node:8-alpine

WORKDIR /dist

ADD package.json /app/package.json

RUN npm config set registry http://registry.npmjs.org

RUN npm install

ADD . /dist

EXPOSE 3000

CMD ["npm", "run", "start:prod"]