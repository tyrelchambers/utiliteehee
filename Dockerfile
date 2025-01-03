FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* .npmrc* prisma ./
RUN   --mount=type=secret,id=FONTAWESOME_PACKAGE_TOKEN,env=FONTAWESOME_PACKAGE_TOKEN \
      --mount=type=secret,id=DB_URL,env=DB_URL \ 
      npm ci --force


# Rebuild the source code only when needed
FROM base AS builder
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN --mount=type=secret,id=WEBUI_TOKEN,env=WEBUI_TOKEN \
    --mount=type=secret,id=WEBUI_URL,env=WEBUI_URL \
    --mount=type=secret,id=OLLAMA_MODEL,env=OLLAMA_MODEL \ 
    --mount=type=secret,id=FONT_HOST_URL,env=FONT_HOST_URL \
    --mount=type=secret,id=DB_URL,env=DB_URL \
    --mount=type=secret,id=SPOTIFY_ID,env=SPOTIFY_ID \
    --mount=type=secret,id=SPOTIFY_SECRET,env=SPOTIFY_SECRET \
    npm run build
  RUN npx prisma generate

# Production image, copy all the files and run next
FROM base AS runner
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/exports ./exports

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]