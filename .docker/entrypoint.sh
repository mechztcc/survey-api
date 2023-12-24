#!/bin/bash
npm install 

RUN npx prisma generate

npm run start:dev