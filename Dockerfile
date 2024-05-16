# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Run your application using the 'dev' script
CMD ["npm", "run", "dev"]
