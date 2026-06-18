# Base image
FROM node:22-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV HUSKY=0
RUN corepack enable

# Development stage
FROM base AS development
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm prisma generate

# Build stage
FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Install without running build scripts to avoid ERR_PNPM_IGNORED_BUILDS
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN npx prisma generate
RUN pnpm build

# Production stage
FROM base AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/generated ./generated

EXPOSE 8080

CMD ["node", "dist/src/main"]
