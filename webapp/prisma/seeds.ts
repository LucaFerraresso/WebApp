import { prisma } from "../lib/prisma";

async function main() {
  await prisma.user.create({
    data: {
      username: "asdasd",
      email: "asdasd@asd.com",
      password: "asdasd",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
