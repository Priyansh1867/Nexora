function AuthCard({ children }) {
  return (
    <div
      className="
        w-full
        max-w-lg
        bg-white
        rounded-3xl
        shadow-xl
        p-10
      "
    >
      {children}
    </div>
  );
}

export default AuthCard;