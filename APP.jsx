import React, { useState, useEffect } from 'react';
import { 
  Car, Bike, Shield, MapPin, Navigation, Phone, User, CheckCircle2, 
  Clock, Award, Star, Settings, ChevronRight, Zap, RefreshCw, AlertCircle 
} from 'lucide-react';

// ==========================================
// 1. FIREBASE CONFIGURATION & INITIALIZATION
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyBe2RrxIZcyAxeG2q2CP9LwxbGPj_9bzy0",
  authDomain: "rathride.firebaseapp.com",
  databaseURL: "https://rathride-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rathride",
  storageBucket: "rathride.firebasestorage.app",
  messagingSenderId: "1097817168516",
  appId: "1:1097817168516:web:011192ceef41b15cefc0d1",
  measurementId: "G-T1VMZBBTX0"
};

// Rath Town Landmarks
const RATH_LANDMARKS = [
  "Bus Stand, Rath",
  "Padav Tiraha, Rath",
  "Chopra Mandir / Chopra Road",
  "Galla Mandi, Rath",
  "Orai Bus Stand, Rath",
  "Charkhari Road, Rath",
  "BNV College, Rath",
  "GRV Inter College, Rath",
  "Akhand Dham, Rath",
  "Sankat Mochan Dham, Rath"
];

// Vehicle Categories
const VEHICLES = [
  { id: 'bike', name: 'Bike Taxi', icon: Bike, baseFare: 15, perKm: 5, time: '3 min' },
  { id: 'erickshaw', name: 'E-Rickshaw', icon: Car, baseFare: 10, perKm: 4, time: '5 min' },
  { id: 'auto', name: 'Auto Rickshaw', icon: Car, baseFare: 25, perKm: 8, time: '4 min' },
  { id: 'cab', name: 'Cab / Car', icon: Car, baseFare: 50, perKm: 12, time: '7 min' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('customer');
  const [pickup, setPickup] = useState(RATH_LANDMARKS[0]);
  const [dropoff, setDropoff] = useState(RATH_LANDMARKS[2]);
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [bookingStatus, setBookingStatus] = useState('IDLE');
  const [otp, setOtp] = useState('');

  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [captainOtpInput, setCaptainOtpInput] = useState('');

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'RATH50') {
      setDiscount(50);
      alert('बधाई हो! RATH50 कूपन से 50% छूट मिली।');
    } else {
      alert('अमान्य कूपन कोड! कृपया RATH50 का उपयोग करें।');
    }
  };

  const handleBookRide = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setBookingStatus('SEARCHING');

    setTimeout(() => {
      setBookingStatus('ASSIGNED');
      setActiveJob({
        id: 'RD-' + Math.floor(1000 + Math.random() * 9000),
        pickup,
        dropoff,
        vehicle: selectedVehicle,
        fare: 40 - (40 * discount) / 100,
        customerName: 'Rohit Soni',
        customerPhone: '+91 9876543210',
        otp: generatedOtp
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-12">
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-2 rounded-xl text-slate-900 font-black text-xl">RR</div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-amber-400">Rath Ride</h1>
              <p className="text-xs text-slate-400">Hamirpur, UP</p>
            </div>
          </div>
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs">
            <button onClick={() => setActiveTab('customer
                                                
