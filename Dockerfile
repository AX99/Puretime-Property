# create a dockerfile to run this gatsby project# Use an official Node runtime as a parent image
FROM node:18
# Set the working directory in the container
WORKDIR /app
# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./
# Install dependencies
RUN yarn install
# Bundle app source inside the Docker image
COPY . .
# Make port 8000 available to the world outside this container
EXPOSE 8000
# Run gatsby develop on container start
CMD ["yarn", "run", "develop"]