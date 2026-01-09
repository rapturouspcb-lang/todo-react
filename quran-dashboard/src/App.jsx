import React, { useState, useEffect } from 'react';

// Country and timezone data
const countries = [
  { name: "Pakistan", cities: ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"], timezone: "Asia/Karachi", prayers: ["4:30", "12:30", "15:30", "18:30", "19:45", "20:30"] },
  { name: "Saudi Arabia", cities: ["Makkah", "Madinah", "Riyadh", "Jeddah"], timezone: "Asia/Riyadh", prayers: ["4:00", "12:00", "15:00", "18:00", "19:15", "20:00"] },
  { name: "UAE", cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"], timezone: "Asia/Dubai", prayers: ["4:15", "12:15", "15:15", "18:15", "19:30", "20:15"] },
  { name: "India", cities: ["Delhi", "Mumbai", "Hyderabad", "Bangalore"], timezone: "Asia/Kolkata", prayers: ["4:45", "12:45", "15:45", "18:45", "19:30", "20:15"] },
  { name: "UK", cities: ["London", "Birmingham", "Manchester", "Bradford"], timezone: "Europe/London", prayers: ["3:30", "12:30", "15:30", "18:30", "19:45", "20:30"] },
  { name: "USA", cities: ["New York", "Chicago", "Los Angeles", "Houston"], timezone: "America/New_York", prayers: ["4:00", "12:00", "15:00", "18:00", "19:30", "20:00"] },
  { name: "Canada", cities: ["Toronto", "Montreal", "Vancouver", "Ottawa"], timezone: "America/Toronto", prayers: ["4:15", "12:15", "15:15", "18:15", "19:45", "20:15"] },
  { name: "Australia", cities: ["Sydney", "Melbourne", "Brisbane", "Perth"], timezone: "Australia/Sydney", prayers: ["4:00", "12:00", "15:00", "18:00", "19:30", "20:00"] },
  { name: "Malaysia", cities: ["Kuala Lumpur", "Johor Bahru", "Penang", "Shah Alam"], timezone: "Asia/Kuala_Lumpur", prayers: ["4:45", "12:45", "15:45", "18:45", "19:30", "20:15"] },
  { name: "Indonesia", cities: ["Jakarta", "Surabaya", "Bandung", "Medan"], timezone: "Asia/Jakarta", prayers: ["4:00", "12:00", "15:00", "18:00", "19:15", "20:00"] },
  { name: "Egypt", cities: ["Cairo", "Alexandria", "Giza", "Shubra El Kheima"], timezone: "Africa/Cairo", prayers: ["3:45", "12:15", "15:15", "18:15", "19:30", "20:15"] },
  { name: "Turkey", cities: ["Istanbul", "Ankara", "Izmir", "Bursa"], timezone: "Europe/Istanbul", prayers: ["4:30", "12:30", "15:30", "18:30", "19:45", "20:30"] },
  { name: "Bangladesh", cities: ["Dhaka", "Chittagong", "Khulna", "Rajshahi"], timezone: "Asia/Dhaka", prayers: ["4:15", "12:15", "15:15", "18:15", "19:30", "20:15"] },
  { name: "South Africa", cities: ["Cape Town", "Johannesburg", "Durban", "Pretoria"], timezone: "Africa/Johannesburg", prayers: ["3:30", "12:30", "15:30", "18:30", "19:45", "20:30"] }
];

// Quran data structure
const quranData = {
  paras: Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `پارہ ${i + 1}`,
    completed: false,
    progress: 0,
    lastRead: null
  })),
  surahs: [
    { id: 1, name: "الفاتحہ", english: "Al-Fatihah", ayats: 7, para: 1, completed: false, progress: 0 },
    { id: 2, name: "البقرۃ", english: "Al-Baqarah", ayats: 286, para: 1, completed: false, progress: 0 },
    { id: 3, name: "آل عمران", english: "Aal-E-Imran", ayats: 200, para: 3, completed: false, progress: 0 },
    { id: 4, name: "النساء", english: "An-Nisa", ayats: 176, para: 4, completed: false, progress: 0 },
    { id: 5, name: "المائدۃ", english: "Al-Ma'idah", ayats: 120, para: 6, completed: false, progress: 0 },
    { id: 6, name: "الانعام", english: "Al-An'am", ayats: 165, para: 7, completed: false, progress: 0 },
    { id: 7, name: "الاعراف", english: "Al-A'raf", ayats: 206, para: 8, completed: false, progress: 0 },
    { id: 8, name: "الانفال", english: "Al-Anfal", ayats: 75, para: 9, completed: false, progress: 0 },
    { id: 9, name: "التوبۃ", english: "At-Tawbah", ayats: 129, para: 10, completed: false, progress: 0 },
    { id: 10, name: "یونس", english: "Yunus", ayats: 109, para: 11, completed: false, progress: 0 },
    { id: 11, name: "ہود", english: "Hud", ayats: 123, para: 12, completed: false, progress: 0 },
    { id: 12, name: "یوسف", english: "Yusuf", ayats: 111, para: 12, completed: false, progress: 0 },
    { id: 13, name: "الرعد", english: "Ar-Ra'd", ayats: 43, para: 13, completed: false, progress: 0 },
    { id: 14, name: "ابراہیم", english: "Ibrahim", ayats: 52, para: 13, completed: false, progress: 0 },
    { id: 15, name: "الحجر", english: "Al-Hijr", ayats: 99, para: 14, completed: false, progress: 0 },
    { id: 16, name: "النحل", english: "An-Nahl", ayats: 128, para: 14, completed: false, progress: 0 },
    { id: 17, name: "الاسراء", english: "Al-Isra", ayats: 111, para: 15, completed: false, progress: 0 },
    { id: 18, name: "الکہف", english: "Al-Kahf", ayats: 110, para: 15, completed: false, progress: 0 },
    { id: 19, name: "مریم", english: "Maryam", ayats: 98, para: 16, completed: false, progress: 0 },
    { id: 20, name: "طہ", english: "Ta-Ha", ayats: 135, para: 16, completed: false, progress: 0 },
    { id: 21, name: "الانبیاء", english: "Al-Anbiya", ayats: 112, para: 17, completed: false, progress: 0 },
    { id: 22, name: "الحج", english: "Al-Hajj", ayats: 78, para: 17, completed: false, progress: 0 },
    { id: 23, name: "المؤمنون", english: "Al-Mu'minun", ayats: 118, para: 18, completed: false, progress: 0 },
    { id: 24, name: "النور", english: "An-Nur", ayats: 64, para: 18, completed: false, progress: 0 },
    { id: 25, name: "الفرقان", english: "Al-Furqan", ayats: 77, para: 19, completed: false, progress: 0 },
    { id: 26, name: "الشعراء", english: "Ash-Shu'ara", ayats: 227, para: 19, completed: false, progress: 0 },
    { id: 27, name: "النمل", english: "An-Naml", ayats: 93, para: 19, completed: false, progress: 0 },
    { id: 28, name: "القصص", english: "Al-Qasas", ayats: 88, para: 20, completed: false, progress: 0 },
    { id: 29, name: "العنکبوت", english: "Al-Ankabut", ayats: 69, para: 20, completed: false, progress: 0 },
    { id: 30, name: "الروم", english: "Ar-Rum", ayats: 60, para: 21, completed: false, progress: 0 },
    { id: 31, name: "لقمان", english: "Luqman", ayats: 34, para: 21, completed: false, progress: 0 },
    { id: 32, name: "السجدۃ", english: "As-Sajda", ayats: 30, para: 21, completed: false, progress: 0 },
    { id: 33, name: "الاحزاب", english: "Al-Ahzab", ayats: 73, para: 22, completed: false, progress: 0 },
    { id: 34, name: "سبأ", english: "Saba", ayats: 54, para: 22, completed: false, progress: 0 },
    { id: 35, name: "فاطر", english: "Fatir", ayats: 45, para: 22, completed: false, progress: 0 },
    { id: 36, name: "یس", english: "Ya-Sin", ayats: 83, para: 23, completed: false, progress: 0 },
    { id: 37, name: "الصافات", english: "As-Saffat", ayats: 182, para: 23, completed: false, progress: 0 },
    { id: 38, name: "ص", english: "Sad", ayats: 88, para: 23, completed: false, progress: 0 },
    { id: 39, name: "الزمر", english: "Az-Zumar", ayats: 75, para: 23, completed: false, progress: 0 },
    { id: 40, name: "غافر", english: "Al-Mu'min", ayats: 85, para: 24, completed: false, progress: 0 },
    { id: 41, name: "فصلت", english: "Fussilat", ayats: 54, para: 24, completed: false, progress: 0 },
    { id: 42, name: "الشورى", english: "Ash-Shura", ayats: 53, para: 25, completed: false, progress: 0 },
    { id: 43, name: "الزخرف", english: "Az-Zukhruf", ayats: 89, para: 25, completed: false, progress: 0 },
    { id: 44, name: "الدخان", english: "Ad-Dukhan", ayats: 59, para: 25, completed: false, progress: 0 },
    { id: 45, name: "الجاثیۃ", english: "Al-Jathiya", ayats: 37, para: 25, completed: false, progress: 0 },
    { id: 46, name: "الاحقاف", english: "Al-Ahqaf", ayats: 35, para: 26, completed: false, progress: 0 },
    { id: 47, name: "محمد", english: "Muhammad", ayats: 38, para: 26, completed: false, progress: 0 },
    { id: 48, name: "الفتح", english: "Al-Fath", ayats: 29, para: 26, completed: false, progress: 0 },
    { id: 49, name: "الحجرات", english: "Al-Hujurat", ayats: 18, para: 26, completed: false, progress: 0 },
    { id: 50, name: "ق", english: "Qaf", ayats: 45, para: 26, completed: false, progress: 0 },
    { id: 51, name: "الذاریات", english: "Az-Zariyat", ayats: 60, para: 27, completed: false, progress: 0 },
    { id: 52, name: "الطور", english: "At-Tur", ayats: 49, para: 27, completed: false, progress: 0 },
    { id: 53, name: "النجم", english: "An-Najm", ayats: 62, para: 27, completed: false, progress: 0 },
    { id: 54, name: "القمر", english: "Al-Qamar", ayats: 55, para: 27, completed: false, progress: 0 },
    { id: 55, name: "الرحمٰن", english: "Ar-Rahman", ayats: 78, para: 27, completed: false, progress: 0 },
    { id: 56, name: "الواقعۃ", english: "Al-Waqi'a", ayats: 96, para: 27, completed: false, progress: 0 },
    { id: 57, name: "الحدید", english: "Al-Hadid", ayats: 29, para: 27, completed: false, progress: 0 },
    { id: 58, name: "المجادلۃ", english: "Al-Mujadila", ayats: 22, para: 28, completed: false, progress: 0 },
    { id: 59, name: "الحشر", english: "Al-Hashr", ayats: 24, para: 28, completed: false, progress: 0 },
    { id: 60, name: "الممتحنۃ", english: "Al-Mumtahana", ayats: 13, para: 28, completed: false, progress: 0 },
    { id: 61, name: "الصف", english: "As-Saff", ayats: 14, para: 28, completed: false, progress: 0 },
    { id: 62, name: "الجمعۃ", english: "Al-Jumu'a", ayats: 11, para: 28, completed: false, progress: 0 },
    { id: 63, name: "المنافقون", english: "Al-Munafiqun", ayats: 11, para: 28, completed: false, progress: 0 },
    { id: 64, name: "التغابن", english: "At-Taghabun", ayats: 18, para: 28, completed: false, progress: 0 },
    { id: 65, name: "الطلق", english: "At-Talaq", ayats: 12, para: 28, completed: false, progress: 0 },
    { id: 66, name: "التحریم", english: "At-Tahrim", ayats: 12, para: 28, completed: false, progress: 0 },
    { id: 67, name: "الملک", english: "Al-Mulk", ayats: 30, para: 29, completed: false, progress: 0 },
    { id: 68, name: "القلم", english: "Al-Qalam", ayats: 52, para: 29, completed: false, progress: 0 },
    { id: 69, name: "الحاقۃ", english: "Al-Haqqah", ayats: 52, para: 29, completed: false, progress: 0 },
    { id: 70, name: "المعارج", english: "Al-Ma'arij", ayats: 44, para: 29, completed: false, progress: 0 },
    { id: 71, name: "نوح", english: "Nuh", ayats: 28, para: 29, completed: false, progress: 0 },
    { id: 72, name: "الجن", english: "Al-Jinn", ayats: 28, para: 29, completed: false, progress: 0 },
    { id: 73, name: "المزمل", english: "Al-Muzzammil", ayats: 20, para: 29, completed: false, progress: 0 },
    { id: 74, name: "المدثر", english: "Al-Muddaththir", ayats: 56, para: 29, completed: false, progress: 0 },
    { id: 75, name: "القیامۃ", english: "Al-Qiyamah", ayats: 40, para: 29, completed: false, progress: 0 },
    { id: 76, name: "الانسان", english: "Al-Insan", ayats: 31, para: 29, completed: false, progress: 0 },
    { id: 77, name: "المرسلات", english: "Al-Mursalat", ayats: 50, para: 29, completed: false, progress: 0 },
    { id: 78, name: "النبأ", english: "An-Naba", ayats: 40, para: 30, completed: false, progress: 0 },
    { id: 79, name: "النازعات", english: "An-Nazi'at", ayats: 46, para: 30, completed: false, progress: 0 },
    { id: 80, name: "عبس", english: "Abasa", ayats: 42, para: 30, completed: false, progress: 0 },
    { id: 81, name: "التکویر", english: "At-Takwir", ayats: 29, para: 30, completed: false, progress: 0 },
    { id: 82, name: "الانفطار", english: "Al-Infitar", ayats: 19, para: 30, completed: false, progress: 0 },
    { id: 83, name: "ال MUTAFFIFEEN", english: "Al-Mutaffifin", ayats: 36, para: 30, completed: false, progress: 0 },
    { id: 84, name: "الانشقاق", english: "Al-Inshiqaq", ayats: 25, para: 30, completed: false, progress: 0 },
    { id: 85, name: "البروج", english: "Al-Buruj", ayats: 22, para: 30, completed: false, progress: 0 },
    { id: 86, name: "الطارق", english: "At-Tariq", ayats: 17, para: 30, completed: false, progress: 0 },
    { id: 87, name: "الاعلى", english: "Al-A'la", ayats: 19, para: 30, completed: false, progress: 0 },
    { id: 88, name: "الغاشیۃ", english: "Al-Ghashiyah", ayats: 26, para: 30, completed: false, progress: 0 },
    { id: 89, name: "ال fajr", english: "Al-Fajr", ayats: 30, para: 30, completed: false, progress: 0 },
    { id: 90, name: "البلد", english: "Al-Balad", ayats: 20, para: 30, completed: false, progress: 0 },
    { id: 91, name: "الشمس", english: "Ash-Shams", ayats: 15, para: 30, completed: false, progress: 0 },
    { id: 92, name: "اللیل", english: "Al-Lail", ayats: 21, para: 30, completed: false, progress: 0 },
    { id: 93, name: "الضحی", english: "Ad-Duha", ayats: 11, para: 30, completed: false, progress: 0 },
    { id: 94, name: "الشرح", english: "Ash-Sharh", ayats: 8, para: 30, completed: false, progress: 0 },
    { id: 95, name: "التین", english: "At-Tin", ayats: 8, para: 30, completed: false, progress: 0 },
    { id: 96, name: "العلق", english: "Al-Alaq", ayats: 19, para: 30, completed: false, progress: 0 },
    { id: 97, name: "القدر", english: "Al-Qadr", ayats: 5, para: 30, completed: false, progress: 0 },
    { id: 98, name: "البینۃ", english: "Al-Bayyinah", ayats: 8, para: 30, completed: false, progress: 0 },
    { id: 99, name: "الزلزال", english: "Az-Zalzalah", ayats: 8, para: 30, completed: false, progress: 0 },
    { id: 100, name: "العادیات", english: "Al-Adiyat", ayats: 11, para: 30, completed: false, progress: 0 },
    { id: 101, name: "القارعۃ", english: "Al-Qari'ah", ayats: 11, para: 30, completed: false, progress: 0 },
    { id: 102, name: "التکاثر", english: "At-Takathur", ayats: 8, para: 30, completed: false, progress: 0 },
    { id: 103, name: "العصر", english: "Al-Asr", ayats: 3, para: 30, completed: false, progress: 0 },
    { id: 104, name: "ہمزۃ", english: "Al-Humazah", ayats: 9, para: 30, completed: false, progress: 0 },
    { id: 105, name: "الفیل", english: "Al-Fil", ayats: 5, para: 30, completed: false, progress: 0 },
    { id: 106, name: "قریش", english: "Quraysh", ayats: 4, para: 30, completed: false, progress: 0 },
    { id: 107, name: "الماعون", english: "Al-Ma'un", ayats: 7, para: 30, completed: false, progress: 0 },
    { id: 108, name: "الکوثری", english: "Al-Kawthar", ayats: 3, para: 30, completed: false, progress: 0 },
    { id: 109, name: "الکافرون", english: "Al-Kafirun", ayats: 6, para: 30, completed: false, progress: 0 },
    { id: 110, name: "النصر", english: "An-Nasr", ayats: 3, para: 30, completed: false, progress: 0 },
    { id: 111, name: "مسد", english: "Al-Masad", ayats: 5, para: 30, completed: false, progress: 0 },
    { id: 112, name: "الاخلاص", english: "Al-Ikhlas", ayats: 4, para: 30, completed: false, progress: 0 },
    { id: 113, name: "الجحٖد", english: "Al-Falaq", ayats: 5, para: 30, completed: false, progress: 0 },
    { id: 114, name: "الناس", english: "An-Nas", ayats: 6, para: 30, completed: false, progress: 0 }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('paras');
  const [paras, setParas] = useState(quranData.paras);
  const [surahs, setSurahs] = useState(quranData.surahs);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedParas = localStorage.getItem('quranParas');
    const savedSurahs = localStorage.getItem('quranSurahs');
    
    if (savedParas) setParas(JSON.parse(savedParas));
    if (savedSurahs) setSurahs(JSON.parse(savedSurahs));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('quranParas', JSON.stringify(paras));
  }, [paras]);

  useEffect(() => {
    localStorage.setItem('quranSurahs', JSON.stringify(surahs));
  }, [surahs]);

  // Load reminders from localStorage
  useEffect(() => {
    const savedReminders = localStorage.getItem('quranReminders');
    const savedCountry = localStorage.getItem('quranCountry');
    const savedCity = localStorage.getItem('quranCity');
    
    if (savedReminders) setReminders(JSON.parse(savedReminders));
    if (savedCountry) {
      const country = countries.find(c => c.name === savedCountry);
      if (country) {
        setSelectedCountry(country);
        if (savedCity && country.cities.includes(savedCity)) {
          setSelectedCity(savedCity);
        }
      }
    }
  }, []);

  // Save reminders to localStorage
  useEffect(() => {
    localStorage.setItem('quranReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('quranCountry', selectedCountry.name);
    localStorage.setItem('quranCity', selectedCity);
  }, [selectedCountry, selectedCity]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(setNotificationPermission);
      }
    }
  }, []);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check for prayer times
  useEffect(() => {
    const checkPrayerTimes = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTimeInMinutes = currentHour * 60 + currentMinute;

      const prayerTimes = selectedCountry.prayers.map((time, index) => {
        const [hour, minute] = time.split(':').map(Number);
        const prayerMinutes = hour * 60 + minute;
        return {
          name: ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Tahajjud'][index],
          time,
          minutes: prayerMinutes,
          reminderEnabled: [reminders.fajr, reminders.dhuhr, reminders.asr, reminders.maghrib, reminders.isha, reminders.tahajjud][index]
        };
      });

      // Find next prayer
      let next = prayerTimes.find(prayer => prayer.reminderEnabled && prayer.minutes > currentTimeInMinutes);
      
      if (!next) {
        // If no prayer left today, find first prayer for tomorrow
        next = prayerTimes.find(prayer => prayer.reminderEnabled);
      }

      setNextPrayer(next);

      // Check if it's time for any prayer (within 1 minute)
      prayerTimes.forEach(prayer => {
        if (prayer.reminderEnabled && Math.abs(currentTimeInMinutes - prayer.minutes) <= 1) {
          sendNotification(prayer.name, `It's time for ${prayer.name} prayer in ${selectedCity}. Time for Quran reading!`);
        }
      });
    };

    checkPrayerTimes();
    const interval = setInterval(checkPrayerTimes, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [selectedCountry, selectedCity, reminders, currentTime]);

  const sendNotification = (title, body) => {
    if (notificationPermission === 'granted') {
      new Notification(title, {
        body,
        icon: '🕌',
        badge: '🕌',
        tag: 'quran-reminder'
      });
    }
  };

  const toggleReminder = (prayer) => {
    setReminders(prev => ({ ...prev, [prayer]: !prev[prayer] }));
  };

  const addCustomReminder = () => {
    if (customReminder.time && customReminder.name) {
      setReminders(prev => ({
        ...prev,
        custom: [...prev.custom, { ...customReminder, id: Date.now() }]
      }));
      setCustomReminder({ time: '', name: '', enabled: true });
    }
  };

  const deleteCustomReminder = (id) => {
    setReminders(prev => ({
      ...prev,
      custom: prev.custom.filter(r => r.id !== id)
    }));
  };

  const toggleParaCompletion = (paraId) => {
    setParas(prev => prev.map(para => 
      para.id === paraId ? { 
        ...para, 
        completed: !para.completed,
        progress: !para.completed ? 100 : 0,
        lastRead: new Date().toISOString()
      } : para
    ));
  };

  const toggleSurahCompletion = (surahId) => {
    setSurahs(prev => prev.map(surah => 
      surah.id === surahId ? { 
        ...surah, 
        completed: !surah.completed,
        progress: !surah.completed ? 100 : 0,
        lastRead: new Date().toISOString()
      } : surah
    ));
  };

  const updateSurahProgress = (surahId, progress) => {
    setSurahs(prev => prev.map(surah => 
      surah.id === surahId ? { 
        ...surah, 
        progress,
        completed: progress === 100,
        lastRead: new Date().toISOString()
      } : surah
    ));
  };

  const updateParaProgress = (paraId, progress) => {
    setParas(prev => prev.map(para => 
      para.id === paraId ? { 
        ...para, 
        progress,
        completed: progress === 100,
        lastRead: new Date().toISOString()
      } : para
    ));
  };

  const [selectedSurah, setSelectedSurah] = useState(null);
  const [selectedPara, setSelectedPara] = useState(null);
  const [versesRead, setVersesRead] = useState(0);
  
  // Reminder states
  const [reminderTab, setReminderTab] = useState('reminders');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedCity, setSelectedCity] = useState(countries[0].cities[0]);
  const [reminders, setReminders] = useState({
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    tahajjud: false,
    custom: []
  });
  const [customReminder, setCustomReminder] = useState({ time: '', name: '', enabled: true });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);
  const [notificationPermission, setNotificationPermission] = useState('default');

  const filteredSurahs = surahs.filter(surah => {
    const matchesSearch = surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         surah.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'completed' && surah.completed) ||
                         (filterType === 'incomplete' && !surah.completed);
    return matchesSearch && matchesFilter;
  });

  const completedParas = paras.filter(p => p.completed).length;
  const completedSurahs = surahs.filter(s => s.completed).length;
  const overallProgress = Math.round(((completedParas * 100 / 30) + (completedSurahs * 100 / 114)) / 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="text-green-600">📖</span>
                قاری ڈیش بورڈ
                <span className="text-lg font-normal text-gray-600">- Quran Memorization Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-2">Track your Quran memorization progress</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{overallProgress}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{completedParas}/30</div>
              <div className="text-sm text-gray-600">Paras Completed</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{completedSurahs}/114</div>
              <div className="text-sm text-gray-600">Surahs Completed</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{114 - completedSurahs}</div>
              <div className="text-sm text-gray-600">Surahs Remaining</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{30 - completedParas}</div>
              <div className="text-sm text-gray-600">Paras Remaining</div>
            </div>
          </div>
        </header>

        {/* Time and Location Display */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">Current Time</div>
              <div className="text-xl font-bold text-gray-800">
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
              <div className="text-sm text-gray-600">{currentTime.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-600">Location</div>
              <div className="text-lg font-bold text-gray-800">{selectedCity}</div>
              <div className="text-sm text-gray-600">{selectedCountry.name}</div>
              <div className="text-xs text-blue-600">{selectedCountry.timezone}</div>
            </div>

            {nextPrayer && (
              <div className="text-center bg-green-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Next Prayer</div>
                <div className="text-lg font-bold text-green-700">{nextPrayer.name}</div>
                <div className="text-sm text-green-600">{nextPrayer.time}</div>
              </div>
            )}

            <div className="text-center">
              <div className="text-sm text-gray-600">Notifications</div>
              <div className={`text-lg font-bold ${notificationPermission === 'granted' ? 'text-green-600' : 'text-red-600'}`}>
                {notificationPermission === 'granted' ? '✅ Enabled' : '❌ Disabled'}
              </div>
              {notificationPermission !== 'granted' && (
                <button
                  onClick={() => Notification.requestPermission().then(setNotificationPermission)}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-1"
                >
                  Enable
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('paras')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'paras' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              30 Paras
            </button>
            <button
              onClick={() => setActiveTab('surahs')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'surahs' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              114 Surahs
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
                activeTab === 'reminders' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🕌 Reminders
            </button>
          </div>
        </div>

        {/* Paras Tab */}
        {activeTab === 'paras' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">30 Paras - Complete Quran</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paras.map(para => (
                <div 
                  key={para.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    para.completed 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-white border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => toggleParaCompletion(para.id)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{para.name}</h3>
                    <span className={`text-2xl ${para.completed ? 'text-green-600' : 'text-gray-400'}`}>
                      {para.completed ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${para.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Surahs Tab */}
        {activeTab === 'surahs' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">114 Surahs</h2>
              
              {/* Search and Filter */}
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search surah..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Surahs</option>
                  <option value="completed">Completed</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSurahs.map(surah => (
                <div 
                  key={surah.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    surah.completed 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-white border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => {
                    setSelectedSurah(surah);
                    setSelectedPara(null);
                    setVersesRead(0);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{surah.name}</h3>
                      <p className="text-sm text-gray-600">{surah.english}</p>
                      <p className="text-xs text-gray-500">Para {surah.para} • {surah.ayats} ayats</p>
                    </div>
                    <span className={`text-2xl ${surah.completed ? 'text-green-600' : 'text-gray-400'}`}>
                      {surah.completed ? '✓' : '○'}
                    </span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${surah.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{surah.progress}% memorized</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paras Tab */}
        {activeTab === 'paras' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">30 Paras - Complete Quran</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paras.map(para => (
                <div 
                  key={para.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    para.completed 
                      ? 'bg-green-50 border-green-500' 
                      : 'bg-white border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => {
                    setSelectedPara(para);
                    setSelectedSurah(null);
                    setVersesRead(0);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{para.name}</h3>
                    <span className={`text-2xl ${para.completed ? 'text-green-600' : 'text-gray-400'}`}>
                      {para.completed ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{ width: `${para.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verse Progress Modal */}
        {(selectedSurah || selectedPara) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">
                {selectedSurah ? `Update Progress: ${selectedSurah.name}` : `Update Progress: ${selectedPara.name}`}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {selectedSurah ? `Verses Read (out of ${selectedSurah.ayats})` : 'Progress Percentage'}
                </label>
                <input
                  type="number"
                  min="0"
                  max={selectedSurah ? selectedSurah.ayats : 100}
                  value={versesRead}
                  onChange={(e) => setVersesRead(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder={selectedSurah ? `Enter verses read (0-${selectedSurah.ayats})` : 'Enter percentage (0-100)'}
                />
              </div>

              <div className="mb-4">
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all"
                    style={{ width: `${selectedSurah ? (versesRead / selectedSurah.ayats * 100) : versesRead}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedSurah 
                    ? `${Math.round(versesRead / selectedSurah.ayats * 100)}% complete (${versesRead}/${selectedSurah.ayats} verses)`
                    : `${versesRead}% complete`
                  }
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    if (selectedSurah) {
                      const progress = Math.round((versesRead / selectedSurah.ayats) * 100);
                      updateSurahProgress(selectedSurah.id, Math.min(100, Math.max(0, progress)));
                    } else if (selectedPara) {
                      updateParaProgress(selectedPara.id, Math.min(100, Math.max(0, versesRead)));
                    }
                    setSelectedSurah(null);
                    setSelectedPara(null);
                    setVersesRead(0);
                  }}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save Progress
                </button>
                <button
                  onClick={() => {
                    setSelectedSurah(null);
                    setSelectedPara(null);
                    setVersesRead(0);
                  }}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reminders Tab */}
        {activeTab === 'reminders' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🕌 Prayer & Quran Reminders</h2>
            
            {/* Location Settings */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-4">Location Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    value={selectedCountry.name}
                    onChange={(e) => {
                      const country = countries.find(c => c.name === e.target.value);
                      setSelectedCountry(country);
                      setSelectedCity(country.cities[0]);
                    }}
                  >
                    {countries.map(country => (
                      <option key={country.name} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    {selectedCountry.cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Prayer Times Display */}
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-4">Prayer Times - {selectedCity}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Tahajjud'].map((prayer, index) => (
                  <div key={prayer} className="text-center p-3 bg-white rounded-lg border border-gray-200">
                    <div className="font-bold text-gray-800">{prayer}</div>
                    <div className="text-lg text-green-600">{selectedCountry.prayers[index]}</div>
                    <div className="text-xs text-gray-600">Prayer Time</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reminder Controls */}
            <div className="bg-yellow-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-4">Enable/Disable Reminders</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries({
                  fajr: 'Fajr 🌅',
                  dhuhr: 'Dhuhr ☀️',
                  asr: 'Asr 🌤️',
                  maghrib: 'Maghrib 🌇',
                  isha: 'Isha 🌙',
                  tahajjud: 'Tahajjud ⭐'
                }).map(([key, label]) => (
                  <label key={key} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={reminders[key]}
                      onChange={() => toggleReminder(key)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Custom Reminders */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Custom Quran Reading Reminders</h3>
              
              {/* Add Custom Reminder */}
              <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="time"
                    value={customReminder.time}
                    onChange={(e) => setCustomReminder(prev => ({ ...prev, time: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Time"
                  />
                  <input
                    type="text"
                    value={customReminder.name}
                    onChange={(e) => setCustomReminder(prev => ({ ...prev, name: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Reminder name (e.g., Morning Quran)"
                  />
                  <button
                    onClick={addCustomReminder}
                    className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Add Reminder
                  </button>
                </div>
              </div>

              {/* Custom Reminders List */}
              {reminders.custom.length > 0 && (
                <div className="space-y-2">
                  {reminders.custom.map(reminder => (
                    <div key={reminder.id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={reminder.enabled}
                          onChange={() => {
                            setReminders(prev => ({
                              ...prev,
                              custom: prev.custom.map(r => 
                                r.id === reminder.id ? { ...r, enabled: !r.enabled } : r
                              )
                            }));
                          }}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        <span className="font-medium">{reminder.time}</span>
                        <span className="text-gray-600">{reminder.name}</span>
                      </div>
                      <button
                        onClick={() => deleteCustomReminder(reminder.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Status */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-sm text-gray-600">
                {notificationPermission === 'granted' 
                  ? '✅ Notifications are enabled. You will receive reminders at prayer times.'
                  : '❌ Notifications are disabled. Enable notifications to receive reminders.'
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}