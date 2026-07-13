import {
  HeartHandshake,
  ShieldPlus,
  Award,
} from "lucide-react";

function HeroImage({

  settings,

}) {

  return (

    <div className="relative flex justify-center lg:justify-end">

      {/* Background Circle */}

      <div className="absolute top-8 h-[520px] w-[520px] rounded-full bg-red-100" />

      <div className="absolute top-20 h-[430px] w-[430px] rounded-full bg-red-200/60" />

      {/* Floating Card */}

      <div className="absolute left-0 top-16 z-20 hidden rounded-3xl bg-white p-5 shadow-2xl lg:block">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

          <HeartHandshake

            className="text-red-700"

            size={28}

          />

        </div>

      </div>

      <div className="absolute bottom-10 right-0 z-20 hidden rounded-3xl bg-white p-5 shadow-2xl lg:block">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">

          <Award

            className="text-green-600"

            size={28}

          />

        </div>

      </div>

      <div className="absolute right-20 top-0 z-20 hidden rounded-3xl bg-white p-5 shadow-2xl lg:block">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">

          <ShieldPlus

            className="text-red-700"

            size={28}

          />

        </div>

      </div>

      {/* Hero Image */}

      <img

        src={`${import.meta.env.BASE_URL}images/hero.png`}


        alt="PMR SMAN 1 AIKMEL"

        className="relative z-10 w-full max-w-[560px] object-contain drop-shadow-2xl"

      />

    </div>

  );

}

export default HeroImage;