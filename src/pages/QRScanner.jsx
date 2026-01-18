import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiCamera } from 'react-icons/hi2';
import * as userService from '../services/userService';
import jsQR from 'jsqr';

const QRScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [manualUserId, setManualUserId] = useState('');

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setScanning(true);
        scanQR();
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera access to scan QR codes.');
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setScanning(false);
  };

  const scanQR = () => {
    if (!scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const scan = () => {
      if (!scanning) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          handleQRCode(code.data);
          return;
        }
      }

      requestAnimationFrame(scan);
    };

    scan();
  };

  const handleManualSubmit = async () => {
    if (!manualUserId.trim()) {
      setError('Please enter a User ID');
      return;
    }

    try {
      const user = await userService.getUserByUniqueId(manualUserId.trim());
      if (user) {
        // Vibrate on successful entry
        if (navigator.vibrate) {
          navigator.vibrate(200);
        }
        stopCamera();
        navigate(`/pay-to/${manualUserId.trim()}`);
      } else {
        setError('Invalid User ID or user not found.');
      }
    } catch (error) {
      setError('Invalid User ID or user not found.');
    }
  };

  const handleQRCode = async (data) => {
    try {
      // Try to parse as JSON first (new format)
      const qrData = JSON.parse(data);
      if (qrData.type === 'payment' && qrData.userId) {
        // Verify user exists
        const user = await userService.getUserByUniqueId(qrData.userId);
        if (user) {
          // Vibrate on successful scan
          if (navigator.vibrate) {
            navigator.vibrate(200);
          }
          stopCamera();
          navigate(`/pay-to/${qrData.userId}`);
        } else {
          setError('Invalid QR code or user not found.');
        }
      } else {
        setError('Invalid QR code format.');
      }
    } catch (err) {
      // If JSON parsing fails, treat as plain userId (old format)
      const userId = data.trim();
      if (userId) {
        try {
          const user = await userService.getUserByUniqueId(userId);
          if (user) {
            // Vibrate on successful scan
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
            stopCamera();
            navigate(`/pay-to/${userId}`);
          } else {
            setError('Invalid QR code or user not found.');
          }
        } catch (userError) {
          setError('Invalid QR code or user not found.');
        }
      } else {
        setError('Invalid QR code.');
      }
      console.error('QR parse error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <HiArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Scan QR Code</h1>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          className="hidden"
        />

        {/* Scanning overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white rounded-lg relative">
            <div className="absolute -top-1 -left-1 w-6 h-6 border-l-4 border-t-4 border-emerald-500"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-r-4 border-t-4 border-emerald-500"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-l-4 border-b-4 border-emerald-500"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-r-4 border-b-4 border-emerald-500"></div>
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-20 left-0 right-0 text-center text-white px-4">
          <p className="text-lg font-semibold mb-2">Scan Payment QR Code</p>
          <p className="text-sm opacity-80">Point camera at a user's QR code to send coins</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute top-20 left-4 right-4 bg-red-500 text-white p-4 rounded-lg">
            <p>{error}</p>
            <button
              onClick={() => setError('')}
              className="mt-2 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-4 px-4">
          <div className="flex gap-4">
            {!scanning ? (
              <button
                onClick={startCamera}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                <HiCamera size={20} />
                Start Scanning
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
              >
                Stop Scanning
              </button>
            )}
          </div>

          {/* Manual Entry */}
          <button
            onClick={() => setManualEntry(!manualEntry)}
            className="text-white underline text-sm"
          >
            {manualEntry ? 'Cancel Manual Entry' : 'Enter User ID Manually'}
          </button>

          {manualEntry && (
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
              <input
                type="text"
                value={manualUserId}
                onChange={(e) => setManualUserId(e.target.value)}
                placeholder="Enter User ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-3"
              />
              <button
                onClick={handleManualSubmit}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
