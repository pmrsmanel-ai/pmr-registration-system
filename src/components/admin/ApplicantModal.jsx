import { useState } from "react";
import QRCode from "react-qr-code";

import {
  X,
  Copy,
  Phone,
  Mail,
  MapPin,
  User,
  Save,
  Download,
  MessageCircle,
  BadgeCheck,
  ClipboardList,
  HeartPulse,
  UsersRound,
  ShieldCheck,
  IdCard,
} from "lucide-react";

import { updateApplicantStatus } from "../../services/adminApi";

function ApplicantModal({
  applicant,
  onClose,
  onRefresh,
}) {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(
    applicant.status || "Menunggu Verifikasi"
  );

  const [note, setNote] = useState(
    applicant.admin_note || ""
  );

  const [allowCard, setAllowCard] = useState(
    applicant.status === "Diterima"
  );

  const [allowWhatsapp, setAllowWhatsapp] =
    useState(
      applicant.status === "Diterima"
    );

  const [publishPortal, setPublishPortal] =
    useState(
      applicant.status === "Diterima"
    );

  async function save() {
    try {
      setLoading(true);

      await updateApplicantStatus(
        applicant.id,
        status,
        note
      );

      alert("Data berhasil diperbarui.");

      await onRefresh();

      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function copyRegistration() {
    await navigator.clipboard.writeText(
      applicant.registration_number
    );

    alert("Nomor pendaftaran berhasil disalin.");
  }

  function getStatusMeta(currentStatus) {
    switch (currentStatus) {
      case "Diterima":
        return {
          label: "DITERIMA",
          badge:
            "bg-green-100 text-green-700",
          dot: "bg-green-600",
        };

      case "Ditolak":
        return {
          label: "DITOLAK",
          badge:
            "bg-red-100 text-red-700",
          dot: "bg-red-600",
        };

      default:
        return {
          label: "MENUNGGU",
          badge:
            "bg-yellow-100 text-yellow-700",
          dot: "bg-yellow-500",
        };
    }
  }

  const statusMeta = getStatusMeta(status);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:flex lg:items-center lg:justify-center">

      <div className="
      h-screen
      w-full
      overflow-y-auto
      bg-gray-100

      lg:h-auto
      lg:max-h-[95vh]
      lg:max-w-7xl
      lg:rounded-3xl
      lg:bg-white
      lg:shadow-2xl
      ">

        {/* ================= HEADER ================= */}

        <div className="
        sticky
        top-0
        z-40
        border-b
        bg-white/95
        backdrop-blur
        ">

          <div className="
          flex
          items-start
          justify-between
          gap-5
          px-5
          py-5

          lg:px-8
          lg:py-6
          ">

            <div>

              <p className="
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]
              text-red-600
              ">
                Dashboard PMR
              </p>

              <h2 className="
              mt-2
              text-2xl
              font-black
              text-gray-900

              lg:text-3xl
              ">
                Detail Peserta
              </h2>

              <p className="
              mt-1
              text-sm
              text-gray-500
              ">
                Verifikasi data peserta dan
                pengaturan kelulusan.
              </p>

              <div className="
              mt-5
              flex
              flex-wrap
              gap-3
              ">

                <span className="
                rounded-full
                bg-red-50
                px-4
                py-2
                text-sm
                font-bold
                text-red-700
                ">
                  {applicant.registration_number}
                </span>

                <span
                  className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  ${statusMeta.badge}
                  `}
                >

                  <span
                    className={`
                    h-2.5
                    w-2.5
                    rounded-full
                    ${statusMeta.dot}
                    `}
                  />

                  {statusMeta.label}

                </span>

              </div>

            </div>

            <button
              onClick={onClose}
              className="
              rounded-2xl
              p-3
              transition
              hover:bg-gray-100
              "
            >
              <X size={28} />
            </button>

          </div>

        </div>

        {/* ================= CONTENT ================= */}

        <div className="
        grid
        gap-6
        p-5

        lg:grid-cols-[360px,1fr]
        lg:gap-10
        lg:p-8
        ">

          {/* ======================================= */}
          {/* LEFT SIDEBAR */}
          {/* ======================================= */}

          <aside className="space-y-6">
                        {/* ================= FOTO ================= */}

            <div className="overflow-hidden rounded-3xl border bg-white shadow-lg">

              <div className="relative">

                <img
                  src={
                    applicant.photo_url ||
                    `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
                  }
                  alt={applicant.full_name}
                  className="h-72 w-full object-cover lg:h-[420px]"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">

                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-800 backdrop-blur">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${statusMeta.dot}`}
                    />

                    {statusMeta.label}
                  </div>

                  <h3 className="mt-3 text-xl font-black text-white">
                    {applicant.full_name}
                  </h3>

                  <p className="text-sm text-gray-200">
                    {applicant.class}
                  </p>

                </div>

              </div>

            </div>

            {/* ================= NOMOR ================= */}

            <div className="rounded-3xl border bg-white p-6 shadow">

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-red-100 p-3 text-red-600">
                  <IdCard size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Nomor Pendaftaran
                  </p>

                  <h3 className="text-lg font-black">
                    {applicant.registration_number}
                  </h3>
                </div>

              </div>

              <button
                onClick={copyRegistration}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border py-3 font-semibold transition hover:bg-gray-50"
              >
                <Copy size={18} />

                Salin Nomor
              </button>

            </div>

            {/* ================= QR CODE ================= */}

            <div className="rounded-3xl border bg-white p-6 shadow">

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-green-100 p-3 text-green-700">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h3 className="font-black">
                    QR Verifikasi
                  </h3>

                  <p className="text-sm text-gray-500">
                    Digunakan untuk validasi peserta.
                  </p>
                </div>

              </div>

              <div className="mt-6 flex justify-center">

                <div className="rounded-3xl border bg-white p-5 shadow-sm">

                  <QRCode
                    value={applicant.registration_number}
                    size={170}
                  />

                </div>

              </div>

            </div>

            {/* ================= PREVIEW KARTU ================= */}

            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 shadow-xl">

              <div className="p-6 text-white">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-xs uppercase tracking-[0.3em] text-red-100">
                      Preview
                    </p>

                    <h3 className="mt-2 text-2xl font-black">
                      Kartu Peserta
                    </h3>

                  </div>

                  <BadgeCheck
                    size={40}
                    className="text-white/90"
                  />

                </div>

                <div className="mt-6 flex gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">

                  <img
                    src={
                      applicant.photo_url ||
                      `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
                    }
                    alt={applicant.full_name}
                    className="h-20 w-20 rounded-2xl border border-white/30 object-cover"
                  />

                  <div className="min-w-0">

                    <h4 className="truncate text-lg font-black">
                      {applicant.full_name}
                    </h4>

                    <p className="mt-1 text-sm text-red-100">
                      {applicant.registration_number}
                    </p>

                    <p className="mt-1 text-sm text-red-100">
                      {applicant.class}
                    </p>

                  </div>

                </div>

                <div className="mt-6 space-y-3">

                  <button
                    disabled={
                      !allowCard ||
                      status !== "Diterima"
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Download size={18} />

                    Download Kartu
                  </button>

                  <button
                    disabled={
                      !allowWhatsapp ||
                      status !== "Diterima"
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 py-3 font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <MessageCircle size={18} />

                    Grup WhatsApp
                  </button>

                </div>

              </div>

            </div>

          </aside>

          {/* ======================================= */}
          {/* RIGHT CONTENT */}
          {/* ======================================= */}

          <section className="space-y-8">
                        {/* ================= INFORMASI PRIBADI ================= */}

            <Section
              icon={<ClipboardList size={22} />}
              title="Informasi Pribadi"
            >
              <div className="grid gap-4 md:grid-cols-2">

                <Item
                  icon={<User size={18} />}
                  label="Nama Lengkap"
                  value={applicant.full_name}
                />

                <Item
                  icon={<User size={18} />}
                  label="Nama Panggilan"
                  value={applicant.nickname}
                />

                <Item
                  label="Jenis Kelamin"
                  value={applicant.gender}
                />

                <Item
                  label="Tempat Lahir"
                  value={applicant.birth_place}
                />

                <Item
                  label="Tanggal Lahir"
                  value={applicant.birth_date}
                />

                <Item
                  label="Agama"
                  value={applicant.religion}
                />

                <Item
                  label="Kelas"
                  value={applicant.class}
                />

              </div>
            </Section>

            {/* ================= INFORMASI KONTAK ================= */}

            <Section
              icon={<Phone size={22} />}
              title="Informasi Kontak"
            >
              <div className="grid gap-4 md:grid-cols-2">

                <Item
                  icon={<Phone size={18} />}
                  label="Nomor HP"
                  value={applicant.phone}
                />

                <Item
                  icon={<Mail size={18} />}
                  label="Email"
                  value={applicant.email}
                />

                <div className="md:col-span-2">
                  <Item
                    icon={<MapPin size={18} />}
                    label="Alamat"
                    value={applicant.address}
                  />
                </div>

              </div>
            </Section>

            {/* ================= INFORMASI KESEHATAN ================= */}

            <Section
              icon={<HeartPulse size={22} />}
              title="Informasi Kesehatan"
            >
              <div className="grid gap-4 md:grid-cols-2">

                <Item
                  label="Tinggi Badan"
                  value={
                    applicant.height
                      ? `${applicant.height} cm`
                      : "-"
                  }
                />

                <Item
                  label="Berat Badan"
                  value={
                    applicant.weight
                      ? `${applicant.weight} kg`
                      : "-"
                  }
                />

                <div className="md:col-span-2">
                  <Item
                    label="Riwayat Penyakit"
                    value={applicant.medical_history}
                  />
                </div>

              </div>
            </Section>

            {/* ================= DATA ORANG TUA ================= */}

            <Section
              icon={<UsersRound size={22} />}
              title="Data Orang Tua"
            >
              <div className="grid gap-4 md:grid-cols-2">

                <Item
                  label="Nama Ayah"
                  value={applicant.father_name}
                />

                <Item
                  label="Nama Ibu"
                  value={applicant.mother_name}
                />

                <div className="md:col-span-2">
                  <Item
                    icon={<Phone size={18} />}
                    label="Nomor HP Orang Tua"
                    value={applicant.parent_phone}
                  />
                </div>

              </div>
            </Section>

            {/* ================= STATUS KELULUSAN ================= */}

            <div className="rounded-3xl border bg-white p-6 shadow">

              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                <div>

                  <h3 className="text-2xl font-black">
                    Status Kelulusan
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Tentukan hasil akhir seleksi peserta.
                  </p>

                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${statusMeta.badge}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${statusMeta.dot}`}
                  />

                  {statusMeta.label}

                </span>

              </div>

              <div className="grid gap-4 lg:grid-cols-3">

                <StatusOption
                  checked={status === "Menunggu Verifikasi"}
                  onChange={() => {
                    setStatus("Menunggu Verifikasi");
                    setAllowCard(false);
                    setAllowWhatsapp(false);
                    setPublishPortal(false);
                  }}
                  title="Menunggu"
                  desc="Masih proses verifikasi."
                  tone="yellow"
                />

                <StatusOption
                  checked={status === "Diterima"}
                  onChange={() => {
                    setStatus("Diterima");
                    setAllowCard(true);
                    setAllowWhatsapp(true);
                    setPublishPortal(true);
                  }}
                  title="Diterima"
                  desc="Peserta dinyatakan lolos."
                  tone="green"
                />

                <StatusOption
                  checked={status === "Ditolak"}
                  onChange={() => {
                    setStatus("Ditolak");
                    setAllowCard(false);
                    setAllowWhatsapp(false);
                    setPublishPortal(false);
                  }}
                  title="Ditolak"
                  desc="Peserta tidak lolos."
                  tone="red"
                />

              </div>

            </div>
                        {/* ================= CATATAN ADMIN ================= */}

            <Section
              icon={<ClipboardList size={22} />}
              title="Catatan Admin"
            >
              <textarea
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tulis catatan untuk peserta..."
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-100"
              />
            </Section>

            {/* ================= PORTAL KELULUSAN ================= */}

            <Section
              icon={<ShieldCheck size={22} />}
              title="Portal Kelulusan"
            >
              <div className="grid gap-4 lg:grid-cols-3">

                <ToggleBox
                  checked={allowCard}
                  onChange={setAllowCard}
                  title="Download Kartu"
                  desc="Izinkan peserta mengunduh kartu."
                />

                <ToggleBox
                  checked={allowWhatsapp}
                  onChange={setAllowWhatsapp}
                  title="Grup WhatsApp"
                  desc="Tampilkan tombol grup WhatsApp."
                />

                <ToggleBox
                  checked={publishPortal}
                  onChange={setPublishPortal}
                  title="Publish Portal"
                  desc="Tampilkan hasil di portal."
                />

              </div>
            </Section>

          </section>

        </div>

        {/* ================= ACTION BAR ================= */}

        <div className="sticky bottom-0 border-t bg-white/95 backdrop-blur">

          <div className="flex flex-col gap-3 p-5 lg:flex-row lg:justify-end lg:px-8">

            <button
              onClick={onClose}
              className="rounded-2xl border px-8 py-4 font-semibold transition hover:bg-gray-100"
            >
              Tutup
            </button>

            <button
              disabled={loading}
              onClick={save}
              className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={20} />

              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-red-100 p-2 text-red-700">
          {icon}
        </div>

        <h3 className="text-xl font-black text-gray-900">
          {title}
        </h3>
      </div>

      {children}
    </section>
  );
}

