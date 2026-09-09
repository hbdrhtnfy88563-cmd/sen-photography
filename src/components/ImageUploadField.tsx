import React, { useRef, useState } from 'react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (base64Url: string) => void;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  // फ़ाइल को चुनते ही Base64 में बदलना और इमेज साइज़ को ऑप्टिमाइज़ करना
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        // इमेज को लाइटवेट बनाने के लिए कंप्रेस करना
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1920;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // वेब-फ़्रेंडली JPEG में बदलना
        const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        onChange(optimizedBase64);
        setLoading(false);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2 mb-4">
      <label className="block text-xs uppercase tracking-wider text-gray-300 font-medium">
        {label}
      </label>

      <div className="flex items-center gap-4">
        {/* हिडन फ़ाइल इनपुट */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* फ़ोटो चुनने का बटन */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="px-4 py-2.5 bg-[#222] hover:bg-[#d4af37] text-white hover:text-black border border-[#444] hover:border-[#d4af37] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
        >
          📁 {loading ? 'Processing...' : 'Upload Photo From PC / Mobile'}
        </button>

        {/* रीसेट / रिमूव बटन */}
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-xs text-red-400 hover:text-red-300 underline"
          >
            Remove
          </button>
        )}
      </div>

      {/* इमेज प्रीव्यू (दिखाने के लिए कि कौन सी फ़ोटो अपलोड हुई) */}
      {value && (
        <div className="relative w-36 h-24 rounded-lg overflow-hidden border border-[#d4af37]/50 mt-2 bg-black">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};
