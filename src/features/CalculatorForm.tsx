import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const periods = ['daily', 'weekly', '2xMonthly', 'monthly'] as const;
const durationSteps = [6, 12, 18, 24, 36, 48, 60] as const;

const calculatorFormSchema = z.object({
  initialInvestment: z.number(),
  regularInvestment: z.number().min(1, {
    message: 'Regular investment must be greater than 0',
  }),
  period: z.enum(periods),
  durationMonths: z.number().min(0).max(6),
  priceTarget: z.number(),
  volatility: z.number().min(0).max(4),
  whatIf: z.number().min(0).max(4),
});

const CalculatorForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof calculatorFormSchema>>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      initialInvestment: 1000,
      regularInvestment: 100,
      period: 'weekly',
      durationMonths: 3,
      priceTarget: 100,
      volatility: 0,
      whatIf: 0,
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
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="2xMonthly">2x Monthly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FormField
          control={form.control}
          name="priceTarget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Target</FormLabel>
              <FormControl>
                <Input placeholder="price target" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Slider
                defaultValue={[3]}
                max={6}
                step={1}
                value={[field.value]}
                onValueChange={field.onChange}
              />
              <div className="mt-2 grid w-full grid-cols-3">
                <span className="text-left text-sm">6 months</span>
                <span className="text-center text-sm">24 months</span>
                <span className="text-right text-sm">5 years</span>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="volatility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volatility</FormLabel>
              <Slider
                defaultValue={[0]}
                max={4}
                step={1}
                value={[field.value]}
                onValueChange={field.onChange}
              />
              <div className="mt-2 grid w-full grid-cols-3">
                <span className="text-left text-sm">None</span>
                <span className="text-center text-sm">Medium</span>
                <span className="text-right text-sm">First Time?</span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatIf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What If?</FormLabel>
              <Slider
                defaultValue={[0]}
                max={4}
                step={1}
                value={[field.value]}
                onValueChange={field.onChange}
              />
              <div className="relative mt-2 h-6 w-full px-2">
                <div className="absolute left-0 -translate-x-0 transform text-sm">
                  📈
                </div>
                <div className="absolute left-[calc(25%+4px)] -translate-x-1/2 transform text-sm">
                  🐻
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 transform text-sm">
                  🦀
                </div>
                <div className="absolute left-[calc(75%-4px)] -translate-x-1/2 transform text-sm">
                  💎
                </div>
                <div className="absolute right-0 translate-x-0 transform text-sm">
                  🚀
                </div>
                {/* <span className="text-left text-sm">📈</span>
                <span className="text-center text-sm">🐻</span>
                <span className="text-center text-sm">🦀</span>
                <span className="text-center text-sm">💎</span>
                <span className="text-right text-sm">🚀</span> */}
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CalculatorForm;
