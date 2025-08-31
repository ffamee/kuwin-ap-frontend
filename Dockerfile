# Stage: base environment
FROM node:22-alpine3.20 AS base
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage: development
FROM base AS development
ENV NODE_ENV=development
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Stage: production build
FROM base AS build
ENV NODE_ENV=production
RUN npm run build

# Stage: production runtime
FROM node:22-alpine3.20 AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "run", "start"]
