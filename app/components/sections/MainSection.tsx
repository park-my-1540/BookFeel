import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "~/components/ui/carousel";
import { Caption } from "~/components/ui/Typography";

export default function MainSection() {
  return (
    <div className="bg-dark px-lg py-sm">
      <Carousel className="mx-auto max-w-screen-2xl pb-9">
        <CarouselContent>
          <CarouselItem className="basis-full md:basis-1/2 xl:basis-1/3">
            <Card className="h-full rounded-2xl border-0">
              <div className="flex h-full min-h-44 sm:min-h-52 items-center justify-between gap-3 px-sm">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-MontBold leading-snug sm:text-2xl xl:text-3xl">
                    STONER
                  </p>
                  <p className="my-3 text-sm text-textSubtitle sm:text-base">
                    John Williams
                  </p>
                </div>
                <div className="w-[36%] max-w-32 shrink-0 shadow-sm">
                  <img
                    src="https://image.aladin.co.kr/product/36582/41/cover500/8925573555_2.jpg"
                    alt="스토너"
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-full md:basis-1/2 xl:basis-1/3">
            <Card className="h-full rounded-2xl border-0">
              <div className="flex h-full min-h-44 sm:min-h-52 items-center justify-between gap-3 px-sm">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-MontBold leading-snug sm:text-2xl xl:text-3xl">
                    1984
                  </p>
                  <p className="my-3 text-sm text-textSubtitle sm:text-base">
                    George Orwell
                  </p>
                </div>
                <div className="w-[36%] max-w-32 shrink-0 shadow-sm">
                  <img
                    src="https://image.aladin.co.kr/product/47/23/cover500/04515249ff_1.jpg"
                    alt="1984"
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          </CarouselItem>
          <CarouselItem className="basis-full md:basis-1/2 xl:basis-1/3">
            <Card className="h-full rounded-2xl border-0">
              <CardContent className="px-sm">
                <div className="flex flex-row">
                  <div className="w-full relative pb-[56.25%]">
                    <iframe
                      src="https://www.youtube.com/embed/IPQ6nAefyMM?si=8qV2hJqgqj4hetTt"
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
                <div className="pt-5">
                  <p className="text-xl font-MontBold leading-snug sm:text-2xl xl:text-3xl">
                    Project Hail Mary
                  </p>
                  <Caption>Andy Weir</Caption>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselDots />
      </Carousel>
    </div>
  );
}
