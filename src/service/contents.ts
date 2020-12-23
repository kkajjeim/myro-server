import { Contents } from "../entity";
import { routineService } from "../service";
import { createQueryBuilder, getRepository } from "typeorm";
import { where } from "underscore";

export const find = async (userId) => {
  if (!userId) return await Contents.find();

  return await createQueryBuilder("Contents")
    .leftJoinAndSelect(
      "Contents.routines", 
      "Routine", 
      "Routine.user= :id", {id: userId})
    .getMany();
};

export const findOne = async (id, userId) => {
  if (!userId) return await Contents.findOne({ id });
  
  return await createQueryBuilder("Contents")
    .where("Contents.id = :id", { id })
    .leftJoinAndSelect(
      "Contents.routines", 
      "Routine", 
      "Routine.user= :userId", {userId})
    .getOne()

};

export const create = async (contents: Contents) => {
  const data = Contents.create(contents);
  return await Contents.save(data);
};
