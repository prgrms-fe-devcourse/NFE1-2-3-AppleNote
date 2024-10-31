import { validators } from "@src/utils/validators";
import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

import serviceAccount from "FirebaseAdmin.json";

const env = validators.getValidatedENV(process.env.STORAGE_BUCKET);

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket: env,
});

const bucket = getStorage(app).bucket();

export { bucket };
