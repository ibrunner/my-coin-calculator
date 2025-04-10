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
import useFormStore from '@/lib/store';
import { FormData, periods } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const calculatorFormSchema = z.object({
  initialInvestment: z.number(),
  regularInvestment: z.number().min(1, {
    message: 'Regular investment must be greater than 0',
  }),
  period: z.enum(periods),
  durationMonthsSlider: z.number().min(6).max(60),
  priceTarget: z.number(),
  volatility: z.number().min(0).max(4),
  whatIf: z.number().min(0).max(4),
});

const CalculatorForm = () => {
  const { formData, updateFormData } = useFormStore();
  const isUpdatingFromStore = useRef(false);

  const form = useForm<z.infer<typeof calculatorFormSchema>>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: formData,
  });

  // This will run when form values change through user interaction
  useEffect(() => {
    // Setup subscription to form changes
    const subscription = form.watch((value, { type }) => {
      // Only update store when changes are from user input, not from store sync
      if (!isUpdatingFromStore.current && type === 'change') {
        updateFormData(value as FormData);
      }
    });

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  // Sync from store to form when store changes externally
  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      isUpdatingFromStore.current = true;
      form.reset(formData);
      isUpdatingFromStore.current = false;
    }
  }, [formData, form]);

  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="initialInvestment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Investment</FormLabel>
              <FormControl>
                <Input
                  placeholder="upfront investment"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseFloat(e.target.value) || 0);
                  }}
                />
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
                <Input
                  placeholder="regular investment"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseFloat(e.target.value) || 0);
                  }}
                />
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
                {/* <SelectItem value="daily">Daily</SelectItem> */}
                <SelectItem value="weekly">Weekly</SelectItem>
                {/* <SelectItem value="2xMonthly">2x Monthly</SelectItem> */}
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
                <Input
                  placeholder="price target"
                  {...field}
                  onChange={(e) => {
                    field.onChange(parseFloat(e.target.value) || 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationMonthsSlider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <Slider
                defaultValue={[3]}
                max={6}
                step={1}
                value={[field.value]}
                onValueChange={(values) => {
                  field.onChange(values[0]);
                }}
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
                <span className="text-left text-sm">Boomer Stocks 👴</span>
                <span className="text-center text-sm">This is fine. ☕ 🔥</span>
                <span className="text-right text-sm">First Time? 😏</span>
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
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default CalculatorForm;
