import {Response} from "express";
import {getRepository, ObjectType} from "typeorm";

export async function remove<T>(param: any, res: Response, type: ObjectType<T>) {
    const repo = getRepository(type);
    try {
        const dbResult: any = await repo.findOneOrFail(param);
        await repo.delete(dbResult["id"]).then(() =>
            res.send(dbResult))
            .catch(err => res.status(500).send(err));
    } catch (e) {
        return res.status(404).send("Nothing found for " + type);
    }
}

/**
 *
 * @param param     The parameter used by TypeORM to search for the entity
 *                  It should be ideally [id]
 * @param res       The response object passed from the controller
 * @param type      The type of the Object used as Entity (ex: User, Project)
 *                  this is wrapped in an ObjectType specific to TypeORM and
 *                  is the same tape as T (the generic type signature of the function)
 * @param editData  The data that will replace the data in the database entry if the entry
 *                  is found
 */
export async function edit<T>(param: any, res: Response, type: ObjectType<T>, editData: {}) {
    const repo = getRepository(type);
    try {
        let dbResult: any = await repo.findOneOrFail(param);
        dbResult = {...editData};
        await repo.save(dbResult).then(() =>
            res.send(dbResult))
            .catch(err => res.status(503).send(err));
    } catch (e) {
        return res.status(404).send("Nothing found for " + type);
    }
}

export async function foof<T>(param: any, type: ObjectType<T>, res: Response) {
    const repo = getRepository(type);
    try {
        const project = await repo.findOneOrFail(param);
        return res.send(project);
    } catch (e) {
        return res.status(404).send({error: "Nothing found for " + type, e: JSON.stringify(e)});
    }
}

export async function save<T>(data: [boolean, any], res: Response, type: ObjectType<T>) {
    if (!data[0]) return res.status(500).send(data[1] + " is missing in the request body");
    const repo = getRepository(type);
    try {
        await repo.save(data[1]);
    } catch (e) {
        return res.status(500).send({error: "Something went wrong while saving", e});
    }
    return res.send(data[1]);
}
