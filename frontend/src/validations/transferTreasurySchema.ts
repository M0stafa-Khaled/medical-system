import { z } from "zod";

const transferTreasurySchema = z.object({
  from_treasury: z.object({
    value: z.string(),
    label: z.string(),
  }),
  to_treasury: z.object({
    value: z.string(),
    label: z.string(),
  }),
});

export default transferTreasurySchema;
