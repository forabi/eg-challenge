#!/bin/sh

# Install pnpm
npm install -g pnpm

# Clean install
rm -rf node_modules pnpm-lock.yaml
rm -rf frontend/node_modules frontend/pnpm-lock.yaml
rm -rf backend/node_modules backend/pnpm-lock.yaml

# Install dependencies
pnpm install

# Install global packages
pnpm add -g @nestjs/cli typescript ts-node

# Run initial build to generate type definitions
pnpm build

chmod +x .devcontainer/post-create.sh