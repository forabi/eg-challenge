FROM node:18.18.2-alpine

# Install git and other essential tools
RUN apk add --no-cache git

# Install pnpm
RUN npm install -g pnpm

# Create workspace directory
WORKDIR /workspace

# Set up non-root user
USER node