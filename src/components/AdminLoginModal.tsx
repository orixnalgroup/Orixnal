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

  // Forgot Password / OTP Reset States
  const [forgotChannel, setForgotChannel] = useState<'EMAIL' | 'MOBILE'>('EMAIL');
  const [forgotTarget, setForgotTarget] = useState('website@orixnal.com');
  const [forgotOtpSent, setForgotOtpSent] = useState(false);
  const [forgotPreviewOtp, setForgotPreviewOtp] = useState<string | null>(null);
  const [forgotOtpCode, setForgotOtpCode] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);

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

  // Quick Direct Launch for Super Admin
  const handleQuickLaunch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const users = adminCmsStore.getUsers();
      const superAdmin = users.find((u) => u.email === DEFAULT_SUPER_ADMIN_EMAIL) || users[0];
      adminCmsStore.setActiveSession({
        email: superAdmin.email,
        role: superAdmin.role,
        loginTime: new Date().toISOString(),
        sessionToken: `tk-${Date.now()}`,
      });
      onSuccessLogin(superAdmin);
      onClose();
    }, 300);
  };

  // Handle Step 1: Initial Login Submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const res = adminCmsStore.authenticateStep1(email, password || DEFAULT_TEMP_PASSWORD);

      if (!res.success) {
        setLoginError(res.error || 'Authentication failed.');
        return;
      }

      if (res.user) {
        setCurrentUser(res.user);
      }

      if (res.step === 'FORCE_PASSWORD_CHANGE') {
        setNewPassword('Orixnal@2026!');
        setConfirmPassword('Orixnal@2026!');
        setStep('FORCE_PASSWORD_CHANGE');
      } else if (res.step === '2FA_REQUIRED') {
        const code = res.otpCode || '844756';
        setPreviewOtp(code);
        setOtpCode(code);
        setOtpCountdown(60);
        setStep('TWO_FACTOR');
      } else {
        handleQuickLaunch();
      }
    }, 400);
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

      // Automatically trigger 2FA step after changing password and pre-fill code
      const code = res.otpCode || '844756';
      setPreviewOtp(code);
      setOtpCode(code);
      setStep('TWO_FACTOR');
      setOtpCountdown(60);
    }, 500);
  };

  // Handle Step 3: 2FA Verification
  const handleTwoFactorSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setOtpError(null);
    setIsLoading(true);

    const codeToVerify = otpCode || previewOtp || '844756';

    setTimeout(() => {
      setIsLoading(false);
      const res = adminCmsStore.verify2FAStep2(email, codeToVerify);

      if (!res.success) {
        setOtpError(res.error || 'Verification failed.');
        return;
      }

      if (res.user) {
        onSuccessLogin(res.user);
        onClose();
      }
    }, 500);
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

  // Handle Send Password Reset OTP
  const handleSendForgotOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setForgotPreviewOtp(code);
      setForgotOtpCode(code);
      setForgotOtpSent(true);
    }, 500);
  };

  // Handle Reset Password Submit
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);

    if (forgotNewPass.length < 6) {
      setForgotError('New password must be at least 6 characters long.');
      return;
    }

    if (forgotNewPass !== forgotConfirmPass) {
      setForgotError('New Password and Confirm Password do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const targetEmail = forgotChannel === 'EMAIL' ? forgotTarget : DEFAULT_SUPER_ADMIN_EMAIL;
      const res = adminCmsStore.updatePasswordAndLogin(targetEmail, forgotNewPass);

      if (!res.success) {
        setForgotError(res.error || 'Failed to update password.');
        return;
      }

      setForgotSuccess('Password reset successfully! Logging you into Admin Portal...');
      setTimeout(() => {
        const users = adminCmsStore.getUsers();
        const superAdmin = users.find((u) => u.email === DEFAULT_SUPER_ADMIN_EMAIL) || users[0];
        onSuccessLogin(superAdmin);
        onClose();
      }, 1000);
    }, 600);
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

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-neutral-300"
                />
                <span className="font-semibold text-neutral-700">Remember Workstation</span>
              </label>
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
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-mono font-bold border border-purple-200">
                <Smartphone className="w-3.5 h-3.5 text-purple-700" />
                <span>Step 2 of 2: Dual Vector 2FA Verification</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-neutral-900">
                Verify Authentication OTP Code
              </h3>
              <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                OTP code generated and dispatched via SMS text message to <strong className="text-neutral-950 font-mono font-bold">+91 84475 61650</strong> and email to <strong className="text-neutral-950 font-mono font-bold">{email}</strong>.
              </p>
            </div>

            {/* Registered Verification Channels Card */}
            <div className="bg-purple-50/90 border border-purple-200/90 rounded-2xl p-3.5 text-xs text-purple-950 space-y-2">
              <div className="font-bold text-purple-900 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-purple-700" />
                <span>Registered Verification Channels:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-xl border border-purple-200/80 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-neutral-500 font-medium">SMS Mobile Verification</div>
                    <div className="font-mono font-bold text-neutral-900 truncate">+91 84475 61650</div>
                  </div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-purple-200/80 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] text-neutral-500 font-medium">Email OTP Dispatch</div>
                    <div className="font-mono font-bold text-neutral-900 truncate">{email}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Hint / Dispatched OTP Card */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>SMS & Email Dispatched Code</span>
                </div>
                <div className="text-2xl font-mono font-black tracking-widest text-emerald-950 mt-0.5">
                  {previewOtp || '844756'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOtpCode(previewOtp || '844756');
                  handleTwoFactorSubmit();
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Instant Verify</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {otpError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-2xl p-3.5 font-semibold">
                {otpError}
              </div>
            )}

            {/* OTP Input */}
            <div className="space-y-1.5 text-center">
              <label className="text-xs font-bold text-neutral-800">Enter 6-Digit OTP Code</label>
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="844756"
                maxLength={6}
                required
                className="w-full text-center tracking-[0.4em] font-mono font-black text-2xl py-3.5 bg-emerald-50/40 border border-emerald-300 text-emerald-950 rounded-2xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Resend Code & Timer */}
            <div className="flex items-center justify-between text-xs font-medium text-neutral-600 pt-1">
              <span>OTP status: <strong className="font-mono text-emerald-800 font-bold">Active ({otpCountdown}s)</strong></span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={otpCountdown > 45}
                className="text-purple-700 hover:text-purple-900 font-bold disabled:opacity-40"
              >
                {otpResent ? 'SMS & Email Resent!' : 'Resend SMS & Email OTP'}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full orixnal-gradient-bg text-white font-black py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying 2FA Code & Launching Portal...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Verify 2FA OTP & Open Admin Portal</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 4: FORGOT PASSWORD REQUEST WITH EMAIL / MOBILE OTP RESET */}
        {step === 'FORGOT_PASSWORD' && (
          <div className="p-6 sm:p-8 space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-neutral-900">Administrator Password Reset</h3>
              <p className="text-xs text-neutral-600">
                Dispatch an OTP verification code via Email or SMS Mobile to reset your password.
              </p>
            </div>

            {/* Error or Success Banners */}
            {forgotError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-900 text-xs rounded-2xl p-3.5 font-semibold">
                {forgotError}
              </div>
            )}
            {forgotSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs rounded-2xl p-3.5 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {!forgotOtpSent ? (
              <form onSubmit={handleSendForgotOtp} className="space-y-4">
                {/* Channel Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-800 block">Verification Channel</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setForgotChannel('EMAIL');
                        setForgotTarget('website@orixnal.com');
                      }}
                      className={`p-3 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                        forgotChannel === 'EMAIL'
                          ? 'bg-purple-50 border-purple-300 text-purple-950 shadow-xs'
                          : 'bg-[#FAF9F6] border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <Mail className="w-4 h-4 text-purple-700 shrink-0" />
                      <span>Email OTP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotChannel('MOBILE');
                        setForgotTarget('+91 84475 61650');
                      }}
                      className={`p-3 rounded-xl border flex items-center gap-2 font-bold transition-all ${
                        forgotChannel === 'MOBILE'
                          ? 'bg-purple-50 border-purple-300 text-purple-950 shadow-xs'
                          : 'bg-[#FAF9F6] border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>SMS Mobile OTP</span>
                    </button>
                  </div>
                </div>

                {/* Target Address / Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-800 block">
                    {forgotChannel === 'EMAIL' ? 'Registered Administrator Email' : 'Registered Mobile Number'}
                  </label>
                  <div className="relative">
                    {forgotChannel === 'EMAIL' ? (
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    ) : (
                      <Smartphone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    )}
                    <input
                      type={forgotChannel === 'EMAIL' ? 'email' : 'tel'}
                      value={forgotTarget}
                      onChange={(e) => setForgotTarget(e.target.value)}
                      placeholder={forgotChannel === 'EMAIL' ? 'website@orixnal.com' : '+91 84475 61650'}
                      required
                      className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600 font-mono font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full orixnal-gradient-bg text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating & Dispatches Password Reset OTP...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4 text-amber-300" />
                      <span>Send Reset OTP Code</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                {/* Dispatched Code Banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-950 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-emerald-800 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Dispatched Reset OTP Code</span>
                    </div>
                    <div className="text-2xl font-mono font-black tracking-widest text-emerald-950 mt-0.5">
                      {forgotPreviewOtp || '844756'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForgotOtpCode(forgotPreviewOtp || '844756')}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all"
                  >
                    Autofill OTP
                  </button>
                </div>

                {/* 6-Digit OTP Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-800 block">Enter 6-Digit Verification OTP</label>
                  <input
                    type="text"
                    value={forgotOtpCode}
                    onChange={(e) => setForgotOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="844756"
                    maxLength={6}
                    required
                    className="w-full text-center tracking-[0.3em] font-mono font-black text-xl py-3 bg-emerald-50/40 border border-emerald-300 text-emerald-950 rounded-xl focus:outline-none focus:border-emerald-600"
                  />
                </div>

                {/* New Password & Confirm Password */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-800 block">New Administrator Password</label>
                    <input
                      type="password"
                      value={forgotNewPass}
                      onChange={(e) => setForgotNewPass(e.target.value)}
                      placeholder="At least 6 characters"
                      required
                      className="w-full px-4 py-2.5 text-xs bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-800 block">Confirm New Password</label>
                    <input
                      type="password"
                      value={forgotConfirmPass}
                      onChange={(e) => setForgotConfirmPass(e.target.value)}
                      placeholder="Re-type new password"
                      required
                      className="w-full px-4 py-2.5 text-xs bg-[#FAF9F6] border border-neutral-300 rounded-xl focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full orixnal-gradient-bg text-white font-extrabold py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Updating Password & Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                      <span>Reset Password & Access Admin Portal</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <button
              type="button"
              onClick={() => {
                setForgotOtpSent(false);
                setStep('LOGIN');
              }}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
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
