# Use the official Node.js image with version 20.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copy the package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Inform Docker that the container is listening on the specified port.
EXPOSE 3000

# Run the web service on container startup.
CMD ["npm", "start"]