function Item({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition-all duration-200 hover:border-red-200 hover:bg-red-50">

      <div className="flex items-center gap-2">

        {icon && (
          <span className="text-red-600">
            {icon}
          </span>
        )}

        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </p>

      </div>

      <p className="mt-2 break-words text-base font-semibold text-gray-900">
        {value || "-"}
      </p>

    </div>
  );
}

function StatusOption({
  checked,
  onChange,
  title,
  desc,
  tone = "yellow",
}) {
  const tones = {
    yellow: {
      active: "border-yellow-300 bg-yellow-50",
      radio: "accent-yellow-500",
    },
    green: {
      active: "border-green-300 bg-green-50",
      radio: "accent-green-600",
    },
    red: {
      active: "border-red-300 bg-red-50",
      radio: "accent-red-600",
    },
  };

  return (
    <label
      className={`cursor-pointer rounded-2xl border p-5 transition hover:shadow-sm ${
        checked ? tones[tone].active : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">

        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className={`mt-1 ${tones[tone].radio}`}
        />

        <div>

          <p className="font-bold">
            {title}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {desc}
          </p>

        </div>

      </div>
    </label>
  );
}

function ToggleBox({
  checked,
  onChange,
  title,
  desc,
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-2xl border p-5 text-left transition hover:shadow ${
        checked
          ? "border-red-300 bg-red-50"
          : "border-gray-200 bg-white"
      }`}
    >

      <div className="flex items-start justify-between gap-4">

        <div>

          <p className="font-bold">
            {title}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {desc}
          </p>

        </div>

        <span
          className={`inline-flex h-6 w-11 items-center rounded-full p-1 transition ${
            checked
              ? "bg-green-600"
              : "bg-gray-300"
          }`}
        >
          <span
            className={`h-4 w-4 rounded-full bg-white transition ${
              checked
                ? "translate-x-5"
                : "translate-x-0"
            }`}
          />
        </span>

      </div>

    </button>
  );
}

export default ApplicantModal;