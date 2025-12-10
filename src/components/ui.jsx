/**
 * =============================================================================
 * ATLAS - Composants UI
 * =============================================================================
 * Ce fichier contient tous les composants d'interface utilisateur de l'application.
 * Basé sur shadcn/ui avec personnalisation pour Atlas.
 */

"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { Check, ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib";

// =============================================================================
// BOUTON
// =============================================================================

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-lg",
        outline: "border border-border/60 bg-white text-foreground hover:bg-gray-50 shadow-sm",
        ghost: "text-foreground hover:bg-muted",
        secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md",
        destructive: "bg-rose-500 text-white hover:bg-rose-600 shadow-md",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

// =============================================================================
// INPUT
// =============================================================================

export const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-xl border border-border/60 bg-white px-4 text-base shadow-sm transition-all placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

// =============================================================================
// LABEL
// =============================================================================

export const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
Label.displayName = "Label";

// =============================================================================
// CARD
// =============================================================================

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border border-border/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300", className)}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mb-4 flex flex-col gap-2", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-6 flex items-center gap-2", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

// =============================================================================
// BADGE
// =============================================================================

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-emerald-100 text-emerald-800",
        secondary: "bg-gray-100 text-gray-800",
        outline: "border border-current text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = "Badge";

// =============================================================================
// SKELETON
// =============================================================================

export const Skeleton = ({ className, ...props }) => (
  <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
);

// =============================================================================
// POPOVER
// =============================================================================

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 8, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn("z-50 w-auto rounded-xl border border-border bg-white p-4 text-foreground shadow-lg outline-none animate-in fade-in-0 zoom-in-95", className)}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = "PopoverContent";

// =============================================================================
// SELECT
// =============================================================================

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-border/60 bg-white px-4 text-base shadow-sm transition-all hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[200px] overflow-hidden rounded-xl border border-border bg-white p-1 text-foreground shadow-lg animate-in fade-in-0 zoom-in-95",
        position === "popper" && "data-[side=bottom]:translate-y-2",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-none transition-colors hover:bg-emerald-50 focus:bg-emerald-50 data-[state=checked]:bg-emerald-100",
      className
    )}
    {...props}
  >
    <span className="flex w-full items-center justify-between gap-2">
      {children}
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-emerald-600" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

// =============================================================================
// CALENDRIER
// =============================================================================

export function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-6",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center mb-4",
        caption_label: "text-sm font-semibold text-foreground",
        nav: "flex items-center justify-between absolute inset-x-0",
        button_previous: "h-8 w-8 bg-white border border-border/60 rounded-lg p-0 flex items-center justify-center hover:bg-gray-50 transition-colors absolute left-1 shadow-sm",
        button_next: "h-8 w-8 bg-white border border-border/60 rounded-lg p-0 flex items-center justify-center hover:bg-gray-50 transition-colors absolute right-1 shadow-sm",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-10 font-medium text-xs uppercase tracking-wide",
        week: "flex w-full mt-1",
        day: "h-10 w-10 text-center text-sm p-0 relative",
        day_button: "h-10 w-10 p-0 font-normal rounded-lg transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700 aria-selected:opacity-100",
        selected: "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white rounded-lg font-medium",
        today: "bg-emerald-50 text-emerald-700 font-semibold rounded-lg",
        outside: "text-muted-foreground/40 aria-selected:bg-emerald-100/50",
        disabled: "text-muted-foreground/30 cursor-not-allowed",
        range_middle: "aria-selected:bg-emerald-100 aria-selected:text-emerald-800 rounded-none",
        range_start: "rounded-l-lg",
        range_end: "rounded-r-lg",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft className="h-4 w-4 text-gray-600" /> : <ChevronRight className="h-4 w-4 text-gray-600" />,
      }}
      {...props}
    />
  );
}

// =============================================================================
// DATE RANGE PICKER
// =============================================================================

export function DateRangePicker({ value, onChange, disabled, className }) {
  const displayValue = value?.from && value?.to
    ? `${format(value.from, "d MMM", { locale: fr })} - ${format(value.to, "d MMM", { locale: fr })}`
    : "Sélectionner dates";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-11 w-full items-center gap-3 rounded-xl border border-border/60 bg-white px-4 text-left text-base shadow-sm transition-all hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
            !value && "text-muted-foreground/60",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="flex-1">{displayValue}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          locale={fr}
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
          disabled={{ before: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}

// =============================================================================
// TOAST (Notification)
// =============================================================================

const ToastContext = React.createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback(({ title, description }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-in slide-in-from-right rounded-xl border border-border bg-white p-4 shadow-lg"
          >
            {t.title && <p className="font-medium">{t.title}</p>}
            {t.description && <p className="text-sm text-muted-foreground">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    return { toast: ({ title }) => console.log(title) };
  }
  return { toast: context };
}

export const toast = ({ title, description }) => {
  console.log(title, description);
};
