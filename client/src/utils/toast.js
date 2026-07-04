export function showToast(message, type = "success") {
  // Ensure we are in browser environment
  if (typeof document === "undefined") return;

  let container = document.getElementById("nexora-toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "nexora-toast-container";
    container.className = "fixed bottom-6 right-6 flex flex-col gap-3 z-[999999]";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  
  // Custom styles matching premium styling palette
  const bgColor = type === "error" ? "bg-red-600" : "bg-[#16332D]";
  const borderColor = type === "error" ? "border-red-700/30" : "border-[#3BBD8A]/30";
  
  toast.className = `p-4 px-5 rounded-2xl border ${borderColor} ${bgColor} text-white shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-y-0 opacity-100 max-w-sm`;
  
  toast.style.animation = "toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards";

  // Inject CSS keyframes if not already present
  if (!document.getElementById("toast-animation-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "toast-animation-styles";
    styleSheet.innerText = `
      @keyframes toast-in {
        from { transform: translateY(1rem); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes toast-out {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(1rem); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  toast.innerHTML = `
    <span class="text-sm shrink-0">${type === "error" ? "⚠️" : "✨"}</span>
    <span class="text-xs font-semibold leading-relaxed tracking-wide">${message}</span>
  `;

  container.appendChild(toast);

  // Dismiss toast after 3.2 seconds
  setTimeout(() => {
    toast.style.animation = "toast-out 0.2s ease-in forwards";
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) {
        container.remove();
      }
    }, 200);
  }, 3200);
}
