import { getConnection } from "typeorm";
import { Routine } from "../entity";


export const findByUser = async (user) => {
  return await Routine.find({user});
};


export const enroll = async (userid, routine: Routine) => {
  const routineExist = await Routine.findOne({where: {user: userid, contents: routine.contents }});
  if(routineExist){
    // 해지한 후 재등록
    await changeActive(routineExist, true);
    return routineExist;
  }
  // 최초 등록
  return await create(userid, routine);

};
export const changeActive = async (routine: Routine, isActive: boolean)=> {
    routine.isActive = isActive;
    await routine.save();
};

export const create = async (userId, routine: Routine)=> {
  const data = await Routine.create(routine);
  data.user = userId;
  await Routine.save(data);
  return Routine.findOne({id: data.id});
};
