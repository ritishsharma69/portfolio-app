import { z, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function validate(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse({ body: req.body, params: req.params, query: req.query });
      // Optionally assign parsed data back
      (req as any).validated = data;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({ error: 'Validation error', details: e.format() });
      }
      next(e);
    }
  };
}

export const schemas = {
  login: z.object({ body: z.object({ email: z.string().email(), password: z.string().min(6) }) }),
  messageCreate: z.object({ body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().optional().default(''),
    message: z.string().min(1),
  }) }),
  settingsPatch: z.object({ body: z.object({
    email: z.string().email().optional(),
    phone: z.string().max(50).optional(),
    location: z.string().max(100).optional(),
    availabilityText: z.string().max(300).optional(),
    socials: z.object({
      linkedin: z.string().url().optional(),
      github: z.string().url().optional(),
      instagram: z.string().url().optional(),
      x: z.string().url().optional(),
      behance: z.string().url().optional(),
    }).partial().optional(),
  }).partial() }),
};

