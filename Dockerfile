ARG APP_PROJECT=snapboard
ARG OUTPUT_DIR=dist/apps/frontend/snapboard

FROM node:18-bullseye-slim AS deps
WORKDIR /app
RUN apt-get update \
  && apt-get install -y python3 build-essential g++ ca-certificates libvips-dev \
  && rm -rf /var/lib/apt/lists/*
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-bullseye-slim AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ARG APP_PROJECT=snapboard
RUN npx nx build $APP_PROJECT --configuration=production

FROM nginx:stable-alpine AS runner
ARG OUTPUT_DIR=dist/apps/frontend/snapboard
COPY --from=builder /app/${OUTPUT_DIR} /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
