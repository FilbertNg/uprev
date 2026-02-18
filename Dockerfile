FROM node:20-alpine

WORKDIR /app

# Copy static files
COPY index.html 404.html ./

# Install serve package globally to serve static files
RUN npm install -g serve

# Serve the current directory on port 3000
CMD ["serve", "-s", ".", "-l", "3000"]

EXPOSE 3000
