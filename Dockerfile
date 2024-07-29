FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npmmirror.com/
EXPOSE 3000
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt-get install -y vim
RUN pip3 install pygtrans --break-system-packages
CMD node src/server.js