/**
 * VPN PREMIUM — Ultra-Luxury App
 * Design: Sophisticated Tech Noir | Crimson Red (#c41e3a) + Pure Black (#000000)
 * Animations: Smooth, fluid, premium feel
 * Typography: Elegant sans-serif with refined hierarchy
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ── Color Palette ──────────────────────────────────────────
const COLORS = {
  black: '#000000',
  darkGray: '#0a0a0a',
  surface: '#121212',
  surface2: '#1a1a1a',
  crimson: '#c41e3a',
  crimsonLight: '#e74c3c',
  crimsonDark: '#8b1428',
  white: '#ffffff',
  whiteMuted: 'rgba(255,255,255,0.7)',
  whiteLight: 'rgba(255,255,255,0.5)',
  whiteFaint: 'rgba(255,255,255,0.15)',
  border: 'rgba(196,30,58,0.2)',
  borderLight: 'rgba(255,255,255,0.08)',
};

const VPN_SERVERS = [
  {
    id: 'us-east',
    name: 'United States',
    region: 'East Coast',
    icon: '🗽',
    flag: '🇺🇸',
    latency: '12ms',
    load: '35%',
    ip: '192.168.1.1',
    protocol: 'IKEv2',
  },
  {
    id: 'eu-west',
    name: 'Europe',
    region: 'Western Europe',
    icon: '🏰',
    flag: '🇪🇺',
    latency: '28ms',
    load: '52%',
    ip: '192.168.1.2',
    protocol: 'IKEv2',
  },
  {
    id: 'asia-sg',
    name: 'Singapore',
    region: 'Southeast Asia',
    icon: '🌴',
    flag: '🇸🇬',
    latency: '45ms',
    load: '41%',
    ip: '192.168.1.3',
    protocol: 'IKEv2',
  },
  {
    id: 'au-sydney',
    name: 'Australia',
    region: 'Sydney',
    icon: '🦘',
    flag: '🇦🇺',
    latency: '82ms',
    load: '28%',
    ip: '192.168.1.4',
    protocol: 'IKEv2',
  },
];

// ── Splash Screen ──────────────────────────────────────────
function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo entrance
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation animation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();

    // Progress bar
    setTimeout(() => {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2400,
        useNativeDriver: false,
      }).start(() => {
        setTimeout(onFinish, 300);
      });
    }, 600);
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

      {/* Background gradient */}
      <LinearGradient
        colors={['#000000', '#1a0a0a', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Animated logo */}
      <Animated.View
        style={[
          styles.splashLogoContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        {/* Glow rings */}
        {[1.8, 1.4, 1.0].map((scale, i) => (
          <Animated.View
            key={i}
            style={[
              styles.glowRing,
              {
                transform: [
                  { scale },
                  { rotate: rotateInterpolate },
                ],
                opacity: 0.2 - i * 0.05,
              },
            ]}
          />
        ))}

        {/* Shield icon */}
        <View style={styles.splashIcon}>
          <Text style={styles.splashIconEmoji}>🛡️</Text>
        </View>
      </Animated.View>

      {/* Title */}
      <View style={styles.splashTitleContainer}>
        <Text style={styles.splashTitle}>VPN PREMIUM</Text>
        <Text style={styles.splashSubtitle}>SECURE TUNNEL</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>INITIALIZING SECURE CONNECTION...</Text>
      </View>
    </View>
  );
}

// ── Server Card ────────────────────────────────────────────
function ServerCard({
  server,
  selected,
  onSelect,
}: {
  server: typeof VPN_SERVERS[0];
  selected: boolean;
  onSelect: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={onSelect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={[styles.serverCard, selected && styles.serverCardSelected]}
      >
        {/* Radio button */}
        <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>

        {/* Server info */}
        <View style={styles.serverInfo}>
          <View style={styles.serverHeader}>
            <Text style={styles.serverFlag}>{server.flag}</Text>
            <View style={styles.serverNameContainer}>
              <Text style={styles.serverName}>{server.name}</Text>
              <Text style={styles.serverRegion}>{server.region}</Text>
            </View>
          </View>

          {/* Metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>LATENCY</Text>
              <Text style={[styles.metricValue, { color: COLORS.crimson }]}>
                {server.latency}
              </Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>LOAD</Text>
              <Text style={styles.metricValue}>{server.load}</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>PROTOCOL</Text>
              <Text style={styles.metricValue}>{server.protocol}</Text>
            </View>
          </View>
        </View>

        {/* Status badge */}
        <View style={[styles.statusBadge, selected && styles.statusBadgeActive]}>
          <Text style={[styles.statusText, selected && styles.statusTextActive]}>
            {selected ? '✓' : '○'}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Connection Screen ──────────────────────────────────────
function ConnectionScreen({
  server,
  onConnected,
}: {
  server: typeof VPN_SERVERS[0];
  onConnected: () => void;
}) {
  const [step, setStep] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const steps = [
    'Establishing secure tunnel...',
    'Authenticating credentials...',
    'Routing through VPN server...',
    'Connection secured!',
  ];

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();

    // Step progression
    const timers = [
      setTimeout(() => setStep(1), 700),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2300),
      setTimeout(() => onConnected(), 3200),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <View style={styles.connectionContainer}>
      {/* Animated shield */}
      <View style={styles.shieldContainer}>
        {[2.0, 1.5, 1.0].map((scale, i) => (
          <Animated.View
            key={i}
            style={[
              styles.shieldRing,
              {
                transform: [{ scale: pulseAnim }],
                opacity: 0.25 - i * 0.07,
              },
            ]}
          />
        ))}
        <View style={styles.shieldIcon}>
          <Text style={styles.shieldIconEmoji}>🔒</Text>
        </View>
      </View>

      <Text style={styles.connectionTitle}>
        {step === 3 ? 'SECURED' : 'CONNECTING'}
      </Text>
      <Text style={styles.connectionServer}>
        {server.flag} {server.name} • {server.region}
      </Text>

      {/* Progress steps */}
      <View style={styles.stepsContainer}>
        {steps.map((s, i) => (
          <View key={i} style={styles.stepRow}>
            <View
              style={[
                styles.stepIndicator,
                i < step && styles.stepIndicatorDone,
                i === step && styles.stepIndicatorActive,
              ]}
            >
              <Text style={styles.stepIndicatorText}>
                {i < step ? '✓' : i === step ? '●' : '○'}
              </Text>
            </View>
            <Text
              style={[
                styles.stepLabel,
                i === step && styles.stepLabelActive,
                i < step && styles.stepLabelDone,
              ]}
            >
              {s}
            </Text>
          </View>
        ))}
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

// ── Connected Screen ───────────────────────────────────────
function ConnectedScreen({
  server,
  onDisconnect,
}: {
  server: typeof VPN_SERVERS[0];
  onDisconnect: () => void;
}) {
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => {
        const [h, m, s] = prev.split(':').map(Number);
        const totalSeconds = h * 3600 + m * 60 + s + 1;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.connectedContainer} showsVerticalScrollIndicator={false}>
      {/* Status card */}
      <LinearGradient
        colors={['rgba(196,30,58,0.15)', 'rgba(139,20,40,0.08)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.statusCard}
      >
        <View style={styles.statusHeader}>
          <View style={styles.statusDot} />
          <Text style={styles.statusLabel}>VPN ACTIVE</Text>
        </View>

        {/* Server info */}
        <View style={styles.connectedServerInfo}>
          <Text style={styles.connectedServerName}>
            {server.flag} {server.name}
          </Text>
          <Text style={styles.connectedServerRegion}>{server.region}</Text>
        </View>

        {/* Details grid */}
        <View style={styles.detailsGrid}>
          {[
            { label: 'IP ADDRESS', value: server.ip },
            { label: 'PROTOCOL', value: server.protocol },
            { label: 'ENCRYPTION', value: 'AES-256' },
            { label: 'UPTIME', value: uptime },
          ].map((item, idx) => (
            <View key={idx} style={styles.detailItem}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      {/* Disconnect button */}
      <TouchableOpacity
        onPress={onDisconnect}
        style={styles.disconnectButton}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.crimson, COLORS.crimsonDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.disconnectButtonGradient}
        >
          <Text style={styles.disconnectButtonText}>DISCONNECT</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Info footer */}
      <View style={styles.infoFooter}>
        <Text style={styles.infoText}>
          Your connection is encrypted and your IP address is hidden. Browse securely.
        </Text>
      </View>
    </ScrollView>
  );
}

// ── Main App ───────────────────────────────────────────────
function MainApp() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [screen, setScreen] = useState<'servers' | 'connecting' | 'connected'>('servers');
  const [connectedServer, setConnectedServer] = useState<typeof VPN_SERVERS[0] | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showSplash) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [showSplash]);

  const selectedServerObj = VPN_SERVERS.find((s) => s.id === selectedServer);

  const handleConnect = () => {
    if (!selectedServerObj) return;
    setScreen('connecting');
  };

  const handleConnected = () => {
    setConnectedServer(selectedServerObj);
    setScreen('connected');
  };

  const handleDisconnect = () => {
    setScreen('servers');
    setSelectedServer(null);
    setConnectedServer(null);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />

      {/* Header */}
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.4)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogo}>
              <Text style={styles.headerLogoEmoji}>🛡️</Text>
            </View>
            <View>
              <Text style={styles.headerTitle}>VPN PREMIUM</Text>
              <Text style={styles.headerStatus}>
                {screen === 'connected' ? '● CONNECTED' : '○ DISCONNECTED'}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Body */}
      <Animated.View style={[styles.body, { opacity: fadeAnim }]}>
        {screen === 'servers' && (
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Section header */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>SELECT SERVER</Text>
              <Text style={styles.sectionSubtitle}>
                Choose your VPN endpoint for optimal performance
              </Text>
            </View>

            {/* Server list */}
            <View style={styles.serversList}>
              {VPN_SERVERS.map((server) => (
                <ServerCard
                  key={server.id}
                  server={server}
                  selected={selectedServer === server.id}
                  onSelect={() => setSelectedServer(server.id)}
                />
              ))}
            </View>

            {/* Connect button */}
            <TouchableOpacity
              onPress={handleConnect}
              disabled={!selectedServer}
              style={[styles.connectButton, !selectedServer && styles.connectButtonDisabled]}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={
                  selectedServer
                    ? [COLORS.crimson, COLORS.crimsonDark]
                    : ['#333', '#222']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.connectButtonGradient}
              >
                <Text style={styles.connectButtonText}>
                  {selectedServer ? '⚡ CONNECT NOW' : 'SELECT A SERVER'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Footer info */}
            <View style={styles.footerInfo}>
              <Text style={styles.footerText}>
                Premium VPN with military-grade encryption. Your privacy is our priority.
              </Text>
            </View>
          </ScrollView>
        )}

        {screen === 'connecting' && selectedServerObj && (
          <ConnectionScreen
            server={selectedServerObj}
            onConnected={handleConnected}
          />
        )}

        {screen === 'connected' && connectedServer && (
          <ConnectedScreen
            server={connectedServer}
            onDisconnect={handleDisconnect}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

export default MainApp;

// ── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Splash
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogoContainer: {
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  glowRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: COLORS.crimson,
  },
  splashIcon: {
    width: 110,
    height: 110,
    borderRadius: 28,
    backgroundColor: 'rgba(196,30,58,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(196,30,58,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 24,
    elevation: 12,
  },
  splashIconEmoji: { fontSize: 50 },
  splashTitleContainer: { alignItems: 'center', marginBottom: 50 },
  splashTitle: {
    fontSize: 52,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 3,
    textShadowColor: 'rgba(196,30,58,0.6)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  splashSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.crimson,
    letterSpacing: 4,
    marginTop: 8,
  },
  progressContainer: { width: SCREEN_WIDTH - 60, alignItems: 'center' },
  progressTrack: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(196,30,58,0.15)',
    borderRadius: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.crimson,
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  progressText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 2,
    fontWeight: '600',
  },

  // Layout
  safeArea: { flex: 1, backgroundColor: COLORS.black },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(196,30,58,0.15)',
  },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  headerLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(196,30,58,0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(196,30,58,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoEmoji: { fontSize: 22 },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 2,
  },
  headerStatus: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.crimson,
    letterSpacing: 1,
    marginTop: 2,
  },
  body: { flex: 1 },
  scrollView: { flex: 1 },

  // Section
  sectionHeader: { paddingHorizontal: 20, paddingVertical: 24 },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 1,
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },

  // Server card
  serversList: { paddingHorizontal: 20, gap: 12, marginBottom: 16 },
  serverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.06)',
    gap: 14,
  },
  serverCardSelected: {
    borderColor: COLORS.crimson,
    backgroundColor: 'rgba(196,30,58,0.08)',
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: COLORS.crimson,
    backgroundColor: 'rgba(196,30,58,0.2)',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.crimson,
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  serverInfo: { flex: 1 },
  serverHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  serverFlag: { fontSize: 24 },
  serverNameContainer: { flex: 1 },
  serverName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  serverRegion: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricItem: { flex: 1 },
  metricLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.white,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  statusBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(196,30,58,0.2)',
    borderColor: COLORS.crimson,
  },
  statusText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.3)',
    fontWeight: '700',
  },
  statusTextActive: { color: COLORS.crimson },

  // Connect button
  connectButton: { marginHorizontal: 20, marginBottom: 20, borderRadius: 16, overflow: 'hidden' },
  connectButtonDisabled: { opacity: 0.4 },
  connectButtonGradient: { paddingVertical: 18, alignItems: 'center', borderRadius: 16 },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 2,
  },

  // Footer info
  footerInfo: {
    marginHorizontal: 20,
    marginBottom: 32,
    padding: 16,
    backgroundColor: 'rgba(196,30,58,0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(196,30,58,0.15)',
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 18,
    fontWeight: '500',
  },

  // Connection screen
  connectionContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  shieldContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  shieldRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.crimson,
  },
  shieldIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(196,30,58,0.25)',
    borderWidth: 2,
    borderColor: 'rgba(196,30,58,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  shieldIconEmoji: { fontSize: 40 },
  connectionTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 2,
    marginBottom: 8,
  },
  connectionServer: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 32,
  },
  stepsContainer: { width: '100%', gap: 14, marginBottom: 32 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicatorActive: {
    backgroundColor: 'rgba(196,30,58,0.25)',
    borderColor: 'rgba(196,30,58,0.7)',
  },
  stepIndicatorDone: {
    backgroundColor: 'rgba(196,30,58,0.8)',
    borderColor: COLORS.crimson,
  },
  stepIndicatorText: { fontSize: 12, color: COLORS.white, fontWeight: '700' },
  stepLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '500',
  },
  stepLabelActive: { color: COLORS.crimson },
  stepLabelDone: { color: 'rgba(255,255,255,0.7)' },
  progressBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(196,30,58,0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.crimson,
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  // Connected screen
  connectedContainer: { flex: 1, padding: 20 },
  statusCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(196,30,58,0.3)',
    marginBottom: 24,
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  statusHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.crimson,
    shadowColor: COLORS.crimson,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  statusLabel: {
    fontSize: 12,
    color: COLORS.crimson,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  connectedServerInfo: { marginBottom: 16 },
  connectedServerName: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  connectedServerRegion: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    flex: 1,
    minWidth: '48%',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(196,30,58,0.15)',
  },
  detailLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.white,
  },
  disconnectButton: { borderRadius: 14, overflow: 'hidden', marginBottom: 20 },
  disconnectButtonGradient: { paddingVertical: 16, alignItems: 'center', borderRadius: 14 },
  disconnectButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    letterSpacing: 2,
  },
  infoFooter: {
    padding: 16,
    backgroundColor: 'rgba(196,30,58,0.06)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(196,30,58,0.12)',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 18,
    fontWeight: '500',
  },
});
