import { Routine } from "../entity";
import { getRepository } from "typeorm";

export const findByUser = async (user) => {
  return getRepository(Routine).find({
    relations: ["contents"],
    where: { user: user },
  });
};

export const create = async (routine: Routine) => {
  const data = Routine.create(routine);
  return await Routine.save(data);
};
