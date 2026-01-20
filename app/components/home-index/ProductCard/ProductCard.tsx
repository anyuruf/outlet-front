import { useEffect, useRef } from 'react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Img } from "openimg/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneForwarded } from "lucide-react";
import { additionalDescription } from "@/constants/carouselProducts";
import { BounceButton } from "@/components/shadcn-studio/BounceButton/BounceButton";

interface CardTransform {
  rotateX: number
  rotateY: number
  scale: number
}

const ProductCard = ({title, imgUrl, description}) => {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)
  const lastMousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current

    if (!card || !image) return

    let rect: DOMRect
    let centerX: number
    let centerY: number

    const updateCardTransform = (mouseX: number, mouseY: number) => {
      if (!rect) {
        rect = card.getBoundingClientRect()
        centerX = rect.left + rect.width / 2
        centerY = rect.top + rect.height / 2
      }

      const relativeX = mouseX - centerX
      const relativeY = mouseY - centerY

      const cardTransform: CardTransform = {
        rotateX: -relativeY * 0.035,
        rotateY: relativeX * 0.035,
        scale: 1.025
      }

      const imageTransform: CardTransform = {
        rotateX: -relativeY * 0.025,
        rotateY: relativeX * 0.025,
        scale: 1.05
      }

      return { cardTransform, imageTransform }
    }

    const animate = () => {
      const { cardTransform, imageTransform } = updateCardTransform(
        lastMousePosition.current.x,
        lastMousePosition.current.y
      )

      card.style.transform = `perspective(1000px) rotateX(${cardTransform.rotateX}deg) rotateY(${cardTransform.rotateY}deg) scale3d(${cardTransform.scale}, ${cardTransform.scale}, ${cardTransform.scale})`
      card.style.boxShadow = '0 10px 35px rgba(0, 0, 0, 0.2)'

      image.style.transform = `perspective(1000px) rotateX(${imageTransform.rotateX}deg) rotateY(${imageTransform.rotateY}deg) scale3d(${imageTransform.scale}, ${imageTransform.scale}, ${imageTransform.scale})`

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease'
      image.style.transition = 'transform 0.2s ease'
      animate()
    }

    const handleMouseLeave = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      card.style.boxShadow = 'none'
      card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease'

      image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      image.style.transition = 'transform 0.5s ease'
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <Card ref={cardRef} className='max-w-sm border-0'>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle className="text-md text-shadow font-extrabold">{title}</CardTitle>
        <Badge className='rounded-full text-sm text-gray-600 font-extrabold'>
          <span >UGX</span> 38,000
        </Badge>
      </CardHeader>
      <CardContent className='p-0 pb-2 md:pb-4  mask-radial-from-[55%_92%]'>
        <Img
          ref={imageRef}
          src={imgUrl}
          alt={title}
          className='block h-48 w-full aspect-video object-cover'
        />
      </CardContent>
      <CardFooter>
        <div className="w-full grid space-y-2">
          <CardDescription className="line-clamp-2 mb-6">
            {description} {additionalDescription}
          </CardDescription>
        <BounceButton className='inline-flex text-md font-extrabold text-shadow gap-2 px-2'>Detailed View <ArrowRight strokeWidth={3} className='h-4 w-4 text-md font-extrabold' /></BounceButton>
        <BounceButton variant={'outline'}  className='inline-flex text-md font-extrabold text-shadow gap-2 px-2'>Show Phone <PhoneForwarded strokeWidth={3} className='h-4 w-4' /></BounceButton>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ProductCard;
