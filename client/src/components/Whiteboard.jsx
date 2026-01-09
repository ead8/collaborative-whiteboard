import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import DrawingCanvas from './DrawingCanvas';
import Toolbar from './Toolbar';
import UserCursors from './UserCursors';
import { getSocket } from '../socket.js';

const Whiteboard = () => {
  const { roomId } = useParams();
  const [userCount, setUserCount] = useState(1);
  const [color, setColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [tool, setTool] = useState('pencil');

  const socketRef = useRef(null);
  const hasJoinedRef = useRef(false);
  const channelRef = useRef(null);

  useEffect(() => {
    socketRef.current = getSocket();

    if (roomId && !hasJoinedRef.current) {
      socketRef.current.emit('join-room', roomId);
      hasJoinedRef.current = true;
    }

    const handleUserCount = (count) => setUserCount(count);
    socketRef.current.on('user-count', handleUserCount);

    return () => {
      socketRef.current.off('user-count', handleUserCount);
    };
  }, [roomId]);

  // Initialize BroadcastChannel
  useEffect(() => {
    channelRef.current = new BroadcastChannel('whiteboard-sync');

    const channel = channelRef.current;
    channel.onmessage = (event) => {
      const { type, data } = event.data;

      if (type === 'color-change') setColor(data.color);
      if (type === 'stroke-change') setStrokeWidth(data.strokeWidth);
      if (type === 'tool-change') setTool(data.tool);
      if (type === 'clear-canvas') {
        socketRef.current?.emit('clear-canvas', { roomId });
      }
    };

    return () => {
      if (channelRef.current) {
        channelRef.current.close();
        channelRef.current = null;
      }
    };
  }, [roomId]);

  const handleClearCanvas = () => {
    socketRef.current?.emit('clear-canvas', { roomId });
    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'clear-canvas' });
    }
  };

  const safePostMessage = (type, data) => {
    if (channelRef.current) {
      try {
        channelRef.current.postMessage({ type, data });
      } catch (error) {
        console.warn('BroadcastChannel postMessage failed:', error);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-slate-50">
      <div className="w-full px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-medium text-slate-900">
            Room: <span className="text-blue-600 font-mono">{roomId}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-slate-600">
            <span className="font-medium">{userCount}</span> {userCount === 1 ? 'user' : 'users'}
          </span>
        </div>
      </div>

      <Toolbar
        color={color}
        setColor={(c) => {
          setColor(c);
          safePostMessage('color-change', { color: c });
        }}
        strokeWidth={strokeWidth}
        setStrokeWidth={(w) => {
          setStrokeWidth(w);
          safePostMessage('stroke-change', { strokeWidth: w });
        }}
        onClear={handleClearCanvas}
        tool={tool}
        setTool={(t) => {
          setTool(t);
          safePostMessage('tool-change', { tool: t });
        }}
      />

      <div className="relative w-full h-full overflow-hidden bg-white">
        <DrawingCanvas
          socket={socketRef.current}
          roomId={roomId}
          color={color}
          strokeWidth={strokeWidth}
          tool={tool}
        />
        <UserCursors socket={socketRef.current} roomId={roomId} />
      </div>
    </div>
  );
};

export default Whiteboard;