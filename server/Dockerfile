# Pull Docker Hub base image
FROM node:14.16.0-alpine3.10
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install -qyg nodemon@2.0.15
RUN npm install -qy
# Copy app to container
COPY . .

EXPOSE 5000

# Run the "start" script in package.json
CMD ["npm", "start"]