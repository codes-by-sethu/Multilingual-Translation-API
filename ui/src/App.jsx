import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');
  const [isHovered, setIsHovered] = useState(false);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const sourceRef = useRef(null);
  const targetRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sourceRef.current && !sourceRef.current.contains(event.target)) {
        setShowSourceDropdown(false);
      }
      if (targetRef.current && !targetRef.current.contains(event.target)) {
        setShowTargetDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const glassCard = {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(32px) saturate(180%)',
    borderRadius: '28px',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    padding: '2rem',
    width: '100%'
  };

  const labelStyle = (color) => ({
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: 700,
    color,
    marginBottom: '1.25rem',
    fontFamily: '"SF Pro Display", -apple-system, sans-serif',
    letterSpacing: '0.025em'
  });

  const dropdownButton = (isOpen) => ({
    width: '100%',
    padding: '1.125rem 1.75rem 1.125rem 1.5rem',
    height: '56px',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '1rem',
    fontWeight: 600,
    outline: 'none',
    fontFamily: '"SF Pro Rounded", sans-serif',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  });

  const dropdownArrow = (isOpen) => ({
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '7px solid rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
  });

  const dropdownMenu = {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    left: 0,
    right: 0,
    background: 'rgba(15, 23, 42, 0.98)',
    backdropFilter: 'blur(40px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
    maxHeight: '280px',
    overflowY: 'auto',
    zIndex: 9999,
    color: '#ffffff'
  };

  const dropdownItem = (isSelected) => ({
    padding: '1.125rem 1.5rem',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: isSelected ? 700 : 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.875rem',
    transition: 'all 0.25s ease',
    position: 'relative',
    background: isSelected ? 'rgba(59, 130, 246, 0.3)' : 'transparent'
  });

  const inputField = (focused) => ({
    width: '100%',
    minHeight: '220px',
    padding: '1.75rem 2rem',
    border: `1px solid ${focused ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)'}`,
    borderRadius: '24px',
    background: focused ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(24px)',
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '16px',
    lineHeight: 1.7,
    resize: 'vertical',
    fontFamily: '"SF Pro", -apple-system, sans-serif',
    outline: 'none',
    fontWeight: 400,
    transition: 'all 0.3s ease'
  });

  const translate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('http://localhost:3001/api/translations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, sourceLang, targetLang })
      });
      if (!response.ok) throw new Error('Backend error');
      const data = await response.json();
      setOutput(data.translatedText);
    } catch (error) {
      setOutput('❌ Start backend: cd backend && npm run dev');
    } finally {
      setLoading(false);
    }
  };

  const selectLanguage = (langCode, isSource) => {
    if (isSource) {
      setSourceLang(langCode);
      setShowSourceDropdown(false);
    } else {
      setTargetLang(langCode);
      setShowTargetDropdown(false);
    }
  };

  const currentSourceLang = languages.find(lang => lang.code === sourceLang);
  const currentTargetLang = languages.find(lang => lang.code === targetLang);

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: '2rem',
      paddingBottom: '4rem',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #1e40af 50%, #3b82f6 100%)',
      fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
      overflow: 'overlay',
      position: 'relative'
    }}>
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 10%, rgba(255,255,255,0.12) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)
        `,
        animation: 'floatLayers 20s ease-in-out infinite'
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 0',
        gap: '2rem',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          flexShrink: 0,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '32px',
          padding: '2rem 2.5rem',
          border: '1px solid rgba(255,255,255,0.15)',
          width: '100%',
          maxWidth: '600px'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}>
            🌐
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, rgba(255,255,255,1), rgba(224,242,254,0.9))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            AI Translator
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '1rem',
            fontWeight: 500,
            margin: '0.5rem 0 0 0'
          }}>
            {languages.length}+ languages supported ✨
          </p>
        </div>

        {/* Main Container */}
        <div style={{
          width: '100%',
          maxHeight: '90vh',        // ← CHANGED: 80vh → 90vh
          minHeight: '600px',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(60px) saturate(160%)',
          borderRadius: '48px',
          border: '2px solid rgba(255,255,255,0.2)',
          padding: '4rem',
          boxShadow: '0 40px 120px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2.5rem',
          overflow: 'auto'
        }}>
          {/* Language Selectors */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            position: 'relative'
          }}>
            <div style={{ ...glassCard, position: 'relative', zIndex: 10000 }} ref={sourceRef}>
              <label style={labelStyle('rgba(255,255,255,0.95)')}>From</label>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowSourceDropdown(!showSourceDropdown)}
                  style={dropdownButton(showSourceDropdown)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {currentSourceLang?.flag} {currentSourceLang?.name}
                  </span>
                  <div style={dropdownArrow(showSourceDropdown)} />
                </button>
                {showSourceDropdown && (
                  <div style={dropdownMenu}>
                    {languages.map(lang => (
                      <div
                        key={lang.code}
                        style={dropdownItem(sourceLang === lang.code)}
                        onClick={() => selectLanguage(lang.code, true)}
                      >
                        {lang.flag} {lang.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div style={{ ...glassCard, position: 'relative', zIndex: 10000 }} ref={targetRef}>
              <label style={labelStyle('rgba(255,255,255,0.95)')}>To</label>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowTargetDropdown(!showTargetDropdown)}
                  style={dropdownButton(showTargetDropdown)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {currentTargetLang?.flag} {currentTargetLang?.name}
                  </span>
                  <div style={dropdownArrow(showTargetDropdown)} />
                </button>
                {showTargetDropdown && (
                  <div style={dropdownMenu}>
                    {languages.map(lang => (
                      <div
                        key={lang.code}
                        style={dropdownItem(targetLang === lang.code)}
                        onClick={() => selectLanguage(lang.code, false)}
                      >
                        {lang.flag} {lang.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input */}
          <div style={glassCard}>
            <label style={labelStyle('rgba(255,255,255,0.95)')}>
              Enter text to translate
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              placeholder="Paste or type anything... (Supports 20+ languages!)"
              style={inputField(inputFocus)}
              disabled={loading}
            />
          </div>

          {/* Output */}
          {output && (
            <div style={{
              ...glassCard,
              background: 'rgba(255, 255, 255, 0.95)',
              color: '#1e293b'
            }}>
              <label style={labelStyle('#1e40af')}>
                Translation complete!
              </label>
              <div style={{
                minHeight: '200px',
                padding: '1.75rem 2rem',
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '20px',
                color: '#1e293b',
                fontSize: '16px',
                lineHeight: 1.7
              }}>
                {output}
              </div>
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={translate}
          disabled={loading || !input.trim()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            width: '100%',
            maxWidth: '450px',
            padding: '1.5rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 800,
            borderRadius: '40px',
            background: loading ? 'rgba(255,255,255,0.2)' : isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(40px)',
            border: '2px solid rgba(255,255,255,0.4)',
            color: loading ? '#94a3b8' : '#1e293b',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: isHovered ? '0 25px 60px rgba(255,255,255,0.5)' : '0 20px 50px rgba(255,255,255,0.4)',
            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'all 0.3s ease',
            fontFamily: '"SF Pro Display", sans-serif'
          }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '20px',
                height: '20px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid #1e40af',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }} />
              Translating...
            </span>
          ) : (
            '✨ TRANSLATE NOW'
          )}
        </button>

        {/* Status */}
        <div style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '1rem 1.5rem',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.9)',
          fontWeight: 600,
          maxWidth: '450px'
        }}>
          {loading ? '🔄 Translating...' : input ? `✅ Ready! (${languages.length} languages)` : '📝 Enter text above'}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatLayers {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
