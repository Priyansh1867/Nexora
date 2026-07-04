import {
  Award,
  Calendar,
  Download,
  Eye,
} from "lucide-react";

function CertificateCard({
  title,
  organization,
  issueDate,
  credentialId,
}) {
  return (
    <div
      className="
      rounded-[30px]
      border
      border-[#EDF1F4]
      bg-white
      p-7
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
      "
    >
      <div className="flex items-center justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF8F4]">
          <Award
            size={30}
            className="text-[#428475]"
          />
        </div>

        <span className="rounded-full bg-[#EEF8F4] px-4 py-2 text-sm font-semibold text-[#428475]">
          Verified
        </span>
      </div>

      <h3 className="mt-7 text-2xl font-bold text-[#172033]">
        {title}
      </h3>

      <p className="mt-2 font-medium text-[#428475]">
        {organization}
      </p>

      <div className="mt-6 space-y-3 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          Issued : {issueDate}
        </div>

        <div>
          Credential ID :
          <span className="ml-2 font-medium text-[#172033]">
            {credentialId}
          </span>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] py-3 font-semibold transition hover:border-[#428475]">
          <Eye size={18} />
          Preview
        </button>

        <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#16332D] py-3 font-semibold text-white transition hover:bg-[#214740]">
          <Download size={18} />
          Download
        </button>
      </div>
    </div>
  );
}

export default CertificateCard;