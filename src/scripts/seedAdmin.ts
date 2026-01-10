import { prisma } from "../lib/prisma";
import { ROLES } from "../middlewares/auth";

async function seedAdmin() {
  try {
    console.log('!!!!!!!!!!!admi seeding started!!!!!!!!!');

    //! check user exist on db or not
    const adminData = {
      name: "admin admin saheb",
      email: 'admin2@admin.com',
      password: 'admin1234',
      role: ROLES.ADMIN
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminData.email
      },
    });

    if (existingUser) {
      throw new Error('User already exists!!')
    }

    const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(adminData)
    })


    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email
        },
        data: {
          emailVerified: true
        }
      })
      console.log('!!!!!!!!!!!emailVerifictio status updated!!!!!!!!!');
    }
    // console.log(signUpAdmin);
    //todo Email verified false



  } catch (error) {
    console.error(error);
  }
}


seedAdmin()