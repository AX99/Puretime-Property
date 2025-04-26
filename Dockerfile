# Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the Gatsby site
RUN yarn build

# Runtime stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/public /usr/share/nginx/html

# Copy nginx configuration (if you have a custom one)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Command to run
CMD ["nginx", "-g", "daemon off;"]