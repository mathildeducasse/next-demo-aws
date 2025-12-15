FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production 

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000

# Next.js recommended security setup (runs as non-root user)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

# Copy essential files from the builder stage:
# 1. The optimized production build
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next/
# 2. Production dependencies (installing them separately ensures only production ones are present)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
# 3. Public assets
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

EXPOSE $PORT
CMD ["node", "node_modules/.bin/next", "start"]