# Build stage
FROM oven/bun:1.2.9-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
COPY apps/api/package.json ./apps/api/
COPY packages/schemas/package.json ./packages/schemas/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY packages/schemas ./packages/schemas
COPY apps/api ./apps/api

# Build schemas package
WORKDIR /app/packages/schemas
RUN bun run build

# Production stage
FROM oven/bun:1.2.9-alpine AS production

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./
COPY apps/api/package.json ./apps/api/
COPY packages/schemas/package.json ./packages/schemas/

# Install production dependencies only
RUN bun install --frozen-lockfile --production

# Copy built schemas and source code
COPY --from=builder /app/packages/schemas ./packages/schemas
COPY apps/api ./apps/api

# Set working directory to API
WORKDIR /app/apps/api

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["bun", "run", "start"]
