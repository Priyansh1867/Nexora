function Logo() {
  return (
    <div className="flex items-center gap-4">

      <div className="w-12 h-12 rounded-xl bg-[#DDF3EA] flex items-center justify-center shadow-md">

        <span className="text-2xl font-black text-[#1A312C]">
          N
        </span>

      </div>

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          Nexora
        </h1>

        <p className="text-xs text-gray-300 leading-5 mt-1">
          Student Growth &
          <br />
          Collaboration Platform
        </p>

      </div>

    </div>
  );
}

export default Logo;