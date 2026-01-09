import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const isValidRoomCode = (code) => /^[a-zA-Z0-9]{6,8}$/.test(code);

const generateRoomCode = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const RoomJoin = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmedCode = roomCode.trim();

    if (!isValidRoomCode(trimmedCode)) {
      setError("Room code must be 6–8 alphanumeric characters");
      return;
    }

    navigate(`/room/${trimmedCode}`);
  };

  const handleCreateRoom = () => {
    const newCode = generateRoomCode();
    navigate(`/room/${newCode}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Collaborative Whiteboard</h1>
          <p className="text-sm text-slate-500">Draw together in real-time</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-medium mb-4 text-slate-900">Join a Room</h2>

          <form onSubmit={handleJoin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Room Code
              </label>
              <input
                type="text"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => {
                  setRoomCode(e.target.value);
                  setError("");
                }}
                className="w-full px-3 py-2.5 rounded-md border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono text-sm"
                maxLength={8}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Joining..." : "Join Room"}
            </button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-slate-400">or</span>
            </div>
          </div>

          <button
            onClick={handleCreateRoom}
            className="w-full bg-white text-blue-600 px-4 py-2.5 rounded-md font-medium border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            Create New Room
          </button>

          {error && (
            <div className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          No account required
        </p>
      </div>
    </div>
  );
};

export default RoomJoin;
