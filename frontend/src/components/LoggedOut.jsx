import React from "react";
import { Link } from "react-router-dom";

export default function LoggedOut() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 font-sans">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="w-full max-w-md text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6 border border-green-100 shadow-sm">
          <span className="text-4xl text-green-600 font-bold">✓</span>
        </div>

        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Logged Out
        </h2>

        <p className="text-gray-600 font-medium mb-10 leading-relaxed">
          You have been safely signed out. <br />
          See you again soon at{" "}
          <span className="font-bold text-gray-800">PROMGR</span>!
        </p>

        {/* Action Card */}
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/80">
          <Link
            to="/login"
            className="block w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-100 mb-4"
          >
            Sign In Again
          </Link>

          <div className="pt-4 border-t border-gray-50"></div>
        </div>
      </div>
    </div>
  );
}
