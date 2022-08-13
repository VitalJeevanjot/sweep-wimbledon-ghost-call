FROM node:14
WORKDIR /app
RUN apt-get update
COPY . .
RUN npm i
CMD [ "npm", "run", "dev" ]
EXPOSE 8080