// db/seed.ts

import { faker } from "@faker-js/faker";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

// async function main() {
//   for (let i = 0; i < 50; i++) {
//     const user = await db.random.create({
//       data: {
//         email: faker.internet.email(),
//         name: faker.person.fullName(),
//         admitted: faker.datatype.boolean(),
//         test: {
//           create: Array.from({ length: 20 }, () => ({
//             report: faker.lorem.sentence(),
//             date: faker.date.past(),
//           })),
//         },
//         meds: {
//           create: Array.from({ length: 20 }, () => ({
//             medication: faker.animal.bear(),
//             date: faker.date.past(),
//           })),
//         },
//       },
//     });
//   }

//   console.log("Seed data created successfully");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await db.$disconnect();
//   });

// seed.js

async function main() {
  // Define roles and the number of users for each role
  const roles = [
    UserRole.DOCTOR,

    UserRole.NURSE,
    UserRole.STAFF,
    UserRole.PATIENT,
  ];

  const usersPerRole = {
    [UserRole.DOCTOR]: 5,

    [UserRole.NURSE]: 20,
    [UserRole.STAFF]: 30,
    [UserRole.PATIENT]: 50,
  };
  for (const role of roles) {
    for (let i = 0; i < usersPerRole[role]; i++) {
      const user = await db.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          image: faker.image.avatar(),
          password: faker.internet.password(),
          role: role,
        },
      });

      // Create an Account for the user
      await db.account.create({
        data: {
          userId: user.id,
          type: "oauth",
          provider: "google",
          providerAccountId: faker.string.uuid(),
          refresh_token: faker.internet.password({ length: 20 }),
          access_token: faker.internet.password({ length: 20 }),
          expires_at: Math.floor(Date.now() / 1000) + 3600,
          token_type: "Bearer",
          scope: "read,write",
          id_token: faker.internet.password({ length: 20 }),
          session_state: faker.internet.password({ length: 20 }),
        },
      });

      // Create related entity based on role
      if (role === UserRole.DOCTOR) {
        await db.doctor.create({
          data: {
            userId: user.id,
            fullname: user.name ?? "unknown",
            dob: faker.date.past().toISOString().split("T")[0],
            gender: faker.person.gender(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            medicalLicenseNumber: faker.string.uuid(),
            specialization: faker.person.jobType(),
            yearsOfExperience: faker.datatype
              .number({ min: 1, max: 30 })
              .toString(),
          },
        });
      } else if (role === UserRole.NURSE) {
        await db.nurse.create({
          data: {
            userId: user.id,
            fullname: user.name ?? "unknown",
            dob: faker.date.past().toISOString().split("T")[0],
            gender: faker.person.gender(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            nursingLicenseNumber: faker.datatype.uuid(),
            department: faker.commerce.department(),
            yearsOfExperience: faker.datatype
              .number({ min: 1, max: 30 })
              .toString(),
          },
        });
      } else if (role === UserRole.STAFF) {
        await db.staff.create({
          data: {
            userId: user.id,
            fullname: user.name ?? "unknown",
            dob: faker.date.past().toISOString().split("T")[0],
            gender: faker.person.gender(),
            phone: faker.phone.number(),
            address: faker.location.streetAddress(),
            position: faker.person.jobTitle(),
            department: faker.commerce.department(),
          },
        });
      } else if (role === UserRole.PATIENT) {
        const patient = await db.patient.create({
          data: {
            userId: user.id,
            fullname: user.name ?? "unknown",
            dob: faker.date.past().toISOString().split("T")[0],
            gender: faker.person.gender(),
            phone: faker.phone.number(),
            admitted: faker.datatype.boolean(),
            address: faker.location.streetAddress(),
            nextofkin: faker.person.fullName(),
            nextofphone: faker.phone.number(),
          },
        });

        // Create Appointments for Patient and link them
        // for (let j = 0; j <= 1; j++) {
        //   await db.appointment.create({
        //     data: {
        //       day: faker.date.soon().toISOString(),
        //       time: faker.time.recent('abbr'),
        //       note: faker.lorem.sentence(),
        //       patientId: patient.id,
        //     },
        //   });
        // }

        // Create Doctor's Reports for Patient
        const doctors = await db.doctor.findMany();
        for (let k = 0; k < 40; k++) {
          const randomDoctor =
            doctors[Math.floor(Math.random() * doctors.length)];
          await db.doctorsreport.create({
            data: {
              date: faker.date.recent(),
              symptoms: faker.lorem.sentence(),
              diagnosis: faker.lorem.sentence(),
              labtest: faker.lorem.sentence(),
              labtestresult: faker.lorem.sentence(),
              prescription: faker.lorem.sentence(),
              patientId: patient.id,
              docId: randomDoctor.id,
            },
          });
        }
        const doctorss = await db.doctor.findMany();
        for (let k = 0; k < 40; k++) {
          const randomsDoctor =
            doctorss[Math.floor(Math.random() * doctorss.length)];
          await db.medications.create({
            data: {
              date: faker.date.recent(),
              medication:
                "haloperidol Injection: 5 mg in 1 mL ampoule., hyoscine hydrobromide:Injection: 400 micrograms/ mL; 600 micrograms/ mL, lamotrigine*:Tablet: 25 mg, ALL INJECTIONS TO BE GIVEN WITHIN 5DAYS",
              patientId: patient.id,
              docId: randomsDoctor.id,
            },
          });
        }
        const nurses = await db.nurse.findMany();
        if (nurses.length > 0) {
          for (let k = 0; k < 40; k++) {
            const randomNurse =
              nurses[Math.floor(Math.random() * nurses.length)];
            await db.injection.create({
              data: {
                date: faker.date.recent().toISOString(),
                injection:
                  "haloperidol Injection: 5 mg in 1 mL ampoule., hyoscine hydrobromide:Injection: 400 micrograms/ mL; 600 micrograms/ mL, lamotrigine*:Tablet: 25 mg, ALL INJECTIONS TO BE GIVEN WITHIN 5DAYS",
                patientId: patient.id,
                nurseId: randomNurse.id,
              },
            });
          }
        }
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
