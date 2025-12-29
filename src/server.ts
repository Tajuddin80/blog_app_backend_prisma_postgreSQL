import app from "./app";
import { prisma } from "./lib/prisma";

const port = process.env.PORT || 3000;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to database successfully");

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("an error occured:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
