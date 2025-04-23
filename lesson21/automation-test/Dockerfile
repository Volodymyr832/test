FROM mcr.microsoft.com/playwright:v1.52.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --omit=optional

COPY . .

CMD ["npx", "playwright", "test"]
