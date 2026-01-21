import { PauseIcon, PlayIcon, ChevronRight, ChevronLeft } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from "@/components/ui/button";
import { cn } from '@/utils/misc';

interface Props {
  autoplay: unknown
  scrollPrev: () => void
  scrollNext: () => void
  isPlaying: boolean
  className: string
}
const CarouselButtonGroup = (props:Props) => {
  const {  autoplay, scrollPrev, scrollNext, isPlaying, className} = props;

  return (
    <>
    {/******** Enable absolute positioning to mimic the CarouselPrev/Next components **************/}
    <div
      className={cn('absolute divide-primary-foreground/30 inline-flex w-fit divide-x rounded-md shadow-xs', className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={scrollPrev} type="button" className='rounded-none rounded-l-full focus-visible:z-10'>
            <ChevronLeft  strokeWidth={3} className="text-shadow" />
            <span className='sr-only'>Scroll left</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-xs'>Scroll Left</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={scrollNext} type="button" className='rounded-none focus-visible:z-10'>
            <ChevronRight  strokeWidth={3} className="text-shadow" />
            <span className='sr-only'>Scroll Right</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className='px-2 py-1 text-xs'>Scroll Right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={() =>
              isPlaying
                ? autoplay.current?.stop()
                : autoplay.current?.play()
            }
            className="rounded-none rounded-r-full focus-visible:z-10"
          >
            {isPlaying ? <PauseIcon className="text-shadow" strokeWidth={3} /> : <PlayIcon className="text-shadow" strokeWidth={3} />}
            <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
          </Button>
        </TooltipTrigger>

        <TooltipContent className="px-2 py-1 text-xs">
          {isPlaying ? "Pause" : "Play Slides"}
        </TooltipContent>
      </Tooltip>

    </div>
    </>
  )
}

export default CarouselButtonGroup;
