# Imagem base do Node.js
FROM node:16

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Compilar o TypeScript
RUN npx tsc

# Expor a porta do aplicativo
EXPOSE 80

# Comando para iniciar a aplicação
CMD ["node", "dist/server.js"]
