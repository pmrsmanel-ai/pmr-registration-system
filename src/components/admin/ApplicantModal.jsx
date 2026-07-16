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
} from "lucide-react";

import { updateApplicantStatus } from "../../services/adminApi";

function ApplicantModal({ applicant, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState(
    applicant.status || "Menunggu Verifikasi"
  );

  const [note, setNote] = useState(applicant.admin_note || "");

  const [allowCard, setAllowCard] = useState(
    applicant.status === "Diterima"
  );

  const [allowWhatsapp, setAllowWhatsapp] = useState(
    applicant.status === "Diterima"
  );

  const [publishPortal, setPublishPortal] = useState(
    applicant.status === "Diterima"
  );

  async function save() {
    try {
      setLoading(true);

      await updateApplicantStatus(applicant.id, status, note);

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
    await navigator.clipboard.writeText(applicant.registration_number);
    alert("Nomor pendaftaran berhasil disalin.");
  }

  function getStatusMeta(currentStatus) {
    switch (currentStatus) {
      case "Diterima":
        return {
          label: "Diterima",
          badge: "bg-green-100 text-green-700",
          dot: "bg-green-600",
          ring: "ring-green-200",
        };
      case "Ditolak":
        return {
          label: "Ditolak",
          badge: "bg-red-100 text-red-700",
          dot: "bg-red-600",
          ring: "ring-red-200",
        };
      default:
        return {
          label: "Menunggu Verifikasi",
          badge: "bg-yellow-100 text-yellow-700",
          dot: "bg-yellow-500",
          ring: "ring-yellow-200",
        };
    }
  }

  const statusMeta = getStatusMeta(status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="max-h-[95vh] w-full max-w-7xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b bg-white px-8 py-6">
          <div>
            <h2 className="text-3xl font-black">
              Detail & Kelulusan Peserta
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
                {applicant.registration_number}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${statusMeta.badge}`}
              >
                {statusMeta.label}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X size={28} />
          </button>
        </div>

        {/* BODY */}
        <div className="grid gap-10 p-8 lg:grid-cols-[360px,1fr]">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border bg-white shadow">
              <img
                src={
                  applicant.photo_url ||
                  `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
                }
                alt={applicant.full_name}
                className="h-[420px] w-full object-cover"
              />
            </div>

            <div className="rounded-3xl border bg-red-50 p-6">
              <h3 className="text-lg font-bold text-red-700">
                Nomor Pendaftaran
              </h3>

              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="break-all text-xl font-black">
                  {applicant.registration_number}
                </p>

                <button
                  onClick={copyRegistration}
                  className="rounded-xl bg-white p-3 shadow transition hover:bg-gray-100"
                  title="Salin Nomor"
                >
                  <Copy size={18} />
                </button>
              </div>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold">QR Code</h3>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  Verifikasi
                </span>
              </div>

              <div className="flex justify-center">
                <div className="rounded-2xl border bg-white p-4">
                  <QRCode value={applicant.registration_number} size={180} />
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border bg-gradient-to-br from-red-700 to-red-500 p-6 text-white shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-100">
                    Preview Kartu
                  </p>

                  <h3 className="mt-2 text-2xl font-black">
                    PMR SMAN 1 AIKMEL
                  </h3>
                </div>

                <BadgeCheck size={38} className="text-white/90" />
              </div>

              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <img
                  src={
                    applicant.photo_url ||
                    `${import.meta.env.BASE_URL}images/avatar-placeholder.png`
                  }
                  alt={applicant.full_name}
                  className="h-20 w-20 rounded-2xl border border-white/30 object-cover"
                />

                <div className="min-w-0">
                  <h4 className="truncate text-xl font-black">
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

              <div className="mt-5 grid gap-3">
                <button
                  disabled={!allowCard || status !== "Diterima"}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Download kartu peserta"
                >
                  <Download size={18} />
                  Download Kartu Peserta
                </button>

                <button
                  disabled={!allowWhatsapp || status !== "Diterima"}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Gabung grup WhatsApp"
                >
                  <MessageCircle size={18} />
                  Gabung Grup WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-black">
                Biodata Peserta
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
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

                <Item label="Jenis Kelamin" value={applicant.gender} />

                <Item label="Tempat Lahir" value={applicant.birth_place} />

                <Item label="Tanggal Lahir" value={applicant.birth_date} />

                <Item label="Agama" value={applicant.religion} />

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

                <Item
                  icon={<MapPin size={18} />}
                  label="Alamat"
                  value={applicant.address}
                />

                <Item label="Kelas" value={applicant.class} />

                <Item
                  label="Tinggi Badan"
                  value={`${applicant.height || "-"} cm`}
                />

                <Item
                  label="Berat Badan"
                  value={`${applicant.weight || "-"} kg`}
                />

                <Item
                  label="Riwayat Penyakit"
                  value={applicant.medical_history}
                />

                <Item label="Nama Ayah" value={applicant.father_name} />

                <Item label="Nama Ibu" value={applicant.mother_name} />

                <Item
                  label="No HP Orang Tua"
                  value={applicant.parent_phone}
                />
              </div>
            </div>

            <div className="rounded-3xl border bg-gray-50 p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">
                    Status Kelulusan
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tentukan hasil seleksi peserta.
                  </p>
                </div>

                <span
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${statusMeta.badge}`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${statusMeta.dot}`} />
                  {statusMeta.label}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <StatusOption
                  checked={status === "Menunggu Verifikasi"}
                  onChange={() => {
                    setStatus("Menunggu Verifikasi");
                    setAllowCard(false);
                    setAllowWhatsapp(false);
                    setPublishPortal(false);
                  }}
                  title="Menunggu"
                  desc="Masih diverifikasi"
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
                  desc="Peserta dinyatakan lolos"
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
                  desc="Peserta tidak lolos"
                  tone="red"
                />
              </div>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow">
              <label className="mb-3 block text-lg font-bold">
                Catatan Admin
              </label>

              <textarea
                rows={5}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Tulis catatan untuk peserta..."
                className="w-full rounded-2xl border border-gray-300 p-4 outline-none transition focus:border-red-600"
              />
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow">
              <div className="mb-5">
                <h3 className="text-xl font-black">
                  Portal Kelulusan
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Pengaturan publikasi untuk peserta yang lolos.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <ToggleBox
                  checked={allowCard}
                  onChange={setAllowCard}
                  title="Download Kartu"
                  desc="Tombol kartu peserta"
                />

                <ToggleBox
                  checked={allowWhatsapp}
                  onChange={setAllowWhatsapp}
                  title="Grup WhatsApp"
                  desc="Tombol grup WA"
                />

                <ToggleBox
                  checked={publishPortal}
                  onChange={setPublishPortal}
                  title="Publish Portal"
                  desc="Tampilkan di hasil"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                disabled={loading}
                onClick={save}
                className="flex items-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={20} />
                Simpan Perubahan
              </button>

              <button
                onClick={onClose}
                className="rounded-2xl border px-8 py-4 font-semibold transition hover:bg-gray-100"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 transition hover:border-red-200 hover:bg-red-50">
      <div className="flex items-center gap-2">
        {icon && <span className="text-red-600">{icon}</span>}
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>

      <p className="mt-2 break-words text-base font-semibold text-gray-900">
        {value === null || value === undefined || value === "" ? "-" : value}
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
  const toneClasses = {
    yellow: "border-yellow-200 bg-yellow-50",
    green: "border-green-200 bg-green-50",
    red: "border-red-200 bg-red-50",
  };

  const activeTone = {
    yellow: "accent-yellow-600",
    green: "accent-green-600",
    red: "accent-red-600",
  };

  return (
    <label
      className={`cursor-pointer rounded-2xl border p-4 transition hover:shadow-sm ${
        checked ? toneClasses[tone] : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="radio"
          checked={checked}
          onChange={onChange}
          className={`mt-1 h-4 w-4 ${activeTone[tone]}`}
        />

        <div>
          <p className="font-bold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{desc}</p>
        </div>
      </div>
    </label>
  );
}

function ToggleBox({ checked, onChange, title, desc }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-2xl border p-4 text-left transition hover:shadow-sm ${
        checked ? "border-red-200 bg-red-50" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-bold text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-500">{desc}</p>
        </div>

        <span
          className={`mt-1 inline-flex h-6 w-11 items-center rounded-full p-1 transition ${
            checked ? "bg-green-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`h-4 w-4 rounded-full bg-white transition ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </span>
      </div>
    </button>
  );
}

export default ApplicantModal;