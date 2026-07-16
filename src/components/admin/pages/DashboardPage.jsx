import {
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function DashboardPage({

  stats,

}) {

  return (

    <>

      <div className="mb-8">

        <h1 className="text-4xl font-black">

          Dashboard Admin

        </h1>

        <p className="mt-2 text-gray-500">

          Portal PMR SMAN 1 AIKMEL

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard

          title="Total Pendaftar"

          value={stats.total}

          color="bg-red-600"

          icon={<Users size={34}/>}

        />

        <DashboardCard

          title="Menunggu"

          value={stats.pending}

          color="bg-yellow-500"

          icon={<Clock3 size={34}/>}

        />

        <DashboardCard

          title="Diterima"

          value={stats.accepted}

          color="bg-green-600"

          icon={<CheckCircle2 size={34}/>}

        />

        <DashboardCard

          title="Ditolak"

          value={stats.rejected}

          color="bg-gray-700"

          icon={<XCircle size={34}/>}

        />

      </div>

    </>

  );

}

function DashboardCard({

  title,

  value,

  color,

  icon,

}) {

  return (

    <div

      className={`${color} rounded-3xl p-7 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}

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

        <div className="rounded-2xl bg-white/20 p-4">

          {icon}

        </div>

      </div>

    </div>

  );

}

export default DashboardPage;