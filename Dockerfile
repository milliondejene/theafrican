# Use an official Node.js image compatible with ARM64
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Gatsby application
RUN npm run build

# Create a lightweight production image
FROM node:18-alpine AS runner

# Set environment variables
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Optional: If you need a specific directory for uploads or data persistence
# You can set this up in your Dockerfile or specify it during the container run.
RUN mkdir -p /mnt/data/uploads

# Expose the Gatsby port (default is 8000 but you want to use 3001)
EXPOSE 3001

# Start the Gatsby application
CMD ["npm", "run", "serve", "--port", "3001"]
