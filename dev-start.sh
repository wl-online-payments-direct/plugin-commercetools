#! /bin/sh
ls
npm run prisma:generate
npm run prisma:push
npm run build
npm run dev