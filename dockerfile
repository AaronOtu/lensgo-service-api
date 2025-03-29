FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY tsconfig*.json ./

RUN npm install

ENV JWT_SECRET=DevIgnite
ENV DB_URL=mongodb+srv://AaronOtu:Dun%40m1%2499@nodejsexpressproject.3wc7g.mongodb.net/Photo_booking-API



COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]