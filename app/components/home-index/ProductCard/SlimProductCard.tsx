import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Img } from "openimg/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, PhoneForwarded } from "lucide-react";
import { BounceButton } from "@/components/shadcn-studio/BounceButton/BounceButton";

const SlimProductCard = ({title, imgUrl, description}) => {

  return (
    <Card className='max-w-sm border-0 grid grid-cols-subgrid'>
      <CardHeader className='flex space-y-2 px-3'>
        <CardTitle className="text-xs font-extrabold line-clamp-1 text-shadow">{title}</CardTitle>
        <Badge className='rounded-full text-xs text-gray-600 font-extrabold'>
          <span >UGX</span> 38,000
        </Badge>
      </CardHeader>
      <CardContent className='p-0 mask-radial-from-[55%_92%]'>
        <Img
          src={imgUrl}
          alt={title}
          className='block h-35 w-full aspect-video object-cover'
        />
      </CardContent>
      <CardFooter className="px-3">
        <div className="grid px-0 gap-2 text-wrap line-clamp-1 ">
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
          <BounceButton className='inline-flex text-md font-extrabold text-shadow gap-2 px-2'>Details<ArrowRight
            strokeWidth={3} className='h-2 w-2 font-bold' /></BounceButton>
          <BounceButton variant={'outline'} className='inline-flex text-md font-extrabold text-shadow  gap-2 px-2'>Show<PhoneForwarded strokeWidth={3} className='h-2 w-2' /></BounceButton>
        </div>
      </CardFooter>
    </Card>
  )
}

export default SlimProductCard;