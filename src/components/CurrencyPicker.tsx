import { Command, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Repeat } from "lucide-react";
import { CurrencyPickerProps } from "@/lib/props-types";
import { useState } from "react";

function CurrencyPicker({
    changeFrom,
    setChangeFrom,
    changeTo,
    setChangeTo,
    currencies,
}: CurrencyPickerProps) {
    const [isOpenFrom, setIsOpenFrom] = useState(false);
    const [isOpenTo, setIsOpenTo] = useState(false);

    return (
        <div className="flex justify-center items-center gap-6">
            <Popover open={isOpenFrom} onOpenChange={setIsOpenFrom}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-20">
                        {changeFrom}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command className="w-full">
                        <CommandInput placeholder="Search currency" />
                        <CommandList>
                            {currencies.map((curr) => (
                                <CommandItem
                                    key={curr.code}
                                    onSelect={() => {
                                        setChangeFrom(curr.code);
                                        setIsOpenFrom(false);
                                    }}
                                >
                                    {curr.name} ({curr.code})
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <Button
                variant="ghost"
                onClick={() => {
                    setChangeTo(changeFrom);
                    setChangeFrom(changeTo);
                }}
            >
                <Repeat className="w-4 h-4" />
            </Button>
            <Popover open={isOpenTo} onOpenChange={setIsOpenTo}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-20">
                        {changeTo}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Command className="w-full">
                        <CommandInput placeholder="Search currency" />
                        <CommandList>
                            {currencies.map((curr) => (
                                <CommandItem
                                    key={curr.code}
                                    onSelect={() => {
                                        setChangeTo(curr.code);
                                        setIsOpenTo(false);
                                    }}
                                >
                                    {curr.name} ({curr.code})
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default CurrencyPicker;
