import { clientConfig } from "../client-config";
import type { ContactFormValues } from "../client-definitions";

const contactUs = async ({ email, firstname, lastname, message, subject }: ContactFormValues) => {
  try {
    const r = await fetch(clientConfig.platform.contactUsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstname, lastname, message, subject }),
    });

    const data = await r.json();

    if (!r.ok) {
      throw new Error(data?.response);
    }
    console.log(data);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error(String(err));
  }
};

export default contactUs;
