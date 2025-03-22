# Use Node.js 22 as base image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variables (these will be overridden by docker-compose)
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]