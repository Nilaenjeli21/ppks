# **PPKS PROJECT**

login admin
email   : admin@mail.com
password : P@ssw0rd

pimpinan login : pimpinan@mail.com
password : P@ssw0rd

##Install
1. Dawnload Nodejs versi 18.20.4
   Setelah instalasi selesai, kamu bisa memastikan bahwa Node.js dan npm telah terinstal
2. Dawnload PgAdmin4 versi 11


## Setup Project
1. clone di cmd menggunakan perintah git clone https://github.com/Nilaenjeli21/ppks
2. buka visual studio lalu buka projectnya
3. buat .env folder api dan client copikan isi yang ada di .env example baik di folder api maupun client

## Connection ke postgreSQL
Buka .env lalu ubah sesuai dengan databasemu yang ingin dipakai 
database url= postgreSQL
host=localhost
port=54320 
dbname=ppks 
user=ppks 
password=

**Please use yarn, instead of npm**\
**Please install prettier extension for auto formatting**

##Instalasi Website
npx prisma generate
npx prisma migrate dev
ambil datanya dari database ke sistem dengan perintah
yarn seed

## Jalankan Website
cd api, yarn watch
cd client, yarn dev

## Commands
Init Project
```
yarn
```

Since this project use Prisma need run this before start service
```
npx prisma generate
npx prisma migrate dev
```

Start Development Mode
```
yarn watch
```

Build Project
```
yarn Build
```

Start Project
```
yarn start
```

# Reactjs Client

## Commands
Init Project
```
yarn
```

Start Project
```
yarn dev
```

Build Project
```
yarn Build
```
