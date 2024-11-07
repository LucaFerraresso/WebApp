import { withAuth } from "next-auth/middleware";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET, // Imposta un segreto per il tuo middleware
});

export const config = {
  matcher: ["/chart"], // Imposta quali percorsi devono essere protetti
};
