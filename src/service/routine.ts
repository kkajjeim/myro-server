import { Routine } from "../entity";

export const findByUser = async (user) => {
  return Routine.find({
    relations: ["contents"],
    where: { user: user },
  });
};

export const create = async (routine: Routine) => {
  const data = Routine.create(routine);
  return await Routine.save(data);
};
