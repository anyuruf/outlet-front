import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { slides } from "@/constants/carouselProducts"
import { GradientText } from '@/components/shadcn-io/GradientText';
import CarouselButtonGroup from "@/components/shadcn-io/ButtonGroup";
import { useAutoplay } from "@/utils/misc";

export default function HeroCarousel() {
  const [carouselAPI, setCarouselAPI] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const {isPlaying, setIsPlaying} = useAutoplay(carouselAPI);

  const autoplay = useRef(
    Autoplay(
      {
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        playOnInit: true,
      },
      (carouselRoot) => carouselRoot
    )
  );




  const onSelect = useCallback(() => {
    if (!carouselAPI) return;

    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollPrev = useCallback(() => {
    if (!carouselAPI) return;
    carouselAPI.scrollPrev();
  },  [carouselAPI]);

  const scrollNext = useCallback(() => {
    if (!carouselAPI) return;
    carouselAPI.scrollNext();
  },  [carouselAPI]);

  /************ renamed method to scrollToIndex from scrollTo as there is an inbuilt scrollTo method ***/
  const scrollToIndex = (index: number) => {
    if (!carouselAPI) return;
    carouselAPI.scrollTo(index);
  };

  useEffect(() => {
    if (!carouselAPI) return;
    onSelect();
    setScrollSnaps(carouselAPI.scrollSnapList());
    carouselAPI.on("select", onSelect);
  }, [carouselAPI, onSelect]);


  return (
    <section className="max-w-7xl mx-auto w-full">
      <Carousel
        setApi={setCarouselAPI}
        plugins={[autoplay.current]}
        opts={{ loop: true, align: "center" }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem
              key={slide.id}
            >
                {/********* Image Overlay *************/}
              <div
                className="relative w-full h-[480px] overflow-hidden bg-muted bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.imgUrl})`,
                }}>
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center text-chart-2 justify-center p-8 text-center">
                  <GradientText className="mb-2 font-extrabold text-shadow-md  text-8xl" text={slide.title}/>
                  <p className="mb-6 max-w-md text-sm text-white opacity-90">
                    {slide.description}
                  </p>
                  <Button variant="secondary">{slide.cta}</Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselButtonGroup className="right-14 bottom-16"  autoplay={autoplay} scrollPrev={scrollPrev} scrollNext={scrollNext} isPlaying={isPlaying} />
        <div className="flex justify-center mt-4 space-x-2">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              onClick={() => scrollToIndex(index)}
              size="icon"
              className={`w-2 h-2 rounded-full ${
                selectedIndex === index ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
