FROM ubuntu
RUN apt-get update && apt-get install -y nodejs npm
WORKDIR /home/blogserver/app
COPY package*.json ./
RUN npm install
COPY . .
RUN mv -v ./home/.ssh /home/blogserver/
EXPOSE 3000
CMD ["node", "index.js"]