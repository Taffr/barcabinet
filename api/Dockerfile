# Use an official Node.js 18 image as the base
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN yarn build

# Use a lighter image for production
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install only production dependencies using yarn
RUN yarn install --production

# Expose a port if your application listens on a specific port
EXPOSE 3000

# Define the command to run your application
CMD ["yarn", "start:prod"]

