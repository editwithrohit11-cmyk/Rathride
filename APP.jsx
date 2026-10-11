import React, { useState, useEffect } from 'react';
import { 
  Car, Bike, Shield, MapPin, Navigation, Phone, User, CheckCircle2, 
  Clock, Award, Star, Settings, ChevronRight, Zap, RefreshCw, AlertCircle 
} from 'lucide-react';

// ==========================================
// 1. FIREBASE CONFIGURATION & INITIALIZATION
// ==========================================
// नोट: अपनी असली Firebase Keys यहाँ बदलें
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "rathride.firebaseapp.com",
  projectId: "rathride",
  storageBucket: "rathride.firebasestorage.app",
  messagingSenderId: "1097817168516",
  appId: "1:1097817168516:web:011192ceef41b15cefc"
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
  const [activeTab, setActiveTab] = useState('customer'); // customer | captain | admin
  
  // Customer State
  const [pickup, setPickup] = useState(RATH_LANDMARKS[0]);
  const [dropoff, setDropoff] = useState(RATH_LANDMARKS[2]);
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [bookingStatus, setBookingStatus] = useState('IDLE'); // IDLE | SEARCHING | ASSIGNED | IN_PROGRESS | COMPLETED
  const [otp, setOtp] = useState('');

  // Captain State
  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [captainOtpInput, setCaptainOtpInput] = useState('');

  // Handle Promo Code Apply
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'RATH50') {
      setDiscount(50);
      alert('बधाई हो! RATH50 कूपन से 50% छूट मिली।');
    } else {
      alert('अमान्य कूपन कोड! कृपया RATH50 का उपयोग करें।');
    }
  };

  // Handle Book Ride
  const handleBookRide = () => {
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setOtp(generatedOtp);
    setBookingStatus('SEARCHING');

    // Simulate Captain Accepting Ride after 3 seconds
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
      {/* Top Header Navigation */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-2 rounded-xl text-slate-900 font-black text-xl">
              RR
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-amber-400">Rath Ride</h1>
              <p className="text-xs text-slate-400">Hamirpur, UP</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs">
            <button 
              onClick={() => setActiveTab('customer')} 
              className={`px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'customer' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>
              Rider
            </button>
            <button 
              onClick={() => setActiveTab('captain')} 
              className={`px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'captain' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>
              Captain
            </button>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`px-3 py-1.5 rounded-md font-medium transition ${activeTab === 'admin' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'}`}>
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-md mx-auto p-4 space-y-4">

        {/* =================================================== */}
        {/* 1. CUSTOMER MODE VIEW */}
        {/* =================================================== */}
        {activeTab === 'customer' && (
          <div className="space-y-4">
            {bookingStatus === 'IDLE' && (
              <>
                {/* Location Selectors */}
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">पिकअप लोकेशन (Pickup)</label>
                    <select 
                      value={pickup} 
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-medium text-white focus:outline-none focus:border-amber-500">
                      {RATH_LANDMARKS.map((lm, idx) => (
                        <option key={idx} value={lm}>{lm}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">ड्रॉप लोकेशन (Dropoff)</label>
                    <select 
                      value={dropoff} 
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm font-medium text-white focus:outline-none focus:border-amber-500">
                      {RATH_LANDMARKS.map((lm, idx) => (
                        <option key={idx} value={lm}>{lm}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vehicle Choice */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-slate-300">सवारी चुनें (Choose Vehicle)</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {VEHICLES.map((v) => {
                      const Icon = v.icon;
                      const isSelected = selectedVehicle === v.id;
                      return (
                        <div 
                          key={v.id}
                          onClick={() => setSelectedVehicle(v.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition ${isSelected ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <Icon className="w-6 h-6" />
                            <span className="text-xs text-slate-400">{v.time}</span>
                          </div>
                          <div className="font-bold text-sm">{v.name}</div>
                          <div className="text-xs text-slate-400">बेस ₹{v.baseFare} + ₹{v.perKm}/km</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Promo Coupon */}
                <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="प्रोमो कोड (उदा: RATH50)" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg p-2 text-sm flex-1 uppercase text-white focus:outline-none"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="bg-slate-700 hover:bg-slate-600 px-4 rounded-lg text-sm font-bold text-white transition">
                    Apply
                  </button>
                </div>

                {/* Book Button */}
                <button 
                  onClick={handleBookRide}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold p-4 rounded-2xl text-lg shadow-lg shadow-amber-500/20 transition">
                  राइड बुक करें (Book Ride)
                </button>
              </>
            )}

            {/* Searching State */}
            {bookingStatus === 'SEARCHING' && (
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
                <RefreshCw className="w-12 h-12 text-amber-500 animate-spin mx-auto" />
                <h2 className="text-xl font-bold">राठ में आपके लिए कैप्टन ढूँढा जा रहा है...</h2>
                <p className="text-slate-400 text-sm">कृपया प्रतीक्षा करें, आसपास के ड्राइवरों को रिक्वेस्ट भेजी जा रही है।</p>
              </div>
            )}

            {/* Assigned / Active Ride State */}
            {bookingStatus === 'ASSIGNED' && (
              <div className="bg-slate-800 p-6 rounded-2xl border border-amber-500/50 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                  <div>
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">कैप्टन असाइन हो गया!</span>
                    <h3 className="font-bold text-lg mt-1">सुरेश कुमार (UP-91 AB 1234)</h3>
                    <p className="text-xs text-slate-400">बाइक टैक्सी • Hero Splendor</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">पिकअप OTP</div>
                    <div className="text-2xl font-black text-amber-400">{otp}</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">पिकअप:</span>
                    <span className="font-medium">{pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">ड्रॉप:</span>
                    <span className="font-medium">{dropoff}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setBookingStatus('IDLE')}
                  className="w-full bg-red-500/20 text-red-400 border border-red-500/30 p-3 rounded-xl font-bold">
                  राइड रद्द करें (Cancel Ride)
                </button>
              </div>
            )}
          </div>
        )}

        {/* =================================================== */}
        {/* 2. CAPTAIN / DRIVER MODE VIEW */}
        {/* =================================================== */}
        {activeTab === 'captain' && (
          <div className="space-y-4">
            {/* Duty Status Switch */}
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">ड्यूटी का स्टेटस</h3>
                <p className="text-xs text-slate-400">{isOnline ? 'आप ऑन-ड्यूटी हैं (राइड्स आ सकती हैं)' : 'आप ऑफ-ड्यूटी हैं'}</p>
              </div>
              <button 
                onClick={() => setIsOnline(!isOnline)}
                className={`px-4 py-2 rounded-xl font-bold transition ${isOnline ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </button>
            </div>

            {/* Active Job Radar */}
            {isOnline && activeJob && (
              <div className="bg-amber-500/10 border-2 border-amber-500 p-5 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded">नया राइड अलर्ट</span>
                    <h2 className="text-xl font-black mt-1">₹{activeJob.fare}</h2>
                  </div>
                  <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">2.5 km दूर</span>
                </div>

                <div className="space-y-2 text-sm bg-slate-900/60 p-3 rounded-xl">
                  <div><span className="text-slate-400 text-xs block">पिकअप स्थान:</span> {activeJob.pickup}</div>
                  <div><span className="text-slate-400 text-xs block">ड्रॉप स्थान:</span> {activeJob.dropoff}</div>
                </div>

                {/* OTP Verification Box */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-300 font-semibold block">कस्टमर का 4-डिजिट OTP दर्ज करें:</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      maxLength="4"
                      placeholder="OTP"
                      value={captainOtpInput}
                      onChange={(e) => setCaptainOtpInput(e.target.value)}
                      className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl text-center font-bold text-lg flex-1 text-white focus:outline-none"
                    />
                    <button 
                      onClick={() => {
                        if (captainOtpInput === activeJob.otp) {
                          alert('OTP सही है! ट्रिप शुरू हुई।');
                        } else {
                          alert('गलत OTP! कृपया कस्टमर का सही OTP डालें।');
                        }
                      }}
                      className="bg-amber-500 text-slate-950 font-black px-5 rounded-xl text-sm">
                      स्टार्ट ट्रिप
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!activeJob && (
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-2 text-slate-400">
                <AlertCircle className="w-10 h-10 mx-auto text-slate-500" />
                <p>वर्तमान में कोई नई राइड उपलब्ध नहीं है।</p>
              </div>
            )}
          </div>
        )}

        {/* =================================================== */}
        {/* 3. ADMIN PANEL VIEW */}
        {/* =================================================== */}
        {activeTab === 'admin' && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-amber-400">राठ राइड - एडमिन कंट्रोल पैनल</h2>
            
            {/* Analytics Overview Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">आज की कुल राइड्स</div>
                <div className="text-2xl font-black text-white mt-1">128</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">एक्टिव कैप्टन्स</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">24</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">कुल बुकिंग रेवेन्यू</div>
                <div className="text-2xl font-black text-amber-400 mt-1">₹4,850</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400">एडमिन कमिशन (15%)</div>
                <div className="text-2xl font-black text-indigo-400 mt-1">₹727</div>
              </div>
            </div>

            {/* Captain Approval List */}
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="font-bold text-sm text-slate-300">नए ड्राइवरों की पेंडिंग लिस्ट</h3>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm">रामसेवक राजपूत</div>
                  <div className="text-xs text-slate-400">E-Rickshaw • UP-91 T 5678</div>
                </div>
                <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold">
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
