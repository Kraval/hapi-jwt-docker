
# Pull base image from stock node image.
FROM node:8

# Add the current working folder as a mapped folder at /usr/src/app
ADD . /usr/src/app

# Set the current working directory to the new mapped folder.
WORKDIR /usr/src/app

# Install Dependencies
RUN npm install 

# Expose the hapijs server port to the Docker host.
EXPOSE 3000

# Run the start script
CMD [ "npm", "start" ]