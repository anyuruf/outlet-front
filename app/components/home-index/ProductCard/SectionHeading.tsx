import { GradientText } from "@/components/shadcn-io/GradientText";

interface Props {
  text: string
}
function SectionHeading ({text}: Props){
  return(
    <>
      <GradientText className="text-6xl font-extrabold px-2 text-shadow-md" text={text} />
      <span className="sr-only">Level two heading</span>
    </>
  )
}

export default SectionHeading;