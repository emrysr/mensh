"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
  >(({ className, ...props }, ref) => {
    var isDisabled = props.disabled;
    var rangeClassname = 'absolute h-full ' + (isDisabled ? 'bg-gray-300 dark:bg-gray-50' : 'bg-gray-900 dark:bg-gray-50');
    var thumbClassname = 'dark:focus-visible:ring-gray-300 dark:ring-offset-gray-950 focus-visible:ring-offset-2 focus-visible:ring-gray-950 focus-visible:ring-2 ring-offset-white' +
      ' block h-5 w-5 rounded-full bg-white transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:border-gray-50 ' + 
      (isDisabled ? ' border-2 border-gray-400' : ' border-2 border-gray-900');

    return <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <SliderPrimitive.Range className={rangeClassname} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={thumbClassname} />
    </SliderPrimitive.Root>
  })
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
