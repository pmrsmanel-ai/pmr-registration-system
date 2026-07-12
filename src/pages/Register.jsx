import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { registerApplicant } from "../services/registerAPI";

import Layout from "../components/layout/Layout";
import FormLayout from "../components/form/FormLayout";
import ProgressBar from "../components/form/ProgressBar";
import Stepper from "../components/form/Stepper";
import RegisterIntro from "../components/form/RegisterIntro";

import StepOne from "../components/form/steps/StepOne";
import StepTwo from "../components/form/steps/StepTwo";
import StepThree from "../components/form/steps/StepThree";
import StepFour from "../components/form/steps/StepFour";
import StepFive from "../components/form/steps/StepFive";

function Register() {

  const navigate = useNavigate();

  const methods = useForm({
    mode: "onTouched",
    defaultValues: {},
  });

  const {
    trigger,
    handleSubmit,
  } = methods;

  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const fields = {

    1: [
      "namaLengkap",
      "namaPanggilan",
      "jenisKelamin",
      "tempatLahir",
      "tanggalLahir",
      "agama",
      "noHp",
      "email",
      "alamat",
      "kelas",
    ],

    2: [
      "tinggiBadan",
      "beratBadan",
      "riwayatPenyakit",
    ],

    3: [
      "namaAyah",
      "namaIbu",
      "noHpOrtu",
    ],

    4: [
      "foto",
    ],

  };

  async function nextStep() {

    if (currentStep <= 4) {

      const valid = await trigger(
        fields[currentStep]
      );

      if (!valid) return;

    }

    setCurrentStep((prev) => prev + 1);

  }

  function prevStep() {

    if (currentStep > 1) {

      setCurrentStep((prev) => prev - 1);

    }

  }

  async function onSubmit(formData) {

    try {

      setLoading(true);

      const result =
        await registerApplicant(formData);

      navigate("/success", {

        state: {

          registrationNumber:
            result.registrationNumber,

          fullName:
            result.fullName,

          class:
            result.class,

          status:
            result.status,

          createdAt:
            result.createdAt,

          photoUrl:
            result.photoUrl,

          qrCode:
            result.qrCode,

        },

      });

    } catch (err) {

      console.error(err);

      alert(
        err.message ||
        "Terjadi kesalahan saat menyimpan data."
      );

    } finally {

      setLoading(false);

    }

  }

  return (
        <Layout>

      <FormLayout>

        {

          !started ?

          (

            <RegisterIntro

              onStart={() =>
                setStarted(true)
              }

            />

          )

          :

          (

            <>

              <h1 className="mb-2 text-4xl font-bold">
                Formulir Pendaftaran
              </h1>

              <p className="mb-8 text-gray-500">
                Lengkapi seluruh data dengan benar sebelum
                mengirim formulir.
              </p>

              <ProgressBar
                currentStep={currentStep}
              />

              <Stepper
                currentStep={currentStep}
              />

              <FormProvider {...methods}>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                >

                  {

                    currentStep === 1 && (

                      <StepOne />

                    )

                  }

                  {

                    currentStep === 2 && (

                      <StepTwo />

                    )

                  }

                  {

                    currentStep === 3 && (

                      <StepThree />

                    )

                  }

                  {

                    currentStep === 4 && (

                      <StepFour />

                    )

                  }

                  {

                    currentStep === 5 && (

                      <StepFive />
                      

                    )

                  }
                                    <div className="mt-10 flex items-center justify-between border-t pt-8">

                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`rounded-xl px-6 py-3 font-semibold transition ${
                        currentStep === 1
                          ? "cursor-not-allowed border bg-gray-100 text-gray-400"
                          : "border hover:bg-gray-100"
                      }`}
                    >
                      Sebelumnya
                    </button>

                    {currentStep < 5 ? (

                      <button
                        type="button"
                        onClick={nextStep}
                        className="rounded-xl bg-red-700 px-8 py-3 font-semibold text-white transition hover:bg-red-800"
                      >
                        Selanjutnya
                      </button>

                    ) : (

                      <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-red-700 px-8 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {loading
                          ? "Mengirim..."
                          : "Kirim Pendaftaran"}
                      </button>

                    )}

                  </div>

                </form>

              </FormProvider>

            </>

          )}

      </FormLayout>

    </Layout>
      );

}

export default Register;
