import { Card, CardContent } from "~/components/ui/card";
import { Caption, Title1 } from "~/components/ui/Typography";

export default function MainSection() {
  return (
    <div className='bg-dark p-lg'>
      <div className='flex flex-col items-start justify-center h-full space-y-10'>
        <div className='grid grid-cols-3 gap-md w-full'>
          <Card className='min-h-72'>
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
                <Title1>혼모노</Title1>
                <Caption>성해은</Caption>
              </div>
            </CardContent>
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
                <Title1>혼모노</Title1>
                <Caption>성해은</Caption>
              </div>
            </CardContent>
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
                <Title1>혼모노</Title1>
                <Caption>성해은</Caption>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
