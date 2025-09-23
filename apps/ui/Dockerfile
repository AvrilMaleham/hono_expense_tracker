# Build stage
FROM oven/bun:1.2.9-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
COPY apps/ui/package.json ./apps/ui/
COPY packages/schemas/package.json ./packages/schemas/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY packages/schemas ./packages/schemas
COPY apps/ui ./apps/ui

# Build schemas package
WORKDIR /app/packages/schemas
RUN bun run build

# Build UI
WORKDIR /app/apps/ui
RUN bun run build

# Production stage with nginx
FROM nginx:alpine AS production

# Copy built assets
COPY --from=builder /app/apps/ui/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/ui/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
