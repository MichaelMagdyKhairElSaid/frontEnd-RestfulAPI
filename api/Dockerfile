FROM node:20-alpine3.16
WORKDIR /app
COPY . /app
RUN npm install express
RUN npm install lodash
RUN npm install cors
RUN npm install uuid
EXPOSE 5000
CMD ["node", "./index.js"]