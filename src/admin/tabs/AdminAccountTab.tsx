import React, { useState, useEffect } from 'react';
import { Mail, Key, CheckCircle, AlertCircle } from 'lucide-react';

export const AdminAccountTab: React.FC = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // सर्वर और लोकल स्टोरेज से ताज़ा ईमेल लोड करना
  useEffect(() => {
    const savedEmail = localStorage.getItem('sen_admin_email') || 'sen001@gmail.com';
    setEmail(savedEmail);

    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.email) {
          setEmail(data.email);
          localStorage.setItem('sen_admin_email', data.email);
        }
      })
      .catch(() => {});
  }, []);

  // ईमेल बदलने का फ़ंक्शन
  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('sen_admin_email', email.trim());
        setMessage({ text: 'Admin email updated successfully!', type: 'success' });
      } else {
        throw new Error(data.error || 'Failed to update email');
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Error updating email', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // पासवर्ड बदलने का फ़ंक्शन
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: 'Password changed successfully!', type: 'success' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(data.error || 'Failed to change password');
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'Error changing password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl space-y-10 text-stone-200">
      {message && (
        <div className={`p-4 rounded border text-xs tracking-wider flex items-center gap-2 ${
          message.type === 'success' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' : 'bg-rose-950/60 border-rose-800 text-rose-300'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Admin Email Section */}
      <div className="space-y-6">
        <div className="flex items-start gap-3 border-b border-white/10 pb-4">
          <Mail className="w-5 h-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="text-xs font-mono tracking-widest text-white uppercase font-bold">ADMIN EMAIL ADDRESS</h3>
            <p className="text-[11px] text-stone-400 mt-1">Primary email used for administrative login and receiving customer booking leads</p>
          </div>
        </div>

        <form onSubmit={handleSaveEmail} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-wider uppercase text-stone-400 mb-2 font-mono">ADMIN EMAIL</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d0d0e] border border-white/15 px-4 py-2.5 text-xs text-white focus:border-amber-500 outline-none rounded"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#c49f2b] text-black font-semibold text-xs px-6 py-2.5 rounded tracking-wider uppercase transition shadow disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{loading ? 'SAVING...' : 'SAVE CHANGES'}</span>
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="space-y-6 pt-4 border-t border-white/10">
        <div className="flex items-start gap-3 border-b border-white/10 pb-4">
          <Key className="w-5 h-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="text-xs font-mono tracking-widest text-white uppercase font-bold">CHANGE ADMIN PASSWORD</h3>
            <p className="text-[11px] text-stone-400 mt-1">Update your administrative password. The new password will immediately be required for all future logins.</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-[10px] tracking-wider uppercase text-stone-400 mb-1 font-mono">CURRENT PASSWORD</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-[#0d0d0e] border border-white/15 px-4 py-2.5 text-xs text-white focus:border-amber-500 outline-none rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-wider uppercase text-stone-400 mb-1 font-mono">NEW PASSWORD</label>
            <input
              type="password"
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#0d0d0e] border border-white/15 px-4 py-2.5 text-xs text-white focus:border-amber-500 outline-none rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-wider uppercase text-stone-400 mb-1 font-mono">CONFIRM NEW PASSWORD</label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#0d0d0e] border border-white/15 px-4 py-2.5 text-xs text-white focus:border-amber-500 outline-none rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#c49f2b] text-black font-semibold text-xs px-6 py-2.5 rounded tracking-wider uppercase transition shadow disabled:opacity-50"
          >
            <Key className="w-4 h-4" />
            <span>{loading ? 'CHANGING...' : 'CHANGE PASSWORD'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};