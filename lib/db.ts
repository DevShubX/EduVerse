import {PrismaClient} from '@prisma/client'


declare global {
    var prisma : PrismaClient | undefined;
};


export const db = globalThis.prisma || new PrismaClient();


if(process.env.NODE_ENV !== "production") globalThis.prisma = db;


// GlobalThis saves the application from making connection again and again upon 
// hot reload. but in production there is no such problem as hot reload.