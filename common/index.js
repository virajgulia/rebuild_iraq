import moment from "moment";

export const STRIPE_KEY =
  process.env.STRIPE_KEY || "pk_live_c1OxkS3ia3LHXXOBTQENfNsx";
export const STRIPE_SECRET =
  process.env.STRIPE_SECRET || "sk_live_B42xfaD1xoqCSXTc8mnDBmSS";

export const check48Hours = (startTime) => {
  const subTime = moment().subtract(48, "hours");

  return subTime;
};
