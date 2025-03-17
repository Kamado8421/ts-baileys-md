"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDB = createUserDB;
exports.getUserDB = getUserDB;
exports.getLevelUser = getLevelUser;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUserDB(_a) {
    return __awaiter(this, arguments, void 0, function* ({ jid, username }) {
        try {
            const user = yield getUserDB(jid);
            if (user) {
                return {
                    user: user,
                    wasRegisted: true,
                };
            }
            const leverOne = yield prisma.levels.findFirst();
            if (leverOne) {
                const userCreated = yield prisma.users.create({
                    data: {
                        jid: jid,
                        username: username,
                        levelId: leverOne.id,
                        coins: leverOne.reward
                    }
                });
                if (userCreated)
                    return {
                        user: userCreated,
                        wasRegisted: false,
                        level: leverOne.name
                    };
            }
        }
        catch (error) {
            console.log('erro ao criar usuário.' + error);
            return {
                user: undefined,
                wasRegisted: undefined,
                error: true
            };
        }
    });
}
function getUserDB(jid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.users.findUnique({
                where: {
                    jid: jid
                }
            });
            return user || undefined;
        }
        catch (error) {
            console.log('erro ao buscar user' + error);
        }
    });
}
function getLevelUser(jid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield getUserDB(jid);
            if (user) {
                const level = yield prisma.levels.findUnique({
                    where: {
                        id: user.levelId
                    }
                });
                if (level)
                    return level;
                return undefined;
            }
            return undefined;
        }
        catch (error) {
            console.log('erro ao buscar user' + error);
            return undefined;
        }
    });
}
