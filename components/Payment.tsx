import React, { useState, useEffect, useRef } from 'react';
import { PixLogo } from './Icons';

interface PaymentProps {
  onCancel: () => void;
  onCheck: (source?: 'manual' | 'poll') => Promise<boolean>;
  qrCode?: string | null;
  qrCodeBase64?: string | null;
}

const Payment: React.FC<PaymentProps> = ({ onCancel, onCheck, qrCode, qrCodeBase64 }) => {
  const [checking, setChecking] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(600); // 10 minutes
  const [copied, setCopied] = useState(false);
  const onCheckRef = useRef(onCheck);

  useEffect(() => {
    onCheckRef.current = onCheck;
  }, [onCheck]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    void onCheckRef.current('poll');

    const interval = setInterval(() => {
      void onCheckRef.current('poll');
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheck = async () => {
    if (checking) return;
    setStatusMessage(null);
    setChecking(true);
    try {
      const unlocked = await onCheck('manual');
      setStatusMessage(
        unlocked
          ? 'Pagamento confirmado e resultado liberado.'
          : 'Pagamento ainda não confirmado. Tente novamente em instantes.'
      );
    } finally {
      setChecking(false);
    }
  };

  const handleCopy = async () => {
    if (!qrCode) return;
    try {
      await navigator.clipboard.writeText(qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Se clipboard falhar (ex: navegador bloqueia), pelo menos seleciona o texto via UI
      setCopied(false);
    }
  };

  return (
    <div className="py-6 animate-fade-in text-center">
      <div className="mb-8">
        <button 
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-600 text-sm flex items-center gap-1 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao preview
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-sm mx-auto">
        <div className="flex justify-center mb-6">
          <div className={`w-48 h-48 border-4 border-slate-50 rounded-xl flex items-center justify-center overflow-hidden ${qrCodeBase64 ? 'bg-white' : 'bg-slate-900 text-slate-100 p-4'}`}>
            {qrCodeBase64 ? (
              <img
                src={`data:image/png;base64,${qrCodeBase64}`}
                alt="QR Code Pix"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  QR Code Pix
                </div>
                <div className="mt-2 text-[10px] text-slate-400">
                  Em breve
                </div>
              </div>
            )}
          </div>
        </div>

        {qrCode && (
          <div className="mb-6 text-left">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                Pix copia e cola
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700"
              >
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <textarea
              readOnly
              value={qrCode}
              rows={3}
              className="w-full text-xs text-slate-700 bg-white border border-slate-200 rounded-2xl p-3 resize-none focus:outline-none"
            />
          </div>
        )}

        <div className="mb-6">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest block mb-1">Valor a pagar</span>
          <div className="flex items-end justify-center gap-3">
            <span className="text-sm font-bold text-slate-400 line-through">R$ 12,00</span>
            <span className="text-3xl font-black text-slate-900">R$ 5,50</span>
          </div>
          <p className="mt-1 text-[10px] text-emerald-600 font-black uppercase tracking-widest">
            Desconto aplicado
          </p>
        </div>

        <div className="p-4 bg-indigo-50 rounded-2xl mb-6">
          <p className="text-xs text-indigo-700 font-medium">
            O código expira em <span className="font-bold tabular-nums">{formatTime(seconds)}</span>
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleCheck}
            disabled={checking}
            className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            {checking ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Já paguei, verificar liberação
              </>
            )}
          </button>
          
          <p className="text-[10px] text-slate-400 uppercase font-medium">
            Após o pagamento, o seu resultado será liberado automaticamente.
          </p>

          {statusMessage && (
            <p className="text-xs text-slate-600 font-medium">
              {statusMessage}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 opacity-50 grayscale">
        <PixLogo className="h-6 w-auto text-emerald-600" />
        <div className="h-6 w-px bg-slate-300"></div>
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zM10 11.724l2.492-2.254a1 1 0 00-1.34-1.484L10 9.215 8.848 8.01a1 1 0 00-1.34 1.484L10 11.724z" clipRule="evenodd" />
          </svg>
          Pagamento Seguro
        </span>
      </div>
    </div>
  );
};

export default Payment;
