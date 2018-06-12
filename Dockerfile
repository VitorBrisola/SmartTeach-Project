#FROM lets us specify which base image from Docker Hub we want to build from.
#In our case, we are using the latest version of the official node image.
FROM node:latest

#Creates a new directory 
RUN mkdir -p /usr/src/app

#Sets the newly created directory as the working dir, run copy and cmd run on this dir
WORKDIR /app

#COPY the package.json file over to our working directory.
COPY package.json /app

#Runs npm install, to download and configure dependencies.
RUN npm install

#Lets us copy our entire local directory into our working directory to bundle our application source code.
COPY . /app

# Exposes a port in which the container will listen on
EXPOSE 5000

#This CMD sets the default command to execute our container
CMD npm start