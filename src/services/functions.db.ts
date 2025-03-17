import { Levels, PrismaClient, Users } from "@prisma/client";

const prisma = new PrismaClient();

type UserMinProps = {
    jid: string;
    username: string;
}

export type PromiseReturnsCreateUserDB = {
    user: Users | undefined;
    wasRegisted: boolean | undefined;
    level?: string
    error?: boolean;
}
export async function createUserDB({ jid, username }: UserMinProps): Promise<PromiseReturnsCreateUserDB | undefined> {
    try {
        const user = await getUserDB(jid)

        if (user) {
            return {
                user: user,
                wasRegisted: true,
            }
        }

        const leverOne = await prisma.levels.findFirst();

        if (leverOne) {
            const userCreated = await prisma.users.create({
                data: {
                    jid: jid,
                    username: username,
                    levelId: leverOne.id,
                    coins: leverOne.reward
                }
            });

            if (userCreated) return {
                user: userCreated,
                wasRegisted: false,
                level: leverOne.name
            };
        }

        

    } catch (error) {
        console.log('erro ao criar usuário.' + error);
        return {
            user: undefined,
            wasRegisted: undefined,
            error: true
        }
    }
}

export async function getUserDB(jid: string): Promise<Users | undefined> {
    try {
        const user = await prisma.users.findUnique({
            where: {
                jid: jid
            }
        });

        return user || undefined;
    } catch (error) {
        console.log('erro ao buscar user'+ error);
    }
}
export async function getLevelUser(jid: string): Promise<Levels | undefined> {
    try {

        const user = await getUserDB(jid);

        if(user){
            const level = await prisma.levels.findUnique({
                where: {
                    id: user.levelId
                }
            });

            if(level) return level;

            return undefined;
        }

        return undefined;
    } catch (error) {
        console.log('erro ao buscar user'+ error);
        return undefined;
    }
}

export type UserProps = {
    exists: boolean;
    info: Users | undefined | null;
    rank: Levels | undefined | null;
}