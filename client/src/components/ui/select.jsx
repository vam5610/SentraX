import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Root {...props}>
    {children}
  </SelectPrimitive.Root>
))

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      "flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 text-zinc-400" />
  </SelectPrimitive.Trigger>
))

const SelectValue = SelectPrimitive.Value
const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-[0_10px_40px_rgba(0,0,0,0.75)]",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:bg-sky-500/25 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className="absolute right-2">
      <Check className="h-4 w-4 text-sky-400" />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
))

const SelectLabel = SelectPrimitive.Label
const SelectSeparator = SelectPrimitive.Separator
const SelectGroup = SelectPrimitive.Group

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
}
