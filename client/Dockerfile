# Use a multi-stage build to reduce image size
FROM node:16-alpine AS builder

WORKDIR /

# Set environment variables directly
ENV WEB3PRODUCTID="0ac2dfebf04b585872a69ef495846553" \
    NFTSTORAGE="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY2ODk3NkI1Nzk0M0MwMWFFNTU3OTBEMjg0NWI1NzMyOEMxQTc1RTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5Mzk5OTAxMzMyNCwibmFtZSI6Ik5GVGljIE1hcmtldHBsYWNlIn0.bWU9yn_DF-zqb-5k9toHERUhrQDqwm72nl_iOCdp9Ks" \
    ADDRESS_DEPLOYED_TO="0x81AA8e38F2dBEedD336534E3FC5C0C7D490b1dc3" \
    SEP_URL="https://sepolia.infura.io/v3/e43f48147e7c43cdb90c05220625cf9b" \
    APOLLO_KEY="c2fcf4f2f2ec6fcae0f4500575129850"

# Copy package.json and package-lock.json for the root directory
COPY package*.json ./

# Create the 'nfticmarketplace' and 'graphclient' directories
RUN mkdir nfticmarketplace graphclient

# Copy package.json and package-lock.json for the 'nfticmarketplace' and 'graphclient' directories
COPY package*.json ./nfticmarketplace/
COPY package*.json ./graphclient/
COPY next.config.js apollo.config.js abi.json apollo-client.js ./
COPY tailwind.config.js postcss.config.js ./

# Install dependencies for the root directory
RUN npm install --force

# Copy the rest of the application code
COPY . .
COPY schema.graphql ./
COPY .graphclient/ .graphclient/

# Build the production version of your application
RUN npm run build

# Start a new stage to create a smaller final image
FROM node:16-alpine

# Set the working directory
WORKDIR /

# Copy the built application from the previous stage
COPY --from=builder /.next /.next/
COPY --from=builder /node_modules ./node_modules
COPY --from=builder /package.json ./package.json
COPY --from=builder /package-lock.json ./package-lock.json
COPY --from=builder /.next/static/css/1f9d5459545c9341.css /.next/static/css/1f9d5459545c9341.css
# Expose port 3000
EXPOSE 3000

# Start your application
CMD ["npm", "run", "start"]
