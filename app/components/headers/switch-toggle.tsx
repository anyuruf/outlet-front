import { useEffect, useState } from "react";
import { Switch } from '@/components/ui/switch'
import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

const ThemeSwitch = () => {
  const [theme, setTheme] = useTheme();
  const [checked, setChecked] = useState(theme !== Theme.LIGHT);

  useEffect(() => {
    setTheme(checked ? Theme.DARK : Theme.LIGHT);
  }, [checked, setTheme]);

  return (
    <div>
      <div className='relative inline-grid h-4 grid-cols-[1fr_1fr] items-center px-1 rounded-md text-sm font-medium'>
        <Switch
          checked={checked}
          onCheckedChange={setChecked}
          className='peer absolute inset-0 h-[inherit] data-[state=unchecked]:bg-sidebar-foreground/96 w-auto rounded-md [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-md [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-4.53 [&_span]:data-[state=checked]:rtl:-translate-x-4.53'
          aria-label='Square switch with permanent text indicators'
        />
        <span className='pointer-events-none relative flex min-w-4 items-center justify-end text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-4 peer-data-[state=unchecked]:rtl:-translate-x-4'>
          <Moon className='size-3 text-white text-shadow' strokeWidth={3} aria-hidden='true' />
        </span>
        <span className='peer-data-[state=checked]:text-background pointer-events-none relative flex min-w-4 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:-translate-x-full peer-data-[state=unchecked]:invisible peer-data-[state=checked]:rtl:translate-x-full'>
          <Sun className='size-3 text-shadow' strokeWidth={3} aria-hidden='true' />
        </span>
          </div>
    </div>
  )
}

export default ThemeSwitch;
