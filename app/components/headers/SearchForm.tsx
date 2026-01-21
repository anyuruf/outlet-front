import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_GROUPS } from "@/constants/categories";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/misc";

function SearchForm() {
  return (
    <>
      {/* flex classes are for the parent container */}
      <form className="gap-4 justify-center flex-grow hidden md:flex">
        <div className="relative w-full max-w-xl">
          {/* Left Button/Popover. top-0 for (top-1/2 -translate-y-1/2) */}
          <CategoryPopover classNames="absolute left-0 top-0" />
          {/* Input */}
          <Input
            type="search"
            placeholder="Search for products..."
            className="w-full px-29 border-2  font-semibold text-md border-y-primary focus-visible:ring-[4px]"
          />

          {/* Right button */}
          <Button
            type="submit"
            className="absolute right-0 top-0 z-10 font-semibold text-md py-2 px-4 inline-flex items-center gap-1 rounded-l-none"
          >
            <Search strokeWidth={3} className="w-4 h-4" />
            <span>Search</span>
          </Button>
        </div>
      </form>
    </>
  );
}

function CategoryPopover({ classNames }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* classNames used for positioning the poper */}
        <Button
          type="button"
          className={cn(
            "py-2 px-4 font-semibold text-md inline-flex items-center gap-1 rounded-r-none",
            classNames,
          )}
        >
          <span>Category</span>
          <ChevronDown strokeWidth={3} className="w-4 h-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="middle"
        className="w-3xl px-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(128px,1fr))]"
      >
        {CATEGORY_GROUPS.map((group) => (
          <div key={group.title}>
            <h4 className="font-semibold text-sm mb-2">{group.title}</h4>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default SearchForm;
