#Alpine  imagen mas liviana
FROM node:18-alpine 

WORKDIR /app 
#Copia dependencias primero
COPY package*.json . 
#Instala dependencias
RUN npm install  
#Copia todo el proyecto
COPY . .  
#Compila nestjs y crea dist
RUN npm run build 
CMD ["npm", "run", "start:dev"]