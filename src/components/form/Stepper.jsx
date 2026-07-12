import {
  User,
  HeartPulse,
  Users,
  Camera,
  CircleCheckBig,
} from "lucide-react";

const steps = [
  {
    title: "Data Diri",
    icon: User,
  },
  {
    title: "Kesehatan",
    icon: HeartPulse,
  },
  {
    title: "Orang Tua",
    icon: Users,
  },
  {
    title: "Foto",
    icon: Camera,
  },
  {
    title: "Konfirmasi",
    icon: CircleCheckBig,
  },
];

function Stepper({ currentStep }) {
  return (
    <div className="mb-10">

      <div className="flex items-center justify-between">

        {steps.map((step, index) => {

          const Icon = step.icon;

          const active = currentStep === index + 1;
          const complete = currentStep > index + 1;

          return (

            <div
              key={step.title}
              className="flex flex-1 items-center"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`
                  flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition

                  ${
                    complete
                      ? "border-green-500 bg-green-500 text-white"
                      : active
                      ? "border-red-700 bg-red-700 text-white"
                      : "border-gray-300 bg-white text-gray-400"
                  }
                  `}
                >
                  <Icon size={22} />
                </div>

                <span
                  className={`mt-3 text-xs font-semibold ${
                    active
                      ? "text-red-700"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>

              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`mx-3 h-1 flex-1 rounded-full ${
                    complete
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}

            </div>

          );
        })}
      </div>

    </div>
  );
}

export default Stepper;