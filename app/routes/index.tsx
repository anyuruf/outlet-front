import HeroCarousel from "@/components/headers/HeroCarousel.tsx";
import HorizontalScrollSection from "@/components/home-index/HorizontalScrollSection.tsx";
import PopularGridSection from "@/components/headers/PopularGridSection.tsx";



export async function loader() {
    return null
}

export default function AppIndexRoute() {
    return (
        <section className="grid grid-cols gap-10 row-start-2 col-start-1">
            <HeroCarousel/>
            <HorizontalScrollSection/>
            <PopularGridSection/>
        </section>
    )
}