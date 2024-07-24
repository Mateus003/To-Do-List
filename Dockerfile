FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

CMD ["npm", "run", "start-dev"]

EXPOSE 3001
