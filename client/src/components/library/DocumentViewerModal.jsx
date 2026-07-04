import { X, ExternalLink, Download } from "lucide-react";

function DocumentViewerModal({ resource, onClose }) {
  if (!resource) return null;

  // Resolve base URL for backend static assets dynamically to match user environment
  const backendBaseUrl = `http://${window.location.hostname}:5000`;
  const fileUrl = resource.fileUrl?.startsWith("/")
    ? `${backendBaseUrl}${resource.fileUrl}`
    : resource.fileUrl;

  const isPdf = fileUrl && fileUrl.toLowerCase().endsWith(".pdf");
  const isFeaturedSystemDesign = resource.title === "System Design Interview Bible";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="flex h-[90vh] w-[90vw] max-w-5xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EDF1F4] bg-[#F8FAFB] px-8 py-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#428475]">
              Document Viewer
            </span>
            <h2 className="text-xl font-bold text-[#172033] mt-1">{resource.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            {fileUrl && (
              <>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                >
                  <ExternalLink size={14} />
                  Open in New Tab
                </a>
                <a
                  href={fileUrl}
                  download
                  className="flex items-center gap-1.5 rounded-xl bg-[#428475] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1A312C]"
                >
                  <Download size={14} />
                  Download PDF
                </a>
              </>
            )}

            <button
              onClick={onClose}
              className="rounded-xl bg-white p-2 text-gray-500 border border-gray-200 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 bg-gray-100 p-6 flex flex-col justify-center overflow-hidden animate-in fade-in duration-300">
          {isFeaturedSystemDesign ? (
            /* Premium Native HTML System Design Guide to bypass local loopback browser restrictions */
            <div className="flex-1 bg-white p-8 overflow-y-auto max-h-[72vh] rounded-2xl border border-gray-200 shadow-inner space-y-6 text-[#172033] leading-relaxed">
              <div className="border-b border-[#EDF1F4] pb-5">
                <span className="bg-[#EEF8F4] text-[#428475] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                  Featured Handbook
                </span>
                <h1 className="text-3xl font-extrabold text-[#172033] mt-4">System Design Interview Bible</h1>
                <p className="text-sm text-gray-500 mt-2">A complete guide to designing highly scalable, distributed systems.</p>
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#16332D] flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-[#EEF8F4] text-[#428475] flex items-center justify-center text-xs font-bold">1</span>
                  System Design Fundamentals
                </h3>
                <p className="text-sm text-gray-600">
                  System design is the process of defining the architecture, modules, interfaces, and data for a system to satisfy specified requirements. The key is balancing scalability, reliability, and maintainability.
                </p>
                <div className="bg-[#F8FAFB] p-4 rounded-xl border border-gray-100 grid md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold block text-[#172033] mb-1">Functional Requirements</span>
                    <span className="text-gray-500">What the system actually does (e.g., users can post tweets, view feed).</span>
                  </div>
                  <div>
                    <span className="font-bold block text-[#172033] mb-1">Non-Functional Requirements</span>
                    <span className="text-gray-500">Quality attributes (e.g., latency &lt; 200ms, 99.9% availability).</span>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#16332D] flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-[#EEF8F4] text-[#428475] flex items-center justify-center text-xs font-bold">2</span>
                  Horizontal vs. Vertical Scaling
                </h3>
                <p className="text-sm text-gray-600">
                  Scaling is how we handle increased workload. Vertical scaling means adding more power (CPU, RAM) to an existing machine. Horizontal scaling means adding more machines to the pool.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse border border-gray-150">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-3 font-bold text-[#172033] border-r border-gray-200">Criteria</th>
                        <th className="p-3 font-bold text-[#172033] border-r border-gray-200">Vertical Scaling (Scale Up)</th>
                        <th className="p-3 font-bold text-[#172033]">Horizontal Scaling (Scale Out)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                      <tr>
                        <td className="p-3 font-bold text-[#172033] border-r border-gray-200">Limit</td>
                        <td className="p-3 border-r border-gray-200">Hard hardware limits</td>
                        <td className="p-3">Virtually infinite scaling</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#172033] border-r border-gray-200">Downtime</td>
                        <td className="p-3 border-r border-gray-200">Requires reboot / offline swap</td>
                        <td className="p-3">No downtime (redundancy)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-[#172033] border-r border-gray-200">Load Balancing</td>
                        <td className="p-3 border-r border-gray-200">Not required</td>
                        <td className="p-3">Crucial component (Nginx, HAProxy)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#16332D] flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-[#EEF8F4] text-[#428475] flex items-center justify-center text-xs font-bold">3</span>
                  Load Balancers & Caching Layer
                </h3>
                <p className="text-sm text-gray-600">
                  Load balancers distribute incoming network traffic across multiple servers. A cache is a high-speed data storage layer (e.g. Redis, Memcached) that stores subset of data to serve requests faster.
                </p>
                <div className="bg-[#EEF8F4]/30 p-4 rounded-xl border border-[#428475]/10 text-xs space-y-2">
                  <p className="font-bold text-[#16332D]">Cache Read Strategies:</p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li><strong>Cache Aside (Lazy Loading):</strong> App checks cache. If miss, queries database, updates cache, and returns.</li>
                    <li><strong>Read Through:</strong> App queries cache directly. Cache fetches from DB on miss and caches automatically.</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#16332D] flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-[#EEF8F4] text-[#428475] flex items-center justify-center text-xs font-bold">4</span>
                  Database Partitioning & Sharding
                </h3>
                <p className="text-sm text-gray-600">
                  When a database grows too large, sharding breaks it up. Sharding splits data horizontally across multiple database instances using a shard key (e.g., hash(user_id) % number of shards).
                </p>
              </div>

              {/* Section 5 */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#16332D] flex items-center gap-2">
                  <span className="h-6 w-6 rounded-lg bg-[#EEF8F4] text-[#428475] flex items-center justify-center text-xs font-bold">5</span>
                  Message Queues & Microservices
                </h3>
                <p className="text-sm text-gray-600">
                  For asynchronous operations, message queues (e.g., RabbitMQ, Kafka) allow decoupled processes. A service publishes a message, and another service consumes it, maintaining high availability during peak traffic spikes.
                </p>
              </div>
            </div>
          ) : fileUrl ? (
            isPdf ? (
              <div className="relative w-full h-full flex flex-col gap-3">
                <iframe
                  title={resource.title}
                  src={`${fileUrl}#toolbar=0`}
                  className="w-full flex-1 rounded-2xl border border-gray-200 shadow-inner bg-white"
                />
                <div className="text-center text-xs text-gray-500 bg-white py-2.5 px-4 rounded-xl border border-gray-200">
                  💡 <strong>Tip:</strong> If the PDF document does not render in your browser, click{" "}
                  <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-[#428475] font-bold hover:underline">
                    Open in New Tab
                  </a>{" "}
                  to view it directly!
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="max-w-md bg-white p-8 rounded-3xl border border-gray-200 shadow-md">
                  <span className="text-4xl">📄</span>
                  <h3 className="text-lg font-bold text-[#172033] mt-4">Document Content</h3>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    This resource is hosted at a external URL. You can view or download it directly using the buttons in the toolbar.
                  </p>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 bg-[#428475] text-white rounded-xl text-xs font-bold hover:bg-[#1A312C]"
                  >
                    View Document Content
                  </a>
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="max-w-lg bg-white p-8 rounded-3xl border border-gray-200 shadow-md">
                <span className="text-4xl">🔬</span>
                <h3 className="text-lg font-bold text-[#172033] mt-4">Nexora Case Study & Notes</h3>
                <p className="text-xs text-gray-400 mt-1 uppercase font-bold tracking-wider">{resource.category}</p>
                <div className="text-left text-xs text-gray-600 mt-6 leading-relaxed bg-[#F8FAFB] p-5 rounded-2xl border border-[#EDF1F4] max-h-60 overflow-y-auto space-y-4">
                  <p className="font-bold text-[#172033] text-sm">Overview:</p>
                  <p>
                    This is an open-source technical case study curated by the Nexora Learning Library. It covers structural code patterns, industry best practices, and scalable implementation strategies.
                  </p>
                  <p className="font-bold text-[#172033] text-sm">Key Topics Covered:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Optimal component lifecycle and layout boundaries.</li>
                    <li>State caching and local validation architectures.</li>
                    <li>Query optimization techniques on relational tables.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentViewerModal;
