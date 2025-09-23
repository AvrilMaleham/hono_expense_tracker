# Build stage
FROM oven/bun:1.2.9-alpine AS builder

WORKDIR /app

# Copy package files for dependency caching
COPY package.json bun.lock ./
COPY apps/ui/package.json ./apps/ui/
COPY packages/schemas/package.json ./packages/schemas/

# Install dependencies
RUN bun install

# Copy source code and build
COPY . .
WORKDIR /app/apps/ui
RUN bun run build

# Production stage with nginx
FROM nginx:alpine

# Copy built assets and nginx config
COPY --from=builder /app/apps/ui/dist /usr/share/nginx/html
COPY apps/ui/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
