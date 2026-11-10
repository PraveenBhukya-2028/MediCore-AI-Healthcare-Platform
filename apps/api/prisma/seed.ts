import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();
async function main() {
 const hash = await bcrypt.hash("Demo123!", 12);
 const clinic = await db.clinic.upsert({where:{id:"medicore-central"},update:{},create:{id:"medicore-central",name:"MediCore Central Clinic",address:"120 City Road",city:"London"}});
 const records = [
  {name:"Alex Morgan",email:"patient@medicore.demo",role:Role.PATIENT},
  {name:"Dr. Sarah Chen",email:"doctor@medicore.demo",role:Role.DOCTOR},
  {name:"MediCore Admin",email:"admin@medicore.demo",role:Role.ADMIN},
  {name:"Dr. James Wilson",email:"james@medicore.demo",role:Role.DOCTOR},
  {name:"Dr. Aisha Patel",email:"aisha@medicore.demo",role:Role.DOCTOR}
 ];
 for (const r of records) await db.user.upsert({where:{email:r.email},update:{name:r.name,role:r.role,passwordHash:hash},create:{...r,passwordHash:hash}});
 const specs = [
  ["doctor@medicore.demo","Cardiology",85,12],
  ["james@medicore.demo","Dermatology",75,9],
  ["aisha@medicore.demo","General Practice",55,8]
 ] as const;
 for (const [email,specialty,fee,years] of specs) {
  const u = await db.user.findUniqueOrThrow({where:{email}});
  await db.doctor.upsert({where:{userId:u.id},update:{},create:{userId:u.id,clinicId:clinic.id,specialty,consultationFee:fee,experienceYears:years,bio:`Experienced ${specialty.toLowerCase()} clinician providing patient-centred care.`}});
 }
 console.log("Seeded MediCore demo users and doctors. Password: Demo123!");
}
main().finally(()=>db.$disconnect());
