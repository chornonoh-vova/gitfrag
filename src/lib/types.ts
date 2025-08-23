import { z } from "zod";

export const UserSchema = z.object({
  authenticated: z.boolean(),
  username: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

const ContributionCalendarMonthSchema = z.object({
  name: z.string(),
  totalWeeks: z.number(),
});

export type ContributionCalendarMonth = z.infer<
  typeof ContributionCalendarMonthSchema
>;

const ContributionCalendarDaySchema = z.object({
  contributionLevel: z.string(),
  contributionCount: z.number(),
  date: z.iso.date(),
});

export type ContributionCalendarDay = z.infer<
  typeof ContributionCalendarDaySchema
>;

export const ContributionsSchema = z.object({
  data: z.object({
    user: z
      .object({
        contributionsCollection: z.object({
          contributionCalendar: z.object({
            months: z.array(ContributionCalendarMonthSchema),
            weeks: z.array(
              z.object({
                contributionDays: z.array(ContributionCalendarDaySchema),
              }),
            ),
          }),
        }),
      })
      .nullable(),
  }),
  errors: z
    .array(
      z.object({
        type: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
});

export type Contributions = z.infer<typeof ContributionsSchema>;
