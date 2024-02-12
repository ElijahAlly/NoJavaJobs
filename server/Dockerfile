# Use an official Node runtime as a parent image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json ./
COPY yarn.lock ./

# Install any needed packages specified in package.json
RUN yarn install

# Bundle app source
COPY . .

# Your app binds to port 5005 so use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5005

# Define environment variable
ENV NODE_ENV production

# Run app.js when the container launches
CMD ["node", "app.js"]
