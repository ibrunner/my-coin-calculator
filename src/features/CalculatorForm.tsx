import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const calculatorFormSchema = z.object({
  initialInvestment: z.number(),
  regularInvestment: z.number().min(1, {
    message: 'Regular investment must be greater than 0',
  }),
  durationMonths: z.number(),
});

const CalculatorForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof calculatorFormSchema>>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      initialInvestment: 1000,
      regularInvestment: 100,
      durationMonths: 60,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof calculatorFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="initialInvestment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Investment</FormLabel>
              <FormControl>
                <Input placeholder="upfront investment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="regularInvestment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regular Investment</FormLabel>
              <FormControl>
                <Input placeholder="regular investment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CalculatorForm;
