import { Card, CardContent } from "~/components/ui/card";
import { Caption } from "~/components/ui/Typography";
import { Button } from "../ui/button";

export default function MainSection() {
  return (
    <div className='bg-dark p-lg'>
      <div className='flex flex-col items-start justify-center h-full space-y-10'>
        <div className='grid grid-cols-3 gap-md w-full'>
          <Card>
            <div className='flex h-full items-center justify-between px-md'>
              <div className='w-[calc(100% - 500px)]'>
                <p className='text-4xl font-dmserif leading-snug'>STONER</p>
                <p className='my-5 text-textSubtitle text-lg'>John Williams</p>
                <Button
                  className='border-main border text-main rounded-none'
                  variant={"outline"}
                  size={"lg"}
                >
                  Detail More
                </Button>
              </div>
              <div className='w-[200px] shadow border'>
                <img
                  src='https://image.aladin.co.kr/product/36582/41/cover500/8925573555_2.jpg'
                  alt='성해나'
                  className='w-full'
                />
              </div>
            </div>
          </Card>
          <Card>
            <div className='flex h-full items-center justify-between px-md'>
              <div className='w-[calc(100% - 500px)]'>
                <p className='text-4xl font-dmserif leading-snug'>1984</p>
                <p className='my-5 text-textSubtitle text-lg'>George Orwell</p>
                <Button
                  className='border-main border text-main rounded-none'
                  variant={"outline"}
                  size={"lg"}
                >
                  Detail More
                </Button>
              </div>
              <div className='w-[200px] shadow border'>
                <img
                  src='https://image.aladin.co.kr/product/47/23/cover500/04515249ff_1.jpg'
                  alt='성해나'
                  className='w-full'
                />
              </div>
            </div>
          </Card>
          <Card>
            <CardContent>
              <div className='flex flex-row'>
                <div className='w-full relative pb-[56.25%]'>
                  <iframe
                    src='https://www.youtube.com/embed/TSGkOliZNQ8?si=s2vf7a3RshEu-4R0'
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    referrerPolicy='strict-origin-when-cross-origin'
                    allowFullScreen
                    className='absolute top-0 left-0 w-full h-full'
                  ></iframe>
                </div>
              </div>
              <div className='pt-5'>
                <p className='text-4xl font-dmserif leading-snug'>
                  Project Hail Mary
                </p>
                <Caption>성해은</Caption>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
