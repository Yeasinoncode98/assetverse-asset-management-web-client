import React from "react";

export default function RequestTable({
  requests,
  onApprove,
  onReject,
  actionLoading,
}) {
  const statusBadge = (status) => {
    const badges = {
      pending: { class: "badge-warning", text: "Pending", icon: "⏳" },
      approved: { class: "badge-success", text: "Approved", icon: "✅" },
      rejected: { class: "badge-error", text: "Rejected", icon: "❌" },
      returned: { class: "badge-info", text: "Returned", icon: "🔄" },
    };
    return badges[status] || badges.pending;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {/* Desktop Table View - Hidden on Mobile */}
      <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="font-bold text-gray-700">Employee</th>
                <th className="font-bold text-gray-700">Asset Details</th>
                <th className="font-bold text-gray-700">Request Date</th>
                <th className="font-bold text-gray-700">Status</th>
                <th className="font-bold text-gray-700">Notes</th>
                <th className="font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => {
                const badge = statusBadge(request.requestStatus);
                const isLoading = actionLoading === request._id;

                return (
                  <tr
                    key={request._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Employee Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full ring ring-blue-500 ring-offset-2">
                            {request.requesterPhoto ? (
                              <img
                                src={request.requesterPhoto}
                                alt={request.requesterName}
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    request.requesterName
                                  )}&size=100&background=4F46E5&color=fff`;
                                }}
                              />
                            ) : (
                              <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  request.requesterName
                                )}&size=100&background=4F46E5&color=fff`}
                                alt={request.requesterName}
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {request.requesterName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.requesterEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Asset Details */}
                    <td>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-800 break-words">
                          {request.assetName}
                        </div>
                        <span
                          className={`badge badge-sm mt-1 whitespace-nowrap ${
                            request.assetType === "Returnable"
                              ? "badge-primary"
                              : "badge-secondary"
                          }`}
                        >
                          {request.assetType}
                        </span>
                      </div>
                    </td>

                    {/* Request Date */}
                    <td className="text-gray-600">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm">
                          {formatDate(request.requestDate)}
                        </span>
                      </div>
                      {request.approvalDate && (
                        <div className="flex items-center gap-2 mt-1">
                          <svg
                            className="w-4 h-4 text-green-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-xs text-gray-500">
                            Processed: {formatDate(request.approvalDate)}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      <span className={`badge ${badge.class} gap-1`}>
                        <span>{badge.icon}</span>
                        {badge.text}
                      </span>
                      {request.processedBy && (
                        <div className="text-xs text-gray-500 mt-1">
                          By: {request.processedBy}
                        </div>
                      )}
                    </td>

                    {/* Notes */}
                    <td>
                      <div className="max-w-xs">
                        {request.note ? (
                          <p
                            className="text-sm text-gray-600 line-clamp-2"
                            title={request.note}
                          >
                            {request.note}
                          </p>
                        ) : (
                          <span className="text-sm text-gray-400 italic">
                            No notes
                          </span>
                        )}
                        {request.rejectionReason && (
                          <p className="text-xs text-red-600 mt-1">
                            <strong>Rejection:</strong>{" "}
                            {request.rejectionReason}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      {request.requestStatus === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => onApprove(request._id)}
                            disabled={isLoading}
                            className="btn btn-sm bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                            title="Approve Request"
                          >
                            {isLoading ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Approve
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => onReject(request._id)}
                            disabled={isLoading}
                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
                            title="Reject Request"
                          >
                            {isLoading ? (
                              <span className="loading loading-spinner loading-xs"></span>
                            ) : (
                              <>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                                Reject
                              </>
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 italic">
                          {request.requestStatus === "approved"
                            ? "Already approved"
                            : "Already rejected"}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Summary - Desktop */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing <strong>{requests.length}</strong> request
              {requests.length !== 1 ? "s" : ""}
            </span>
            <div className="flex gap-4">
              <span>
                Pending:{" "}
                <strong className="text-yellow-600">
                  {requests.filter((r) => r.requestStatus === "pending").length}
                </strong>
              </span>
              <span>
                Approved:{" "}
                <strong className="text-green-600">
                  {
                    requests.filter((r) => r.requestStatus === "approved")
                      .length
                  }
                </strong>
              </span>
              <span>
                Rejected:{" "}
                <strong className="text-red-600">
                  {
                    requests.filter((r) => r.requestStatus === "rejected")
                      .length
                  }
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card View - Shown only on Mobile/Tablet */}
      <div className="lg:hidden space-y-4">
        {requests.map((request) => {
          const badge = statusBadge(request.requestStatus);
          const isLoading = actionLoading === request._id;

          return (
            <div
              key={request._id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              {/* Card Header - Employee Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="avatar flex-shrink-0">
                    <div className="w-12 h-12 rounded-full ring ring-blue-500 ring-offset-2">
                      {request.requesterPhoto ? (
                        <img
                          src={request.requesterPhoto}
                          alt={request.requesterName}
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              request.requesterName
                            )}&size=100&background=4F46E5&color=fff`;
                          }}
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            request.requesterName
                          )}&size=100&background=4F46E5&color=fff`}
                          alt={request.requesterName}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-base truncate">
                      {request.requesterName}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {request.requesterEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {/* Asset Details */}
                <div className="flex items-start gap-2">
                  <div className="text-xl flex-shrink-0">📦</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Asset Details
                    </p>
                    <p className="font-semibold text-gray-800 text-sm">
                      {request.assetName}
                    </p>
                    <span
                      className={`badge badge-sm mt-1 ${
                        request.assetType === "Returnable"
                          ? "badge-primary"
                          : "badge-secondary"
                      }`}
                    >
                      {request.assetType}
                    </span>
                  </div>
                </div>

                {/* Request Date */}
                <div className="flex items-start gap-2">
                  <div className="text-xl flex-shrink-0">📅</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Request Date
                    </p>
                    <p className="text-sm text-gray-700">
                      {formatDate(request.requestDate)}
                    </p>
                    {request.approvalDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Processed: {formatDate(request.approvalDate)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-start gap-2">
                  <div className="text-xl flex-shrink-0">🏷️</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Status
                    </p>
                    <span className={`badge ${badge.class} gap-1`}>
                      <span>{badge.icon}</span>
                      {badge.text}
                    </span>
                    {request.processedBy && (
                      <p className="text-xs text-gray-500 mt-1">
                        Processed by: {request.processedBy}
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="flex items-start gap-2">
                  <div className="text-xl flex-shrink-0">📝</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Notes
                    </p>
                    {request.note ? (
                      <p className="text-sm text-gray-700 break-words">
                        {request.note}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No notes</p>
                    )}
                    {request.rejectionReason && (
                      <p className="text-xs text-red-600 mt-2 p-2 bg-red-50 rounded">
                        <strong>Rejection Reason:</strong>{" "}
                        {request.rejectionReason}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    Actions
                  </p>
                  {request.requestStatus === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onApprove(request._id)}
                        disabled={isLoading}
                        className="flex-1 btn btn-sm bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Approve
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => onReject(request._id)}
                        disabled={isLoading}
                        className="flex-1 btn btn-sm bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-400"
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Reject
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2 bg-gray-50 rounded text-sm text-gray-500 italic">
                      {request.requestStatus === "approved"
                        ? "✅ Already approved"
                        : "❌ Already rejected"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Footer Summary - Mobile */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="text-center mb-3">
            <span className="text-sm text-gray-600">
              Showing <strong>{requests.length}</strong> request
              {requests.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-yellow-50 rounded-lg p-2">
              <p className="text-xs text-gray-600 mb-1">Pending</p>
              <p className="text-lg font-bold text-yellow-600">
                {requests.filter((r) => r.requestStatus === "pending").length}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-2">
              <p className="text-xs text-gray-600 mb-1">Approved</p>
              <p className="text-lg font-bold text-green-600">
                {requests.filter((r) => r.requestStatus === "approved").length}
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-2">
              <p className="text-xs text-gray-600 mb-1">Rejected</p>
              <p className="text-lg font-bold text-red-600">
                {requests.filter((r) => r.requestStatus === "rejected").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
