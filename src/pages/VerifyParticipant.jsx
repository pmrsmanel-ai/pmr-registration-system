import { useParams } from "react-router-dom";

function VerifyParticipant() {

    const { registration_number } = useParams();

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-100">

            <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-xl">

                <h1 className="text-4xl font-black text-red-700">

                    Verifikasi Peserta

                </h1>

                <p className="mt-6 text-xl">

                    Nomor Pendaftaran

                </p>

                <p className="text-3xl font-bold">

                    {registration_number}

                </p>

            </div>

        </div>

    );

}

export default VerifyParticipant;