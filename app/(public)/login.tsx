import SignInWithApple from '@/components/SignInWithApple';
import SignInWithGoogle from '@/components/SignInWithGoogle';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Login = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground
        blurRadius={0}
        source={require('@/assets/images/minimalist-background.jpeg')}
        style={styles.backgroundImage}>
        {/* Center Text */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>States Game</Text>
          <Text style={styles.subTitle}>a cooler take on the game "i spy"</Text>
          <Text style={styles.icon}>✌️</Text>
        </View>

        {/* Bottom Buttons & Text */}
        <View style={styles.actionContainer}>
          <SignInWithApple />
          <SignInWithGoogle />

          <Text style={styles.disclaimerText}>
            By signing up for an account, you are agreeing to our community
            guidelines of no nonsense except fun
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backgroundImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: { alignItems: 'center', gap: 5 },
  title: {
    color: 'darkslategrey',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subTitle: { color: 'slategrey', fontSize: 15 },
  icon: { fontSize: 40 },
  actionContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
    gap: 3,
  },
  disclaimerText: {
    textAlign: 'center',
    paddingHorizontal: 2,
    marginTop: 10,
    color: 'slategrey',
    fontWeight: '500',
  },
});
