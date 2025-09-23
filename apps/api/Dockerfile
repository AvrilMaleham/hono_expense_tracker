FROM oven/bun:1.2.9-alpine

# Fix certificate issues
RUN apk add --no-cache ca-certificates

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./
COPY apps/api/package.json ./apps/api/
COPY packages/schemas/package.json ./packages/schemas/

# Install dependencies
RUN bun install

# Copy source code
COPY packages/schemas ./packages/schemas
COPY apps/api ./apps/api

# Set working directory to API
WORKDIR /app/apps/api

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD bun --version || exit 1

# Start the application
CMD ["bun", "run", "start"]
