import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandList } from "cmdk";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


function ExpandableSearch () {
  return(
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className="font-semibold text-md p-0 h-7 w-8 inline-flex items-center justify-betweeen"
        >
          <Search size={2} strokeWidth={2} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-w-lgv">
        <Command>
          <CommandInput placeholder="Search products..." asChild>
            <Input className="mb-4"/>
          </CommandInput>
          <CommandList className="w-full mx-auto" >
            <CommandEmpty>Zero results.</CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ExpandableSearch;