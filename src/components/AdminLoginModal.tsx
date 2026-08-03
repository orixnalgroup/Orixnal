import React, { useState, useEffect } from 'react';
import { adminCmsStore, DEFAULT_SUPER_ADMIN_EMAIL, DEFAULT_TEMP_PASSWORD, AdminUser } from '../data/adminCmsStore';
import {
  ShieldCheck,
  Lock,
  Mail,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  X,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Building,
  KeyRound,
  ShieldAlert,
  Server
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: (user: AdminUser) => void;
}

type LoginStep = 'LOGIN' | 'FORCE_PASSWORD_CHANGE' | 'TWO_FACTOR' | 'FORGOT_PASSWORD';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccessLogin }) => {
  const [step, setStep] = useState<LoginStep>('LOGIN');

  // Login Form States
  const [email, setEmail] = useState(DEFAULT_SUPER_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Force Password Change States
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState<string | null>(null);

  // 2FA States
  const [twoFactorMethod, setTwoFactorMethod] = useState<'Email OTP' | 'Authenticator App' | 'Backup Code' | 'Trusted Device'>('Email OTP');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [previewOtp, setPreviewOtp] = useState<string | null>(null);
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [otpResent, setOtpResent] = useState(false);

  // Active Authenticated Temp User
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Countdown timer for 2FA OTP
  useEffect(() => {
    let timer: any;
    if (step === 'TWO_FACTOR' && otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpCountdown]);

  if (!isOpen) return null;

  // Handle Step 1: Initial Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const res = adminCmsStore.authenticateStep1(email, password);

      if (!res.success) {
        setLoginError(res.error || 'Authentication failed.');
        return;
      }

      if (res.user) {
        setCurrentUser(res.user);
      }

      if (res.step === 'FORCE_PASSWORD_CHANGE') {
        setStep('FORCE_PASSWORD_CHANGE');
      } else if (res.step === '2FA_REQUIRED') {
        if (res.otpCode) setPreviewOtp(res.otpCode);
        setOtpCountdown(60);
        setStep('TWO_FACTOR');
      }
    }, 600);
  };

  // Handle Step 2: Password Update
  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);

    if (newPassword !== confirmPassword) {
      setPassError('New Password and Confirm Password do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const res = adminCmsStore.updatePasswordAndLogin(email, newPassword);

      if (!res.success) {
        setPassError(res.error || 'Failed to update password.');
        return;
      }

      // Automatically trigger 2FA step after changing password
      setStep('TWO_FACTOR');
      setOtpCountdown(60);
    }, 500);
  };

  // Handle Step 3: 2FA Verification
  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const res = adminCmsStore.verify2FAStep2(email, otpCode);

      if (!res.success) {
        setOtpError(res.error || 'Verification failed.');
        return;
      }

      if (res.user) {
        onSuccessLogin(res.user);
        onClose();
      }
    }, 600);
  };

  // Resend OTP
  const handleResendOtp = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setPreviewOtp(newCode);
    setOtpCountdown(60);
    setOtpResent(true);
    setOtpError(null);
    setTimeout(() => setOtpResent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-auto relative transition-all duration-300">
        
        {/* Top Header Decoration */}
        <div className="orixnal-gradient-bg px-6 sm:px-8 py-6 text-white relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-200 bg-white/10 px-2 py-0.5 rounded-md border border-white/20">
                  Official Security Gateway
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white leading-tight mt-0.5">
                  ORIXNAL Enterprise Admin
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-purple-200 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              title="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STEP 1: INITIAL LOGIN FORM */}
        {step === 'LOGIN' && (
          <form onSubmit={handleLoginSubmit} className="p-6 sm:p-8 space-y-5">
            <div className="bg-purple-50/80 border border-purple-200/80 rounded-2xl p-3.5 text-xs text-purple-950 flex items-start gap-2.5">
              <Building className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Enterprise Policy:</span> Access is strictly restricted to verified <strong className="text-purple-900">@orixnal.com</strong> administrators registered in the ORIXNAL Users Database.
              </div>
            </div>

            {/* Error Banner */}
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-2xl p-4 flex items-start gap-3 animate-shake">
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-rose-950">Security Access Error</div>
                  <div className="leading-relaxed">{loginError}</div>
                </div>
              </div>
            )}

            {/* Official Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                <span>Official Administrator Email</span>
                <span className="text-[10px] font-mono text-purple-700">Domain: @orixnal.com</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="website@orixnal.com"
                  required
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white font-medium transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-800">Password</label>
                <button
                  type="button"
                  onClick={() => setStep('FORGOT_PASSWORD')}
                  className="text-xs font-semibold text-purple-700 hover:text-purple-900 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white font-medium transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Demo Quick Fill */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-neutral-300"
                />
                <span className="font-semibold text-neutral-700">Remember Workstation</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setEmail(DEFAULT_SUPER_ADMIN_EMAIL);
                  setPassword(DEFAULT_TEMP_PASSWORD);
                }}
                className="text-[11px] font-mono text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-2.5 py-1 rounded-lg font-bold"
              >
                Auto-fill Super Admin
              </button>
            </div>

            {/* Default Super Admin Helper Banner */}
            <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-3 text-amber-950 text-[11px] font-mono space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                Default Super Administrator Credentials:
              </div>
              <div>Email: <strong className="text-amber-950 font-extrabold">{DEFAULT_SUPER_ADMIN_EMAIL}</strong></div>
              <div>Temp Pass: <strong className="text-amber-950 font-extrabold">{DEFAULT_TEMP_PASSWORD}</strong></div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full orixnal-gradient-bg text-white font-black py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials & Security Policy...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: FORCED PASSWORD CHANGE (First Login Notice) */}
        {step === 'FORCE_PASSWORD_CHANGE' && (
          <form onSubmit={handlePasswordChangeSubmit} className="p-6 sm:p-8 space-y-5 animate-fadeIn">
            <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 text-amber-950 text-xs space-y-1.5">
              <div className="font-extrabold text-amber-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>First Login Action Required: Change Temporary Password</span>
              </div>
              <p className="text-amber-900 leading-relaxed">
                You are currently authenticating with the default temporary password. To protect the official ORIXNAL infrastructure, you must set a unique custom password before dashboard access is permitted.
              </p>
            </div>

            {passError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-2xl p-3.5 font-semibold">
                {passError}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters with numbers & symbols"
                required
                className="w-full px-4 py-3 text-xs sm:text-sm bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-800">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                required
                className="w-full px-4 py-3 text-xs sm:text-sm bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full orixnal-gradient-bg text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Updating Admin Password...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Update Password & Proceed to 2FA</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: MANDATORY TWO-FACTOR AUTHENTICATION */}
        {step === 'TWO_FACTOR' && (
          <form onSubmit={handleTwoFactorSubmit} className="p-6 sm:p-8 space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-mono font-bold">
                <Smartphone className="w-3.5 h-3.5 text-purple-700" />
                <span>Step 2 of 2: Multi-Factor Verification</span>
              </div>
              <h3 className="text-base font-extrabold text-neutral-900">
                Verify Authentication Code
              </h3>
              <p className="text-xs text-neutral-600">
                A 6-digit verification code was dispatched to <strong className="text-neutral-900">{email}</strong>
              </p>
            </div>

            {/* 2FA Method Toggle Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-2xl border border-neutral-200">
              {(['Email OTP', 'Authenticator App'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setTwoFactorMethod(method)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                    twoFactorMethod === method
                      ? 'bg-white text-purple-950 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Code Hint / Simulation Notification Card */}
            {previewOtp && (
              <div className="bg-purple-50 border border-purple-200/90 rounded-2xl p-3.5 text-xs text-purple-950 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-purple-700 font-bold uppercase">Simulated Email OTP Code</div>
                  <div className="text-lg font-mono font-black tracking-widest text-purple-900 mt-0.5">
                    {previewOtp}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOtpCode(previewOtp)}
                  className="bg-purple-900 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] shadow-2xs hover:opacity-95"
                >
                  Auto-fill Code
                </button>
              </div>
            )}

            {otpError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-2xl p-3.5 font-semibold">
                {otpError}
              </div>
            )}

            {/* OTP Input */}
            <div className="space-y-1.5 text-center">
              <label className="text-xs font-bold text-neutral-800">Enter 6-Digit Verification Code</label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                required
                className="w-full text-center tracking-[0.4em] font-mono font-black text-xl py-3.5 bg-[#FAF9F6] border border-neutral-300 rounded-2xl focus:outline-none focus:border-purple-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Resend Code & Timer */}
            <div className="flex items-center justify-between text-xs font-medium text-neutral-600 pt-1">
              <span>Code expires in: <strong className="font-mono text-purple-800 font-bold">{otpCountdown}s</strong></span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={otpCountdown > 45}
                className="text-purple-700 hover:text-purple-900 font-bold disabled:opacity-40"
              >
                {otpResent ? 'Code Resent!' : 'Resend Code'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || otpCode.length < 6}
              className="w-full orixnal-gradient-bg text-white font-black py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying 2FA Code & Granting Access...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Verify OTP & Launch Dashboard</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: FORGOT PASSWORD REQUEST */}
        {step === 'FORGOT_PASSWORD' && (
          <div className="p-6 sm:p-8 space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-neutral-900">Administrator Password Reset</h3>
              <p className="text-xs text-neutral-600">
                Official password resets require legal verification and Super Administrator approval.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs text-purple-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-purple-700" />
                <span>Contact Legal & Admin Desk:</span>
              </div>
              <div>Email: <strong className="font-mono font-bold">legal@orixnal.com</strong></div>
              <div>Phone: <strong className="font-mono font-bold">+91 8447561650</strong></div>
              <p className="text-[11px] text-purple-800 pt-1">
                Please transmit your employee ID and security verification key to legal@orixnal.com to issue a fresh temporary credential.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setStep('LOGIN')}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold py-3 px-4 rounded-xl text-xs transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {/* Modal Footer Security Badges */}
        <div className="bg-neutral-50 px-6 sm:px-8 py-3 border-t border-neutral-200 text-[10px] text-neutral-500 font-mono flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Server className="w-3 h-3 text-emerald-600" />
            <span>256-Bit TLS Encrypted</span>
          </div>
          <div className="text-neutral-400">ORIXNAL CMS v2.0 Enterprise</div>
        </div>

      </div>
    </div>
  );
};
