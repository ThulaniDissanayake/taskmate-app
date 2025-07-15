FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps && npm install -g nodemon
COPY . .
CMD ["npm", "run", "dev"]
