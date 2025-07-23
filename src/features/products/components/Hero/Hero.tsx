import Button from "../../../../components/Button";
import heroImage from "../../../../assets/images/Hero image.jpg";

function Hero() {
  return (
    <div className="px-3 bg-white md:px-4 xl:flex xl:flex-row xl:gap-8 xl:pt-[96px] xl:justify-center">
      <div className="flex flex-col gap-[16px] xl:w-[488px]">
        <h1 className="font-semibold text-4xl md:text-5xl xl:text-6xl text-neutral-900 pt-12 md:pt-16 xl:pt-[101px]">
          Summer styles are finally here
        </h1>
        <h3 className="text-lg xl:text-xl text-neutral-600">
          This year, our new summer collection will be your haven from the
          world's harsh elements.
        </h3>
        <Button onClick={() => {}} type="shopNow">
          Shop now
        </Button>
      </div>
      <div className="rounded-lg overflow-hidden xl:w-[696px]">
        <img
          className="object-cover py-12 md:pt-8 md:w-full xl:pb-[96px] xl:pt-0"
          src={heroImage}
        />
      </div>
    </div>
  );
}

export default Hero;
