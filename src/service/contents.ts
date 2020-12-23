import { Contents } from "../entity";
import {routineService} from '../service'
import { createQueryBuilder, getRepository } from "typeorm";

export const find = async (userId) => {
  if (!userId) return await Contents.find();

  return await createQueryBuilder("Contents")
    .leftJoinAndSelect(
      "Contents.routines",
      "Routine",
      "Routine.user= :id", { id: userId }
    ).getMany()
};

export const findOne = async (id, userId) => {
  console.log('id', id)
  if (!userId) return await Contents.findOne({ id });

  return await createQueryBuilder("Contents")
    .leftJoinAndSelect(
      "Contents.routines",
      "Routine",
      "Routine.user= :id", { id: userId }
    )
    .where('Contents.id = :id', { id })
    .getOne()
};

export const create = async (contents: Contents) => {
  const data = Contents.create(contents);
  return await Contents.save(data);
};
