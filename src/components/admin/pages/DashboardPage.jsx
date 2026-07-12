import {

  Users,

  Clock3,

  CheckCircle2,

  CircleX,

} from "lucide-react";

function DashboardPage({

  stats,

}) {

  return (

    <>

      <div className="mb-8">

        <h1 className="text-4xl font-black">

          Dashboard

        </h1>

        <p className="mt-2 text-gray-500">

          Selamat datang di Dashboard PMR SMAN 1 AIKMEL

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card

          icon={<Users size={32}/>}

          title="Total Pendaftar"

          value={stats.total}

          color="bg-red-600"

        />

        <Card

          icon={<Clock3 size={32}/>}

          title="Menunggu"

          value={stats.pending}

          color="bg-yellow-500"

        />

        <Card

          icon={<CheckCircle2 size={32}/>}

          title="Diterima"

          value={stats.accepted}

          color="bg-green-600"

        />

        <Card

          icon={<CircleX size={32}/>}

          title="Ditolak"

          value={stats.rejected}

          color="bg-gray-700"

        />

      </div>

    </>

  );

}

function Card({

  icon,

  title,

  value,

  color,

}){

  return(

    <div

      className={`${color} rounded-3xl p-6 text-white shadow-xl`}

    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm opacity-90">

            {title}

          </p>

          <h2 className="mt-3 text-5xl font-black">

            {value}

          </h2>

        </div>

        {icon}

      </div>

    </div>

  );

}

export default DashboardPage;